import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/useToast";

export default function UserDetail() {
  const { id } = useParams();
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://reqres.in/api/users/${id}`);
      const data = await res.json();

      if (!data.data) {
        toast({
          title: "User Not Found",
          description: "The user does not exist.",
        });
        return;
      }

      setUser(data.data);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch user details.",
      });
      err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <div className="max-w-xl mx-auto mt-12 p-4">
      <Link to="/">
        <Button variant="outline" className="mb-4">
          ← Back
        </Button>
      </Link>

      {loading && (
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}

      {!loading && user && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">
              {user.first_name} {user.last_name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center">
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-32 h-32 rounded-full mb-4 shadow-md"
            />

            <p className="text-gray-700 text-md mb-1">{user.email}</p>

            <div className="mt-4">
              <Button asChild>
                <a href={`mailto:${user.email}`}>Send Email</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
