import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/admin/stats`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  const statCards = [
    {
      label: "Total Users",
      value: stats?.total_users || 0,
      icon: "👥",
      trend: "+12%",
      color: "text-blue-500",
    },
    {
      label: "Active Members",
      value: stats?.active_users || 0,
      icon: "⭐",
      trend: "+5%",
      color: "text-emerald-500",
    },
    {
      label: "Total Revenue",
      value: `₹${stats?.total_revenue || 0}`,
      icon: "💰",
      trend: "+18%",
      color: "text-amber-500",
    },
    {
      label: "Pending Verification",
      value: stats?.pending_verifications || 0,
      icon: "📄",
      trend: "-2",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-primary">Overview</h1>
        <p className="text-slate-500">
          Welcome back, Admin. Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-[100px] pointer-events-none group-hover:bg-accent/10 transition-colors" />
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl">
                {card.icon}
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-lg ${card.trend.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
              >
                {card.trend}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                {card.label}
              </p>
              <h3 className="text-3xl font-extrabold text-primary">
                {isLoading ? "..." : card.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-primary">Revenue Trend</h3>
            <select className="bg-slate-50 border border-slate-200 rounded-lg text-xs px-3 py-1.5 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64 flex items-end gap-2 pt-4">
            {[45, 60, 40, 80, 55, 90].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-accent to-emerald-300 rounded-t-md relative group"
                style={{ height: `${h}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {h}%
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest px-1">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-primary mb-6">User Activity</h3>
          <div className="h-64 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm italic">
            Activity heat-map coming soon...
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
