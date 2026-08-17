import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminMemberships = () => {
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("active"); // active, none
  const { token } = useAuth();

  const [editingPlan, setEditingPlan] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: 0,
    features: "",
    duration_days: 0,
    description: "",
    highlight: false,
  });

  useEffect(() => {
    if (editingPlan) {
      setEditForm({
        name: editingPlan.name || "",
        price: editingPlan.price || 0,
        features: editingPlan.features || "",
        duration_days: editingPlan.duration_days || 365,
        description: editingPlan.description || "",
        highlight: editingPlan.highlight || false,
      });
    }
  }, [editingPlan]);

  const handleUpdatePlan = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/memberships/${editingPlan.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );
      if (response.ok) {
        alert("Membership plan updated successfully!");
        setEditingPlan(null);
        fetchData();
      } else {
        const err = await response.json();
        alert(`Error: ${err.detail}`);
      }
    } catch (error) {
      console.error("Update plan failed", error);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const usersRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const plansRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/memberships/`,
      );

      if (usersRes.ok && plansRes.ok) {
        setUsers(await usersRes.json());
        setPlans(await plansRes.json());
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const assignMembership = async (userId) => {
    if (plans.length === 0) {
      alert("No membership plans found in database.");
      return;
    }

    const planOptions = plans.map((p, i) => `${i + 1}. ${p.name}`).join("\n");
    const choice = window.prompt(`Select Plan Number:\n${planOptions}`, "1");
    if (!choice) return;

    const selectedPlan = plans[parseInt(choice) - 1];
    if (!selectedPlan) {
      alert("Invalid choice.");
      return;
    }

    const days = window.prompt(
      `Enter duration in days for ${selectedPlan.name}:`,
      selectedPlan.duration_days.toString(),
    );
    if (!days) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/memberships/assign`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            membership_id: selectedPlan.id,
            duration_days: parseInt(days),
          }),
        },
      );
      if (response.ok) {
        alert("Membership assigned successfully!");
        fetchData();
      } else {
        const err = await response.json();
        alert(`Error: ${err.detail}`);
      }
    } catch (error) {
      console.error("Assignment failed", error);
    }
  };

  const cancelMembership = async (userId) => {
    if (!window.confirm("Are you sure you want to cancel this user's membership?")) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/memberships/cancel/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        alert("Membership cancelled successfully!");
        fetchData();
      } else {
        const err = await response.json();
        alert(`Error: ${err.detail}`);
      }
    } catch (error) {
      console.error("Cancellation failed", error);
    }
  };


  const filteredUsers = users.filter((u) => {
    if (filter === "active") return u.membership != null;
    if (filter === "none") return u.membership == null;
    return true;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "Forever";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-primary">
            Membership Management
          </h1>
          <p className="text-xs text-slate-500">
            Monitor active subscriptions or assign new ones manually.
          </p>
        </div>
        <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200 mt-2 sm:mt-0 shadow-xs">
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded text-xs font-bold transition-all ${filter === "active" ? "bg-white text-primary shadow-xs" : "text-slate-500 hover:text-primary"}`}
          >
            Active Members
          </button>
          <button
            onClick={() => setFilter("none")}
            className={`px-3 py-1 rounded text-xs font-bold transition-all ${filter === "none" ? "bg-white text-primary shadow-xs" : "text-slate-500 hover:text-primary"}`}
          >
            No Membership
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-xs text-slate-400 italic py-8 bg-white border border-slate-200 rounded-lg shadow-xs">
          Synchronizing database...
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center text-xs text-slate-400 italic py-8 bg-white border border-slate-200 rounded-lg shadow-xs">
          No users found in this category
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-md border border-slate-200 p-2 flex flex-col justify-between space-y-1.5 hover:border-slate-300 transition-colors shadow-xs"
            >
              <div className="flex justify-between items-start gap-1">
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-primary truncate">
                    {user.full_name || user.email.split("@")[0]}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium truncate">
                    {user.email}
                  </p>
                </div>
                <span
                  className={`px-1 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border shrink-0 ${
                    user.membership && user.membership.is_active
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-slate-50 text-slate-400 border-slate-100"
                  }`}
                >
                  {user.membership && user.membership.is_active
                    ? "Active Member"
                    : "No Plan"}
                </span>
              </div>

              <div className="pt-1.5 border-t border-slate-100 flex flex-col justify-between gap-1.5">
                <div className="flex justify-between items-center text-[10px] text-slate-600 font-semibold">
                  <span>
                    Plan:{" "}
                    {user.membership
                      ? plans.find((p) => p.id === user.membership.membership_id)
                          ?.name || "Active Plan"
                      : "None"}
                  </span>
                  {user.membership && (
                    <span className="text-[9px] text-slate-400 font-semibold">
                      Exp: {formatDate(user.membership.end_date)}
                    </span>
                  )}
                </div>
                {user.membership ? (
                  <div className="flex gap-1.5 w-full">
                    <button
                      onClick={() => assignMembership(user.id)}
                      className="flex-1 py-1 rounded-md font-bold text-[10px] transition-all border border-slate-200 text-slate-600 hover:bg-slate-50 outline-none"
                    >
                      Modify Plan
                    </button>
                    {user.membership.is_active && (
                      <button
                        onClick={() => cancelMembership(user.id)}
                        className="py-1 px-2.5 rounded-md font-bold text-[10px] transition-all bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 outline-none border border-red-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => assignMembership(user.id)}
                    className="w-full py-1 rounded-md font-bold text-[10px] transition-all bg-primary text-white hover:bg-slate-900 outline-none"
                  >
                    Assign Plan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Manage Membership Plans Section */}
      <div className="mt-6 bg-slate-50/50 rounded-xl border border-slate-200 p-4">
        <h2 className="text-base font-bold text-primary mb-1">Membership Plans Settings</h2>
        <p className="text-slate-500 mb-4 text-xs">Modify plan descriptions, prices, benefits, or highlight status.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xs font-bold text-primary">{plan.name}</h3>
                  {plan.highlight ? (
                    <span className="text-[8px] font-bold bg-accent text-primary px-1.5 py-0.5 rounded border border-accent/20 uppercase">
                      Highlighted
                    </span>
                  ) : (
                    <span className="text-[8px] font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                      Regular
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold text-primary mb-1">
                  ₹{plan.price.toLocaleString()} <span className="text-[10px] text-slate-400 font-semibold">({plan.duration_days} days)</span>
                </div>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{plan.description || "No description provided."}</p>
                <div className="space-y-1 mb-4">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Benefits Checklist</span>
                  <div className="max-h-20 overflow-y-auto border border-slate-100 rounded-lg p-1.5 bg-slate-50/50">
                    {plan.features ? (
                      plan.features.split(",").map((feat, idx) => (
                        <div key={idx} className="text-[10px] text-slate-600 flex items-center gap-1 py-0.5 font-medium">
                          <span className="text-emerald-500 font-bold">✓</span> {feat.trim()}
                        </div>
                      ))
                    ) : (
                      <span className="text-[9px] text-slate-400 italic">No benefits defined</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setEditingPlan(plan)}
                className="w-full bg-slate-950 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-primary transition-all active:scale-[0.98]"
              >
                Edit Plan Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Editing Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-sm font-bold text-primary mb-1">Edit Plan: {editingPlan.name}</h3>
            <p className="text-[10px] text-slate-400 mb-4">Update membership metadata stored in the database.</p>
            
            <form onSubmit={handleUpdatePlan} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Plan Display Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none text-xs text-primary font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none text-xs text-primary font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    value={editForm.duration_days}
                    onChange={(e) => setEditForm({ ...editForm, duration_days: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none text-xs text-primary font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Tagline Description</label>
                <textarea
                  rows="2"
                  required
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none text-xs text-primary font-semibold resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Benefits (Comma-separated)</label>
                <textarea
                  rows="2"
                  required
                  value={editForm.features}
                  onChange={(e) => setEditForm({ ...editForm, features: e.target.value })}
                  placeholder="e.g. Free Certifications, Unlimited access"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none text-[10px] text-primary font-semibold resize-none"
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="highlight"
                  checked={editForm.highlight}
                  onChange={(e) => setEditForm({ ...editForm, highlight: e.target.checked })}
                  className="w-3.5 h-3.5 rounded text-primary focus:ring-accent border-slate-200 accent-primary"
                />
                <label htmlFor="highlight" className="text-[10px] font-bold text-slate-600 select-none cursor-pointer">
                  Highlight this plan
                </label>
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-3 py-1.5 border border-slate-200 text-slate-500 rounded-lg text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-slate-900"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMemberships;
