import { useState } from "react";
import { api } from "@/api/axios";
import { useNavigate } from "react-router-dom";


export default function Register() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();


const register = async (e) => {
e.preventDefault();
await api.post("/auth/register", { name, email, password });
navigate("/login");
};


return (
<form onSubmit={register} className="space-y-4 max-w-md mx-auto">
<h1 className="text-2xl font-bold text-center">Register</h1>


<input className="border p-2 w-full" placeholder="Name" onChange={(e) => setName(e.target.value)} />
<input className="border p-2 w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
<input className="border p-2 w-full" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />


<button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Daftar</button>
</form>
);
}