import { NavLink } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";
import { LayoutDashboard, Users, UserCheck  } from "lucide-react";
export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`bg-gray-900 text-white min-h-screen w-64 transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0 md:static fixed z-40`}
    >
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Udhyog Tech
      </div>

      <nav className="p-4 space-y-2 text-sm">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded transition 
            ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded transition 
            ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"}`
          }
        >
          <Users size={18} />
          Users
        </NavLink>

        <NavLink
          to="/admin/candidate"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded transition 
            ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"}`
          }
        >
          <UserCheck size={18} />
          Candidate
        </NavLink>
      </nav>
    </aside>
  );
}

