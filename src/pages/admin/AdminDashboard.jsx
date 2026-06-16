import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [plans, setPlans] = useState([]);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Dashboard Interactive States
  const [activeChartTab, setActiveChartTab] = useState("revenue"); // "revenue" or "users"
  const [exporting, setExporting] = useState(false);
  
  // Membership Assignment Form State
  const [assignForm, setAssignForm] = useState({
    email: "",
    planId: "",
    durationDays: 365,
  });
  const [assigning, setAssigning] = useState(false);
  const [assignMessage, setAssignMessage] = useState(null);

  // User details modal state
  const [selectedUser, setSelectedUser] = useState(null);
  const [userModalLoading, setUserModalLoading] = useState(false);

  // Verification modal state
  const [activeVerification, setActiveVerification] = useState(null);
  const [reviewing, setReviewing] = useState(false);

  const { token } = useAuth();

  const fetchDashboardData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      // Fetch Stats
      const statsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/stats`, { headers });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
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

      // Fetch Membership Plans
      const plansRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/memberships/`);
      if (plansRes.ok) {
        const plansData = await plansRes.json();
        setPlans(plansData);
        if (plansData.length > 0 && !assignForm.planId) {
          setAssignForm(prev => ({ ...prev, planId: plansData[0].id }));
        }
      }

      // Fetch Pending Verifications
      const verifRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/verifications`, { headers });
      if (verifRes.ok) {
        const verifData = await verifRes.json();
        setPendingVerifications(verifData);
      }

    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  // Export CSV Handler
  const handleExportPayments = async () => {
    setExporting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/payments/export`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `payments_report_${new Date().toISOString().slice(0,10)}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert("Failed to export payments history");
      }
    } catch (error) {
      console.error("CSV export failed", error);
    } finally {
      setExporting(false);
    }
  };

  // Assign Membership Handler
  const handleAssignMembership = async (e) => {
    e.preventDefault();
    setAssigning(true);
    setAssignMessage(null);
    try {
      const userSearchRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/users?search=${assignForm.email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (!userSearchRes.ok) throw new Error("Could not search for user email");
      
      const searchResults = await userSearchRes.json();
      const targetUser = searchResults.find(u => u.email.toLowerCase() === assignForm.email.toLowerCase().trim());
      
      if (!targetUser) {
        setAssignMessage({ type: "error", text: "User email not found." });
        setAssigning(false);
        return;
      }

      const assignRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/memberships/assign`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: targetUser.id,
            membership_id: assignForm.planId,
            duration_days: parseInt(assignForm.durationDays),
          }),
        }
      );

      if (assignRes.ok) {
        setAssignMessage({ type: "success", text: "Subscription assigned successfully." });
        setAssignForm(prev => ({ ...prev, email: "" }));
        fetchDashboardData();
      } else {
        const err = await assignRes.json();
        setAssignMessage({ type: "error", text: err.detail || "Assignment failed." });
      }
    } catch (error) {
      console.error("Error assigning membership", error);
      setAssignMessage({ type: "error", text: "Connection error." });
    } finally {
      setAssigning(false);
    }
  };

  // Inspect User Details
  const handleInspectUser = async (userId) => {
    setUserModalLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedUser(data);
      }
    } catch (error) {
      console.error("Failed to load user details", error);
    } finally {
      setUserModalLoading(false);
    }
  };

  // Review Verification Submission
  const handleReviewVerification = async (status) => {
    if (!activeVerification) return;
    setReviewing(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/verifications/${activeVerification.id}/review`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            reason: status === "rejected" ? "Identity document did not meet standards" : "",
          }),
        }
      );
      if (response.ok) {
        setActiveVerification(null);
        fetchDashboardData();
      } else {
        alert("Failed to review verification status");
      }
    } catch (error) {
      console.error("Error reviewing verification", error);
    } finally {
      setReviewing(false);
    }
  };

  // Toggle Status from Modal
  const handleToggleUserStatus = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/users/${userId}/status`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const updated = await response.json();
        if (selectedUser && selectedUser.id === userId) {
          setSelectedUser(prev => ({ ...prev, is_active: updated.is_active }));
        }
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Failed to toggle status", error);
    }
  };

  useEffect(() => {
    if (assignForm.planId && plans.length > 0) {
      const selectedPlan = plans.find(p => p.id === assignForm.planId);
      if (selectedPlan) {
        setAssignForm(prev => ({ ...prev, durationDays: selectedPlan.duration_days }));
      }
    }
  }, [assignForm.planId, plans]);

  // Calculations for Stats
  const revenueData = stats?.monthly_revenue || [];
  const usersData = stats?.monthly_users || [];
  const hasRevenueData = revenueData.length > 0;
  const hasUsersData = usersData.length > 0;

  // Compact Chart Dimensions
  const chartWidth = 500;
  const chartHeight = 160;
  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 25;
  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  // Revenue curve calculations
  const maxRevenue = hasRevenueData ? Math.max(...revenueData.map(r => r.revenue)) : 0;
  const revenuePoints = revenueData.map((r, i) => {
    const x = paddingLeft + (i * (plotWidth / Math.max(1, revenueData.length - 1)));
    const y = paddingTop + plotHeight - (maxRevenue > 0 ? (r.revenue / maxRevenue) * plotHeight : 0);
    return { x, y, ...r };
  });

  const linePath = revenuePoints.length > 0
    ? `M ${revenuePoints.map(p => `${p.x} ${p.y}`).join(" L ")}`
    : "";

  // User Growth calculations
  const maxUsers = hasUsersData ? Math.max(...usersData.map(u => u.count)) : 0;
  const barStep = plotWidth / Math.max(1, usersData.length);
  const barWidth = Math.min(18, barStep * 0.5);
  const barOffset = (barStep - barWidth) / 2;

  const userBars = usersData.map((u, i) => {
    const x = paddingLeft + (i * barStep) + barOffset;
    const height = maxUsers > 0 ? (u.count / maxUsers) * plotHeight : 0;
    const y = paddingTop + plotHeight - height;
    return { x, y, width: barWidth, height, ...u };
  });

  return (
    <div className="space-y-5 font-sans">
      
      {/* Simple Header */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-xs text-slate-500">System overview and management functions</p>
        </div>
      </div>

      {/* Simple Stat Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: stats?.total_users || 0, sub: "Registered users" },
          { label: "Active Members", value: stats?.active_users || 0, sub: `${stats && stats.total_users > 0 ? Math.round((stats.active_users / stats.total_users) * 100) : 0}% active` },
          { label: "Total Revenue", value: `₹${stats?.total_revenue?.toLocaleString() || 0}`, sub: "Earnings ledger" },
          { label: "Pending Verification", value: stats?.pending_verifications || 0, sub: "Requires review", alert: (stats?.pending_verifications || 0) > 0 }
        ].map((card, i) => (
          <div key={i} className={`bg-white p-4 rounded-xl border ${card.alert ? "border-red-300 bg-red-50/20" : "border-slate-200"} shadow-sm`}>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{card.label}</p>
            <h3 className="text-xl font-extrabold text-primary mt-1">{isLoading ? "..." : card.value}</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Simple Analytics Chart */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-primary">Trends Overview</h3>
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  onClick={() => setActiveChartTab("revenue")}
                  className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${activeChartTab === "revenue" ? "bg-white text-primary shadow-xs" : "text-slate-500 hover:text-primary"}`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setActiveChartTab("users")}
                  className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${activeChartTab === "users" ? "bg-white text-primary shadow-xs" : "text-slate-500 hover:text-primary"}`}
                >
                  Growth
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="h-40 flex items-center justify-center text-xs text-slate-400 italic">
                Loading data...
              </div>
            ) : (activeChartTab === "revenue" && !hasRevenueData) || (activeChartTab === "users" && !hasUsersData) ? (
              <div className="h-40 bg-slate-50 rounded-lg flex items-center justify-center text-xs text-slate-400 italic">
                No recorded stats
              </div>
            ) : (
              <div className="pt-2">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" className="overflow-visible">
                  {/* Grid Lines */}
                  {[0, 0.5, 1].map((ratio, idx) => {
                    const y = paddingTop + (ratio * plotHeight);
                    return (
                      <g key={idx}>
                        <line
                          x1={paddingLeft}
                          y1={y}
                          x2={chartWidth - paddingRight}
                          y2={y}
                          stroke="#e2e8f0"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                        <text
                          x={paddingLeft - 6}
                          y={y + 3}
                          textAnchor="end"
                          className="text-[8px] font-medium fill-slate-400 font-sans"
                        >
                          {activeChartTab === "revenue"
                            ? `₹${Math.round(maxRevenue * (1 - ratio)).toLocaleString()}`
                            : Math.round(maxUsers * (1 - ratio))
                          }
                        </text>
                      </g>
                    );
                  })}

                  {/* Revenue Line */}
                  {activeChartTab === "revenue" && (
                    <>
                      <path
                        d={linePath}
                        fill="none"
                        stroke="#1f3b45"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      {revenuePoints.map((pt, idx) => (
                        <circle
                          key={idx}
                          cx={pt.x}
                          cy={pt.y}
                          r={3.5}
                          fill="#ffffff"
                          stroke="#1f3b45"
                          strokeWidth="1.5"
                        />
                      ))}
                    </>
                  )}

                  {/* Growth Bars */}
                  {activeChartTab === "users" && (
                    <>
                      {userBars.map((bar, idx) => (
                        <rect
                          key={idx}
                          x={bar.x}
                          y={bar.y}
                          width={bar.width}
                          height={bar.height}
                          rx="2"
                          fill="#1f3b45"
                        />
                      ))}
                    </>
                  )}

                  {/* X Axis labels */}
                  {(activeChartTab === "revenue" ? revenuePoints : userBars).map((pt, idx) => (
                    <text
                      key={idx}
                      x={activeChartTab === "revenue" ? pt.x : pt.x + (pt.width || 0)/2}
                      y={chartHeight - 8}
                      textAnchor="middle"
                      className="text-[8px] font-medium fill-slate-400 font-sans"
                    >
                      {pt.month}
                    </text>
                  ))}
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-primary pb-2 border-b border-slate-100">Actions Panel</h3>

            {/* Quick Assign */}
            <form onSubmit={handleAssignMembership} className="space-y-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Assign Subscription</span>
              <input
                type="email"
                required
                placeholder="User Email"
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-accent text-xs font-semibold"
                value={assignForm.email}
                onChange={(e) => setAssignForm(prev => ({ ...prev, email: e.target.value }))}
              />
              <div className="grid grid-cols-2 gap-1.5">
                <select
                  className="bg-white border border-slate-200 rounded-lg px-1.5 py-1.5 outline-none focus:border-accent text-xs font-semibold"
                  value={assignForm.planId}
                  onChange={(e) => setAssignForm(prev => ({ ...prev, planId: e.target.value }))}
                >
                  <option value="" disabled>Plan</option>
                  {plans.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  required
                  placeholder="Days"
                  className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 outline-none focus:border-accent text-xs font-semibold"
                  value={assignForm.durationDays}
                  onChange={(e) => setAssignForm(prev => ({ ...prev, durationDays: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <button
                type="submit"
                disabled={assigning || plans.length === 0}
                className="w-full bg-primary text-white font-bold py-1.5 rounded-lg text-xs hover:bg-slate-900 active:scale-95 transition-all text-center"
              >
                {assigning ? "Saving..." : "Assign Subscription"}
              </button>

              {assignMessage && (
                <div className={`text-[9px] font-bold p-2 rounded border ${assignMessage.type === "success" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"}`}>
                  {assignMessage.text}
                </div>
              )}
            </form>

            {/* Quick Export & Queue */}
            <div className="space-y-2">
              <button
                onClick={handleExportPayments}
                disabled={exporting}
                className="w-full py-2 bg-slate-950 text-white font-bold rounded-lg hover:bg-slate-900 transition-all active:scale-[0.98] text-xs text-center"
              >
                {exporting ? "Generating CSV..." : "Export Payments CSV"}
              </button>

              {pendingVerifications.length > 0 && (
                <button 
                  onClick={() => setActiveVerification(pendingVerifications[0])}
                  className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg text-xs hover:bg-purple-700 active:scale-95 transition-all text-center"
                >
                  Review Queue ({pendingVerifications.length})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Recent Transactions Feed */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center pb-2 mb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-primary">Recent Transactions</h3>
            <span className="text-[9px] bg-slate-100 text-slate-500 font-bold uppercase tracking-wider px-2 py-0.5 rounded">Live</span>
          </div>

          {isLoading ? (
            <div className="h-40 flex items-center justify-center text-xs text-slate-400 italic">
              Loading...
            </div>
          ) : recentPayments.length === 0 ? (
            <div className="h-40 bg-slate-50 rounded-lg flex items-center justify-center text-xs text-slate-400 italic">
              No recent payments
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentPayments.map((payment, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg border border-slate-100 hover:bg-slate-50/50">
                  <div>
                    <p className="text-xs font-semibold text-primary truncate max-w-[200px]">{payment.user_email}</p>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wide">ID: #{payment.id.slice(0, 8)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-primary">₹{payment.amount.toLocaleString()}</p>
                    <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${payment.status === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"}`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Users Widget */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center pb-2 mb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-primary">Recent Users</h3>
            <span className="text-[9px] bg-slate-100 text-slate-500 font-bold uppercase tracking-wider px-2 py-0.5 rounded">New Accounts</span>
          </div>

          {isLoading ? (
            <div className="h-40 flex items-center justify-center text-xs text-slate-400 italic">
              Loading...
            </div>
          ) : recentUsers.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400 italic">No users found</div>
          ) : (
            <div className="space-y-2.5">
              {recentUsers.map((user, idx) => (
                <div key={idx} className="p-2 border border-slate-100 rounded-lg flex items-center justify-between hover:bg-slate-50/50">
                  <div>
                    <h4 
                      className="text-xs font-bold text-primary hover:text-accent cursor-pointer transition-colors"
                      onClick={() => handleInspectUser(user.id)}
                    >
                      {user.full_name || "New Member"}
                    </h4>
                    <p className="text-[9px] text-slate-400">{user.email}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleToggleUserStatus(user.id)}
                      className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${user.is_active ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"}`}
                    >
                      {user.is_active ? "Active" : "Suspended"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-sm font-bold text-primary">Member details</h3>
              </div>
              <button 
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <h4 className="font-bold text-primary">{selectedUser.full_name || "New Member"}</h4>
                <p className="text-slate-400 font-medium">{selectedUser.email}</p>
                <span className="text-[9px] font-bold text-slate-500 capitalize bg-slate-200 px-1.5 py-0.5 rounded mt-1.5 inline-block">
                  Role: {selectedUser.role}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50/50 p-2 rounded border border-slate-100">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Verification</span>
                  <span className={`font-semibold capitalize mt-0.5 inline-block ${selectedUser.verification_status === "approved" ? "text-emerald-600" : "text-amber-500"}`}>
                    {selectedUser.verification_status || "Unverified"}
                  </span>
                </div>
                <div className="bg-slate-50/50 p-2 rounded border border-slate-100">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Access</span>
                  <span className={`font-semibold mt-0.5 inline-block ${selectedUser.is_active ? "text-emerald-600" : "text-red-500"}`}>
                    {selectedUser.is_active ? "Active" : "Suspended"}
                  </span>
                </div>
                <div className="bg-slate-50/50 p-2 rounded border border-slate-100 col-span-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Phone</span>
                  <span className="font-semibold text-primary mt-0.5 block">{selectedUser.phone_number || "Not provided"}</span>
                </div>
                <div className="bg-slate-50/50 p-2 rounded border border-slate-100 col-span-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Address</span>
                  <span className="font-semibold text-primary mt-0.5 block">
                    {selectedUser.address ? `${selectedUser.address}, ${selectedUser.city || ""}, ${selectedUser.state || ""}` : "Not provided"}
                  </span>
                </div>
              </div>

              {selectedUser.membership ? (
                <div className="bg-emerald-50/30 border border-emerald-100 p-3 rounded-lg text-[11px] space-y-1">
                  <p className="font-bold text-emerald-700">Active Membership Subscription</p>
                  <p className="text-slate-500">Plan ID: {selectedUser.membership.membership_id.slice(0, 8)}</p>
                  <div className="flex gap-4 pt-1">
                    <p>Start: {new Date(selectedUser.membership.start_date).toLocaleDateString()}</p>
                    <p>Expires: {selectedUser.membership.end_date ? new Date(selectedUser.membership.end_date).toLocaleDateString() : "Never"}</p>
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 italic text-center py-2 bg-slate-50 rounded-lg">No active membership</p>
              )}

              <div className="flex gap-2 justify-end pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleToggleUserStatus(selectedUser.id)}
                  className={`px-3 py-1.5 rounded text-xs font-bold border ${selectedUser.is_active ? "border-red-200 text-red-600 hover:bg-red-50" : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"}`}
                >
                  {selectedUser.is_active ? "Suspend" : "Activate"}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-primary text-white rounded text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification Queue Modal */}
      {activeVerification && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-primary">Identity Document Review</h3>
              <button 
                onClick={() => setActiveVerification(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <p><span className="font-bold text-slate-400">User:</span> {activeVerification.email}</p>
                <p><span className="font-bold text-slate-400">Name:</span> {activeVerification.full_name || "Not entered"}</p>
                <p><span className="font-bold text-slate-400">Type:</span> {activeVerification.government_id_type || "Government ID"}</p>
              </div>

              <div>
                <p className="font-bold text-slate-400 mb-1">Attachment:</p>
                {activeVerification.government_id_path ? (
                  <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50 max-h-56 flex items-center justify-center">
                    <img 
                      src={`${import.meta.env.VITE_API_BASE_URL}${activeVerification.government_id_path}`}
                      alt="ID attachment preview"
                      className="object-contain max-h-56 w-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400/f4f7f6/1f3b45?text=ID+Preview";
                      }}
                    />
                  </div>
                ) : (
                  <p className="p-4 border border-dashed text-center text-slate-400 italic">No attachment found</p>
                )}
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-slate-100">
                <button
                  type="button"
                  disabled={reviewing}
                  onClick={() => handleReviewVerification("rejected")}
                  className="px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded text-xs font-bold"
                >
                  Reject
                </button>
                <button
                  type="button"
                  disabled={reviewing}
                  onClick={() => handleReviewVerification("approved")}
                  className="px-4 py-1.5 bg-accent text-primary rounded text-xs font-bold hover:opacity-90"
                >
                  {reviewing ? "Processing..." : "Approve"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
