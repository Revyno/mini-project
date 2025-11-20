// import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../schema/login.schema";
import { useLogin } from "../hooks/useAuth";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const navigate = useNavigate();
  const login = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(LoginSchema) });

  const onSubmit = (data) => {
    login.mutate(data, {
      onSuccess: () => navigate("/"),
      onError: (err) => alert(err.response?.data?.error || "Login failed"),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input {...register("email")} placeholder="Email" />
          {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}

          <Input {...register("password")} type="password" placeholder="Password" />
          {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}

          <Button type="submit" className="w-full">Login</Button>
        </form>
      </Card>
    </div>
  );
}
