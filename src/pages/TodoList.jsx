// import React from "react";
import { useTodos } from "../hooks/useTodos";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function TodoList() {
  const { todos, remove } = useTodos();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">To-Do</h1>
        <Link to="/create"><Button>Create</Button></Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {todos.length === 0 ? (
          <div>No todos yet.</div>
        ) : todos.map(t => (
          <Card key={t.id}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="text-sm text-gray-600">{t.description}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button onClick={() => remove(t.id)}>Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
