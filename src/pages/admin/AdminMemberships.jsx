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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Membership Management
          </h1>
          <p className="text-slate-500">
            Monitor active subscriptions or assign new ones manually.
          </p>
        </div>
        <div className="flex bg-white rounded-xl border border-slate-200 p-1">
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === "active" ? "bg-accent text-primary shadow-sm" : "text-slate-500 hover:text-primary"}`}
          >
            Active Members
          </button>
          <button
            onClick={() => setFilter("none")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === "none" ? "bg-accent text-primary shadow-sm" : "text-slate-500 hover:text-primary"}`}
          >
            No Membership
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-bottom border-slate-100">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-bottom border-slate-100">
                  Current Plan
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-bottom border-slate-100">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-bottom border-slate-100">
                  Expiry/Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-10 text-center text-slate-400 italic"
                  >
                    Synchronizing database...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-10 text-center text-slate-400 italic"
                  >
                    No users found in this category
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary">
                        {user.full_name || user.email.split("@")[0]}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">
                      {user.membership
                        ? plans.find(
                            (p) => p.id === user.membership.membership_id,
                          )?.name || "Active Plan"
                        : "None"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                          user.membership && user.membership.is_active
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-50 text-slate-400"
                        }`}
                      >
                        {user.membership && user.membership.is_active
                          ? "Active"
                          : "None"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      <div className="flex flex-col gap-2 items-start">
                        {user.membership && (
                          <div className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                            Exp: {formatDate(user.membership.end_date)}
                          </div>
                        )}
                        <button
                          onClick={() => assignMembership(user.id)}
                          className={`${user.membership ? "text-primary hover:text-accent" : "bg-accent text-primary px-4 py-1.5 rounded-lg hover:shadow-lg hover:shadow-accent/20"} font-bold text-xs active:scale-95 transition-all outline-none flex items-center gap-1`}
                        >
                          {user.membership
                            ? "Change Plan"
                            : "Assign Membership"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manage Membership Plans Section */}
      <div className="mt-12 bg-slate-50/50 rounded-2xl border border-slate-200 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Membership Plans Settings</h2>
        <p className="text-slate-500 mb-8 text-sm">Modify plan descriptions, prices, benefits, or highlight status stored in the database.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-primary">{plan.name}</h3>
                  {plan.highlight ? (
                    <span className="text-[10px] font-extrabold bg-accent text-primary px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Highlighted
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md">
                      Regular
                    </span>
                  )}
                </div>
                <div className="text-xl font-black text-primary mb-2">
                  ₹{plan.price.toLocaleString()} <span className="text-xs text-slate-400 font-semibold">({plan.duration_days} days)</span>
                </div>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{plan.description || "No description provided."}</p>
                <div className="space-y-1 mb-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Benefits Checklist</span>
                  <div className="max-h-24 overflow-y-auto border border-slate-100 rounded-lg p-2 bg-slate-50/50">
                    {plan.features ? (
                      plan.features.split(",").map((feat, idx) => (
                        <div key={idx} className="text-xs text-slate-600 flex items-center gap-1.5 py-0.5">
                          <span className="text-emerald-500 font-bold">✓</span> {feat.trim()}
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No benefits defined</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setEditingPlan(plan)}
                className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-primary transition-all active:scale-[0.98]"
              >
                Edit Plan Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Editing Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in zoom-in duration-300 relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-primary mb-1">Edit Plan: {editingPlan.name}</h3>
            <p className="text-xs text-slate-400 mb-6">Update membership metadata stored in the database.</p>
            
            <form onSubmit={handleUpdatePlan} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Plan Display Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm text-primary font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm text-primary font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    value={editForm.duration_days}
                    onChange={(e) => setEditForm({ ...editForm, duration_days: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm text-primary font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Tagline Description</label>
                <textarea
                  rows="2"
                  required
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none text-sm text-primary font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Benefits (Comma-separated)</label>
                <textarea
                  rows="3"
                  required
                  value={editForm.features}
                  onChange={(e) => setEditForm({ ...editForm, features: e.target.value })}
                  placeholder="e.g. Free Certifications, Unlimited access, Priority support"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none text-xs text-primary font-medium resize-none"
                />
              </div>

              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="highlight"
                  checked={editForm.highlight}
                  onChange={(e) => setEditForm({ ...editForm, highlight: e.target.checked })}
                  className="w-4 h-4 rounded text-primary focus:ring-accent border-slate-200 accent-primary"
                />
                <label htmlFor="highlight" className="text-xs font-bold text-slate-700 select-none cursor-pointer">
                  Highlight this plan (e.g. "Best Value" flag in plans display)
                </label>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-accent text-primary rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98] transition-all"
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
