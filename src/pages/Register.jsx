// import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../schema/signup.schema";
import { useRegister } from "../hooks/useAuth";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const navigate = useNavigate();
  const reg = useRegister();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(SignupSchema) });

  const onSubmit = (data) => {
    reg.mutate(data, {
      onSuccess: () => { alert("Registered"); navigate("/login"); },
      onError: (err) => alert(err.response?.data?.error || "Register failed"),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input {...register("email")} placeholder="Email" />
          {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}

          <Input {...register("password")} type="password" placeholder="Password" />
          {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}

          <Button type="submit" className="w-full">Register</Button>
        </form>
      </Card>
    </div>
  );
}
