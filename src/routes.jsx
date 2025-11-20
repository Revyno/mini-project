import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/components/protectedRoutes/protectedroute";

import Home from "@/pages/home/home";
import TodoList from "@/pages/TodoList";
import CreateTodo from "@/pages/CreateTodo";
import Users from "@/pages/Users";
import UserDetail from "@/pages/UserDetail";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export default function RoutesApp() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TodoList />} />
        <Route path="create" element={<CreateTodo />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetail />} />
        <Route path="home" element={<Home />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<div className="p-6 text-center">404 — Not Found</div>} />
    </Routes>
  );
}
