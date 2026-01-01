import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import UserList from "../modules/users/UserList";
import UserList from "../modules/candidate/CandidateList";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default route → Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin/users"
        element={
            <ProtectedRoute role="Admin">
                <UserList />
             </ProtectedRoute>
        }
      />
      <Route
        path="/admin/candidate"
        element={
            <ProtectedRoute role="Admin">
                <UserList />
            </ProtectedRoute>
        }
      />
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
