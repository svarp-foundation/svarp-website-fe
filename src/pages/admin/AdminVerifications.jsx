import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminVerifications = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  const fetchVerifications = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/verifications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching verifications", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, [token]);

  const reviewDoc = async (userId, status) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/verifications/${userId}/review`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            reason: status === "rejected" ? "Document incomplete" : "",
          }),
        },
      );
      if (response.ok) {
        fetchVerifications();
      }
    } catch (error) {
      console.error("Review failed", error);
    }
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="text-xl font-bold text-primary">
          Identity Verification
        </h1>
        <p className="text-xs text-slate-500">
          Review and verify community member documents.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Document Type
                </th>
                <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Preview
                </th>
                <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-6 text-center text-xs text-slate-400 italic"
                  >
                    Fetching documents...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-6 text-center text-xs text-slate-400 italic"
                  >
                    No pending verifications
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-4 py-2.5 font-bold text-xs text-primary">
                      {user.full_name || user.email}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-600">
                      {user.government_id_type || "Government ID"}
                    </td>
                    <td className="px-4 py-2.5">
                      {user.government_id_path ? (
                        <a
                          href={`${import.meta.env.VITE_API_BASE_URL}${user.government_id_path}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-[10px] font-bold px-2 py-1 rounded hover:bg-slate-100 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View File
                        </a>
                      ) : (
                        <span className="text-[10px] text-slate-300">No file</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex gap-1.5">
                        <button
                          className="bg-primary text-white font-bold px-3 py-1 rounded text-[10px] hover:bg-slate-900 transition-all shadow-xs"
                          onClick={() => reviewDoc(user.id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500/10 text-red-600 border border-red-500/20 font-bold px-3 py-1 rounded text-[10px] hover:bg-red-500 hover:text-white transition-all shadow-xs"
                          onClick={() => reviewDoc(user.id, "rejected")}
                        >
                          Reject
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

export default AdminVerifications;
