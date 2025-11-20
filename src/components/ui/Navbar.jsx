// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "../ui/button";

export default function Navbar() {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const logout = () => { Cookies.remove("token"); navigate("/login"); };

  return (
    <nav className="w-full bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">ToDoReq</Link>
        <div className="flex gap-2">
          <Link to="/"><Button variant="ghost">Todos</Button></Link>
          <Link to="/users"><Button variant="ghost">Users</Button></Link>
          {!token ? (
            <>
              <Link to="/login"><Button>Login</Button></Link>
              <Link to="/register"><Button variant="outline">Register</Button></Link>
            </>
          ) : (
            <Button onClick={logout}>Logout</Button>
          )}
        </div>
      </div>
    </nav>
  );
}
