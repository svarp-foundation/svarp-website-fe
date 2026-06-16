import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function AdminJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    job_type: "Full-time",
    salary_range: "",
    is_active: true,
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/jobs/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (job = null) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        title: job.title,
        description: job.description,
        location: job.location,
        job_type: job.job_type,
        salary_range: job.salary_range || "",
        is_active: job.is_active,
      });
    } else {
      setEditingJob(null);
      setFormData({
        title: "",
        description: "",
        location: "",
        job_type: "Full-time",
        salary_range: "",
        is_active: true,
      });
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editingJob) {
        await axios.put(`${API_URL}/jobs/${editingJob.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/jobs/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setShowModal(false);
      fetchJobs();
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Failed to save job post.");
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job post?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-primary">
            Manage Job Postings
          </h1>
          <p className="text-xs text-slate-500">
            Handle recruitment postings displayed on public career section.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-slate-900 transition-colors w-full sm:w-auto text-center text-xs font-bold mt-2 sm:mt-0"
        >
          Add New Job
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-2.5 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-xs text-primary">
                      {job.title}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded border border-blue-100 bg-blue-50 text-blue-600">
                        {job.job_type}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-600">
                      {job.location}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded border ${job.is_active ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"}`}
                      >
                        {job.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-xs">
                      <button
                        onClick={() => handleOpenModal(job)}
                        className="text-primary hover:text-accent font-bold mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-red-550 text-red-600 hover:text-red-800 font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 border border-slate-200 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-sm font-bold text-primary mb-3">
              {editingJob ? "Edit Job Post" : "Create New Job Post"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none text-xs text-primary font-semibold"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                    Job Type
                  </label>
                  <select
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg outline-none text-xs text-primary font-semibold"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                    <option>Freelance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none text-xs text-primary font-semibold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                  Salary Range (Optional)
                </label>
                <input
                  type="text"
                  name="salary_range"
                  value={formData.salary_range}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none text-xs text-primary font-semibold"
                  placeholder="e.g. ₹5L - ₹8L per annum"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                  Job Description
                </label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none text-xs text-primary font-semibold resize-none"
                ></textarea>
              </div>
              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  name="is_active"
                  id="job-active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="h-3.5 w-3.5 rounded text-primary focus:ring-accent border-slate-200 accent-primary"
                />
                <label htmlFor="job-active" className="text-[10px] font-bold text-slate-600 select-none cursor-pointer">
                  Active (Visible on Careers page)
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 border border-slate-200 text-slate-500 rounded-lg text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-slate-900"
                >
                  {editingJob ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
