import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/jobs/applications/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_URL}/jobs/applications/${appId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchApplications();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-600 border-yellow-100";
      case "reviewed":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "interviewed":
        return "bg-purple-50 text-purple-600 border-purple-100";
      case "hired":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "rejected":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="text-xl font-bold text-primary">Job Applications</h1>
        <p className="text-xs text-slate-500">
          Review details of candidates applying for public job vacancies.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center text-xs text-slate-400 italic py-8 bg-white border border-slate-200 rounded-lg shadow-xs">
          No job applications received
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-md border border-slate-200 p-2 flex flex-col justify-between space-y-1.5 hover:border-slate-300 transition-colors shadow-xs"
            >
              <div>
                <div className="flex justify-between items-start gap-1">
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-primary truncate">
                      {app.full_name}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                      {app.email} • {app.phone}
                    </p>
                  </div>
                  <span
                    className={`px-1 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border shrink-0 ${getStatusStyle(
                      app.status,
                    )}`}
                  >
                    {app.status}
                  </span>
                </div>

                <div className="mt-1.5 p-1.5 bg-slate-50 rounded border border-slate-100 flex justify-between items-center text-[10px] text-slate-600 font-bold gap-2">
                  <span className="truncate">
                    Job: {app.job?.title || "Unknown Job"}
                  </span>
                  <a
                    href={`${API_URL}/${app.resume_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent font-bold underline shrink-0 inline-flex items-center gap-0.5"
                  >
                    Resume
                  </a>
                </div>
              </div>

              <div className="pt-1.5 border-t border-slate-100 flex justify-between items-center gap-2">
                <span className="text-[9px] text-slate-400 font-semibold shrink-0">
                  Applied: {new Date(app.created_at).toLocaleDateString()}
                </span>
                
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app.id, e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 outline-none text-[9px] font-bold text-primary"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="interviewed">Interviewed</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
