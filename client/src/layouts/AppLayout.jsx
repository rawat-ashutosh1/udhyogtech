import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AppLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar isOpen={open} />

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      <div className="flex flex-col flex-1 min-h-screen">
        <Header onToggle={() => setOpen(!open)} />

        <main className="flex-1 p-2">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
