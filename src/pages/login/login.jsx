import { useState } from "react";
import { api } from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();


const login = async (e) => {
e.preventDefault();
const res = await api.post("/auth/login", { email, password });
localStorage.setItem("token", res.data.token);
navigate("/");
};


return (
<form onSubmit={login} className="space-y-4 max-w-md mx-auto">
<h1 className="text-2xl font-bold text-center">Login</h1>


<input
className="border p-2 w-full"
placeholder="Email"
onChange={(e) => setEmail(e.target.value)}
/>


<input
className="border p-2 w-full"
placeholder="Password"
type="password"
onChange={(e) => setPassword(e.target.value)}
/>


<button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
Login
</button>


<p className="text-center text-sm">
Belum punya akun? <Link to="/register" className="text-blue-600">Daftar</Link>
</p>
</form>
);
}