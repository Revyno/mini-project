import { useState, useEffect } from "react";

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("todos") || "[]");
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const add = (t) => setTodos((s) => [t, ...s]);
  const remove = (id) => setTodos((s) => s.filter(x => x.id !== id));
  const update = (id, patch) => setTodos(s => s.map(x=> x.id===id ? {...x,...patch} : x));

  return { todos, add, remove, update };
}
