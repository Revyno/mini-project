import React from "react";
import { useUsers } from "../hooks/useUser";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Pagination } from "../components/ui/Pagination";
import { Link } from "react-router-dom";

export default function Users(){
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useUsers(page);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {isLoading ? <div>Loading...</div> : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.data.map(u => (
              <Card key={u.id} className="text-center">
                <img src={u.avatar} alt="" className="w-20 h-20 rounded-full mx-auto mb-2" />
                <div className="font-semibold">{u.first_name} {u.last_name}</div>
                <div className="text-sm text-gray-600">{u.email}</div>
                <Link to={`/users/${u.id}`} className="mt-2 block">
                  <Button className="w-full">View</Button>
                </Link>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Pagination
              page={page}
              totalPages={data.total_pages}
              onPrev={() => setPage(p => Math.max(1, p-1))}
              onNext={() => setPage(p => Math.min(data.total_pages, p+1))}
            />
          </div>
        </>
      )}
    </div>
  );
}
