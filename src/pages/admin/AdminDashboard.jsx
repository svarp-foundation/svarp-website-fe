import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        
        // Fetch Stats
        const statsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/stats`, { headers });
        let statsData = null;
        if (statsRes.ok) {
          statsData = await statsRes.json();
          setStats(statsData);
        }

        // Fetch Recent Users
        const usersRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/users?limit=5`, { headers });
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          setRecentUsers(usersData);
        }

        // Fetch Recent Payments
        const paymentsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/payments?limit=5`, { headers });
        if (paymentsRes.ok) {
          const paymentsData = await paymentsRes.json();
          setRecentPayments(paymentsData);
        }
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const statCards = [
    {
      label: "Total Users",
      value: stats?.total_users || 0,
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: "Active Members",
      value: stats?.active_users || 0,
      icon: (
        <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      label: "Total Revenue",
      value: `₹${stats?.total_revenue || 0}`,
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      label: "Pending Verification",
      value: stats?.pending_verifications || 0,
      icon: (
        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  // Process revenue data for chart
  const revenueData = stats?.monthly_revenue || [];
  const maxRevenue = revenueData.length > 0 ? Math.max(...revenueData.map(r => r.revenue)) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Overview</h1>
        <p className="text-slate-500">
          Welcome back, Admin. Here's what's happening today.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-accent/5 rounded-bl-[100px] pointer-events-none group-hover:bg-accent/10 transition-colors" />
            <div className="flex justify-between items-start mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-slate-50 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
                {card.icon}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] sm:text-sm font-medium text-slate-500 uppercase tracking-wider line-clamp-1">
                {card.label}
              </p>
              <h3 className="text-xl sm:text-3xl font-extrabold text-primary">
                {isLoading ? "..." : card.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-primary">Revenue Trend</h3>
              <span className="text-[10px] bg-slate-100 text-slate-500 font-bold uppercase tracking-wider px-2 py-1 rounded-md">Success Only</span>
            </div>

            {revenueData.length === 0 ? (
              <div className="h-64 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm italic">
                No revenue recorded yet
              </div>
            ) : (
              <>
                <div className="h-64 flex items-end gap-2 pt-4">
                  {revenueData.map((r, i) => {
                    const heightPercent = maxRevenue > 0 ? (r.revenue / maxRevenue) * 100 : 0;
                    return (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-accent to-emerald-300 rounded-t-md relative group cursor-pointer transition-all duration-200 hover:brightness-95"
                        style={{ height: `${Math.max(heightPercent, 5)}%` }}
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-10 font-bold">
                          ₹{r.revenue}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest px-1">
                  {revenueData.map((r, i) => (
                    <span key={i}>{r.month}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Recent Transactions Feed */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-primary">Recent Transactions</h3>
              <span className="text-[10px] bg-slate-100 text-slate-500 font-bold uppercase tracking-wider px-2 py-1 rounded-md">Live Payments</span>
            </div>

            {recentPayments.length === 0 ? (
              <div className="h-64 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm italic">
                No payments completed yet
              </div>
            ) : (
              <div className="space-y-4">
                {recentPayments.map((payment, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50/50 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-50 rounded-lg">
                        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary line-clamp-1">{payment.user_email}</p>
                        <p className="text-[10px] text-slate-400">Order: #{payment.razorpay_order_id || payment.id.slice(0, 8)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-primary">₹{payment.amount}</p>
                      <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${payment.status === "success" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Users Widget */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-primary">Recent Users</h3>
          <span className="text-[10px] bg-slate-100 text-slate-500 font-bold uppercase tracking-wider px-2 py-1 rounded-md">New Accounts</span>
        </div>

        {recentUsers.length === 0 ? (
          <div className="p-8 text-center text-slate-400 italic">No users found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentUsers.map((user, idx) => (
              <div key={idx} className="p-4 border border-slate-100 rounded-2xl hover:shadow-sm transition-all duration-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-primary">{user.full_name || "New User"}</h4>
                  <p className="text-xs text-slate-400">{user.email}</p>
                  <span className="text-[9px] font-semibold text-slate-400 capitalize bg-slate-50 px-2 py-0.5 rounded-md mt-1.5 inline-block">
                    Role: {user.role}
                  </span>
                </div>
                <div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${user.is_active ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                    {user.is_active ? "Active" : "Suspended"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
