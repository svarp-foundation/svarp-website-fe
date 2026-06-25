import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { token } = useAuth();

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState(null);
  const [importError, setImportError] = useState(null);

  const handleDownloadTemplate = () => {
    const headers = "email,password,full_name,phone_number\n";
    const blob = new Blob([headers], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "svarp_bulk_user_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = async (e) => {
    e.preventDefault();
    if (!importFile) return;

    setIsImporting(true);
    setImportResults(null);
    setImportError(null);

    const formData = new FormData();
    formData.append("file", importFile);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/users/bulk-import`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImportResults(data);
        fetchUsers();
      } else {
        const errData = await response.json();
        setImportError(errData.detail || "Failed to import users.");
      }
    } catch (error) {
      console.error("Import error", error);
      setImportError("An error occurred during upload.");
    } finally {
      setIsImporting(false);
    }
  };

  const closeImportModal = () => {
    setIsImportModalOpen(false);
    setImportFile(null);
    setImportResults(null);
    setImportError(null);
  };

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
        <button
          onClick={() => setIsImportModalOpen(true)}
          className="bg-primary hover:bg-slate-900 text-white font-bold px-3 py-1.5 rounded-lg transition-all text-xs flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Bulk Import
        </button>
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

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden transform scale-100 transition-all duration-300">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-primary flex items-center gap-1.5">
                <svg className="w-4.5 h-4.5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Bulk Import Users
              </h2>
              <button
                onClick={closeImportModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {!importResults ? (
                <form onSubmit={handleImportCSV} className="space-y-4">
                  <div className="text-xs text-slate-500 leading-relaxed">
                    Upload a CSV file containing user registration details. All imported users will be set to the <span className="font-bold text-slate-700">consumer</span> role.
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-dashed border-slate-200 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">CSV Template</div>
                      <div className="text-[10px] text-slate-400 truncate">Columns: email, password, full_name, phone_number</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleDownloadTemplate}
                      className="bg-white border border-slate-200 text-slate-700 hover:border-slate-300 font-bold px-3 py-1.5 rounded-md transition-all text-[10px] shrink-0 flex items-center gap-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M8 12l4 4m0 0l4-4m-4 4V4" />
                      </svg>
                      Get CSV Template
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Choose CSV File
                    </label>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) => setImportFile(e.target.files[0])}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:border-accent outline-none font-semibold file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-slate-200 file:text-slate-700 hover:file:bg-slate-300 file:cursor-pointer"
                      required
                    />
                  </div>

                  {importError && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-xs font-semibold leading-relaxed flex items-start gap-1.5">
                      <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>{importError}</div>
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={closeImportModal}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-lg transition-all text-xs"
                      disabled={isImporting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-white font-bold px-5 py-2 rounded-lg hover:bg-slate-900 transition-all text-xs disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-1.5"
                      disabled={isImporting || !importFile}
                    >
                      {isImporting && (
                        <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      )}
                      {isImporting ? "Importing..." : "Upload & Import"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl">
                      <div className="text-xl font-extrabold text-emerald-600">
                        {importResults.successful_count}
                      </div>
                      <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                        Successfully Registered
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl border ${importResults.failed_count > 0 ? "bg-red-50 border-red-100" : "bg-slate-50 border-slate-200"}`}>
                      <div className={`text-xl font-extrabold ${importResults.failed_count > 0 ? "text-red-600" : "text-slate-500"}`}>
                        {importResults.failed_count}
                      </div>
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${importResults.failed_count > 0 ? "text-red-500" : "text-slate-400"}`}>
                        Errors / Skipped
                      </div>
                    </div>
                  </div>

                  {importResults.failed_count > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Skipped Records & Errors
                      </h3>
                      <div className="border border-slate-200 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                            <tr>
                              <th className="p-2 border-r border-slate-200 w-12 text-center">Row</th>
                              <th className="p-2 border-r border-slate-200">Email</th>
                              <th className="p-2">Reason</th>
                            </tr>
                          </thead>
                          <tbody className="font-medium text-slate-600 divide-y divide-slate-100">
                            {importResults.errors.map((err, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="p-2 border-r border-slate-200 text-center font-bold text-slate-400">{err.row}</td>
                                <td className="p-2 border-r border-slate-200 font-semibold truncate max-w-[120px]" title={err.email}>{err.email || "-"}</td>
                                <td className="p-2 text-red-500 text-[10px]">{err.error}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={closeImportModal}
                      className="bg-primary text-white font-bold px-6 py-2 rounded-lg hover:bg-slate-900 transition-all text-xs"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
