import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { toast } = useToast();

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1); // untuk pagination
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`https://reqres.in/api/users?page=${pageNum}`);
      const data = await res.json();

      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch users.",
      });
      err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto mt-12 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Users List</h1>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center mb-6">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!loading &&
          users.map((user) => (
            <Card key={user.id} className="shadow-md">
              <CardHeader>
                <CardTitle>
                  {user.first_name} {user.last_name}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  className="w-24 h-24 rounded-full mb-4"
                />

                <p className="text-sm text-gray-600 mb-2">{user.email}</p>

                <Link to={`/user/${user.id}`}>
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-8">
        <Button
          variant="outline"
          disabled={page === 1 || loading}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>

        <span className="text-lg font-semibold">
          {page} / {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={page === totalPages || loading}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
