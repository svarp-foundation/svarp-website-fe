import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminMemberships = () => {
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("active"); // active, none
  const { token } = useAuth();

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
                            ? "🔄 Change Plan"
                            : "➕ Assign Membership"}
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
    </div>
  );
};

export default AdminMemberships;
