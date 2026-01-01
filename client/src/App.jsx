import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserList from "./modules/users/UserList";
import CandidateList from "./modules/candidate/CandidateList";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
const Dashboard = () => <h1>Dashboard</h1>;
const App = () => {
  return (
    <Routes>
      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* PROTECTED */}
      <Route element={<ProtectedRoute roles={["Admin", "Recruiter"]} />}>
          <Route element={<AppLayout />}>
            
            {/* COMMON DASHBOARD */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* ADMIN ONLY */}
            <Route element={<ProtectedRoute roles={["Admin"]} />}>
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/admin/candidate" element={<CandidateList />} />
            </Route>

          </Route>
        </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
export default App;
