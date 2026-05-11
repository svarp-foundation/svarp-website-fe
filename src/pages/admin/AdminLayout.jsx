import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const AdminLayout = () => {
  const { user, token, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!token || user?.role !== "admin")) {
      navigate("/admin/login");
    }
  }, [user, token, isLoading, navigate]);

  if (isLoading || !user)
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted text-primary">
        Loading Admin...
      </div>
    );

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: "📊", end: true },
    { name: "Users", path: "/admin/users", icon: "👥" },
    { name: "Payments", path: "/admin/payments", icon: "💳" },
    { name: "Memberships", path: "/admin/memberships", icon: "🏆" },
    { name: "Verifications", path: "/admin/verifications", icon: "🛡️" },
    { name: "Jobs", path: "/admin/jobs", icon: "💼" },
    { name: "Applications", path: "/admin/applications", icon: "📝" },
  ];

  return (
    <div className="flex min-h-screen bg-muted font-sans text-primary">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white fixed h-screen border-r border-white/5 flex flex-col z-50 transition-all duration-300 max-md:w-0 max-md:overflow-hidden">
        <div className="p-8 flex items-center gap-3">
          <h2 className="text-2xl font-extrabold tracking-tight text-accent">
            SVARP
          </h2>
        </div>

        <nav className="flex-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium mb-1 transition-all ${
                  isActive
                    ? "bg-white/10 text-accent border-l-4 border-accent"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <span>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-all"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 max-w-7xl max-md:ml-0 max-md:p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
