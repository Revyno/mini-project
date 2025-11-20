import { useEffect, useState } from "react";
import { api } from "@/hooks/useApi";
import { Link } from "react-router-dom";


export default function Users() {
const [users, setUsers] = useState([]);
const [page, setPage] = useState(1);
const [total, setTotal] = useState(1);


useEffect(() => {
api.get(`/users?page=${page}`).then((res) => {
setUsers(res.data.data);
setTotal(res.data.totalPages);
});
}, [page]);


return (
<div>
<h1 className="text-2xl font-bold mb-6">Users</h1>
<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
{users.map((u) => (
<Link key={u.id} to={`/users/${u.id}`} className="border p-4 rounded">
<h2 className="font-semibold">{u.name}</h2>
<p>{u.email}</p>
</Link>
))}
</div>


<div className="flex gap-2 mt-6">
<button
disabled={page === 1}
onClick={() => setPage(page - 1)}
className="px-3 py-1 border rounded"
>
Prev
</button>
<button
disabled={page === total}
onClick={() => setPage(page + 1)}
className="px-3 py-1 border rounded"
>
Next
</button>
</div>
</div>
);
}