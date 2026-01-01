import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Header({ onToggle }) {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout();               // ✅ clear auth
        navigate("/");     // ✅ redirect
    };
  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-between sticky top-0 z-20">

      {/* LEFT: TOGGLE */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="md:hidden bg-gray-900 text-white px-3 py-2 rounded"
        >
          ☰
        </button>

        {/* <h1 className="text-lg font-semibold text-gray-800">
          Udhyog Tech
        </h1> */}
      </div>

      {/* RIGHT: USER INFO */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">{user?.name || "Guest"}</p>
          {/* <p className="text-xs text-gray-500">{user?.role}</p> */}
        </div>

        <button
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
          onClick={handleLogout}
          style={{
              cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

    </header>
  );
}
