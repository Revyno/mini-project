// import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTaskSchema } from "../schema/task.schema";
import { useTodos } from "../hooks/useTodos";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function CreateTodo(){
  const { add } = useTodos();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({ resolver: zodResolver(CreateTaskSchema) });

  const onSubmit = (data) => {
    add({ id: Date.now().toString(), ...data });
    navigate("/");
  };

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-bold mb-4">Create Todo</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input {...register("title")} placeholder="Title" />
        <Input {...register("description")} placeholder="Description" />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}
