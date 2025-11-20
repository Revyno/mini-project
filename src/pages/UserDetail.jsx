// import React from "react";
import { useParams, Link } from "react-router-dom";
import { useUserDetail } from "../hooks/useUserdetail";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function UserDetail(){
  const { id } = useParams();
  const { data, isLoading } = useUserDetail(id);

  if (isLoading) return <div>Loading...</div>;
  const u = data.data;

  return (
    <div className="max-w-xl">
      <Link to="/users"><Button variant="outline">← Back</Button></Link>
      <Card className="mt-4 text-center">
        <img src={u.avatar} className="w-32 h-32 rounded-full mx-auto mb-4" alt="" />
        <h2 className="text-2xl font-bold">{u.first_name} {u.last_name}</h2>
        <p className="text-gray-600">{u.email}</p>
      </Card>
    </div>
  );
}
