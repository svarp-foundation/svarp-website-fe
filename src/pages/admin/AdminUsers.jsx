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
        `${import.meta.env.VITE_API_BASE_URL}/admin/users?status=${statusFilter === "all" ? "" : statusFilter}&query=${searchTerm}`,
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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">User Management</h1>
          <p className="text-slate-500">
            Manage community members and their access.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex-1 relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-accent transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchUsers()}
          />
        </div>
        <select
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-accent text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
        <button
          onClick={fetchUsers}
          className="bg-accent text-primary font-bold px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-accent/20 transition-all text-sm"
        >
          Apply Filters
        </button>
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
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-bottom border-slate-100">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-bottom border-slate-100">
                  Joined
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-bottom border-slate-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-slate-400 italic"
                  >
                    Finding members...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-slate-400 italic"
                  >
                    No members found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary">
                        {user.full_name || "New User"}
                      </div>
                      <div className="text-xs text-slate-400">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm capitalize text-slate-600">
                      {user.role}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                          user.is_active
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {user.is_active ? "Active" : "Suspended"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      Jun 12, 2023
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleStatus(user.id)}
                          className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 hover:border-accent hover:text-accent transition-all"
                          title={user.is_active ? "Suspend" : "Activate"}
                        >
                          {user.is_active ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 hover:border-red-500 hover:text-red-500 transition-all"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
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

export default AdminUsers;
