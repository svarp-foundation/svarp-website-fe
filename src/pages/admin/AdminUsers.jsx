import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { token } = useAuth();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/users?status=${statusFilter === "all" ? "" : statusFilter}&search=${searchTerm}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [statusFilter, token]);

  const toggleStatus = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/users/${userId}/status`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) fetchUsers();
    } catch (error) {
      console.error("Status toggle failed", error);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure? This will delete all user records."))
      return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/users/${userId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) fetchUsers();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex justify-between items-end pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-primary">User Management</h1>
          <p className="text-xs text-slate-500">
            Manage community members and their access.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by name/email..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-3 py-1.5 outline-none focus:border-accent text-xs font-semibold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchUsers()}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 outline-none focus:border-accent text-xs font-semibold"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <button
            onClick={fetchUsers}
            className="bg-primary text-white font-bold px-4 py-1.5 rounded-lg hover:bg-slate-900 transition-all text-xs"
          >
            Search
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-xs text-slate-400 italic py-8 bg-white border border-slate-200 rounded-lg shadow-xs">
          Finding members...
        </div>
      ) : users.length === 0 ? (
        <div className="text-center text-xs text-slate-400 italic py-8 bg-white border border-slate-200 rounded-lg shadow-xs">
          No members found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-md border border-slate-200 p-2 flex flex-col justify-between space-y-1.5 hover:border-slate-300 transition-colors shadow-xs"
            >
              <div className="flex justify-between items-start gap-1">
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-primary truncate">
                    {user.full_name || "New User"}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium truncate">
                    {user.email}
                  </p>
                </div>
                <span
                  className={`px-1 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border shrink-0 ${
                    user.is_active
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-red-50 text-red-600 border-red-100"
                  }`}
                >
                  {user.is_active ? "Active" : "Suspended"}
                </span>
              </div>
              
              <div className="flex justify-between items-center pt-1.5 border-t border-slate-100 gap-2">
                <span className="text-[8px] font-bold bg-slate-100 text-slate-500 px-1 py-0.5 rounded capitalize tracking-wide shrink-0">
                  {user.role}
                </span>
                
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className="p-1 rounded bg-slate-50 border border-slate-200 text-slate-500 hover:border-accent hover:text-accent transition-all"
                    title={user.is_active ? "Suspend" : "Activate"}
                  >
                    {user.is_active ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="p-1 rounded bg-slate-50 border border-slate-200 text-slate-500 hover:border-red-500 hover:text-red-500 transition-all"
                    title="Delete"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
