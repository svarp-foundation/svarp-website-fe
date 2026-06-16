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

      {isLoading ? (
        <div className="text-center text-xs text-slate-400 italic py-8 bg-white border border-slate-200 rounded-lg shadow-xs">
          Fetching documents...
        </div>
      ) : users.length === 0 ? (
        <div className="text-center text-xs text-slate-400 italic py-8 bg-white border border-slate-200 rounded-lg shadow-xs">
          No pending verifications
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-md border border-slate-200 p-2 flex flex-col justify-between space-y-1.5 hover:border-slate-300 transition-colors shadow-xs"
            >
              <div>
                <h3 className="text-xs font-bold text-primary truncate">
                  {user.full_name || user.email}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium truncate">
                  {user.email}
                </p>
                
                <div className="mt-1.5 flex justify-between items-center bg-slate-50 p-1.5 rounded border border-slate-100">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">
                    {user.government_id_type || "Government ID"}
                  </span>
                  
                  {user.government_id_path ? (
                    <a
                      href={`${import.meta.env.VITE_API_BASE_URL}${user.government_id_path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[9px] font-bold text-primary hover:text-accent underline"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View File
                    </a>
                  ) : (
                    <span className="text-[9px] text-slate-300 italic font-semibold">
                      No document
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-1.5 border-t border-slate-100 flex gap-1.5 justify-end">
                <button
                  className="bg-red-500/10 text-red-600 border border-red-500/20 font-bold px-2 py-0.5 rounded text-[9px] hover:bg-red-555 hover:text-white transition-all shadow-xs"
                  onClick={() => reviewDoc(user.id, "rejected")}
                >
                  Reject
                </button>
                <button
                  className="bg-primary text-white font-bold px-2.5 py-0.5 rounded text-[9px] hover:bg-slate-900 transition-all shadow-xs"
                  onClick={() => reviewDoc(user.id, "approved")}
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVerifications;
