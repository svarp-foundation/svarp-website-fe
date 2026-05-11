import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    cover_letter: "",
  });
  const [resume, setResume] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/jobs/`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowForm(true);
    setSuccess(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append("job_id", selectedJob.id);
    data.append("full_name", formData.full_name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("cover_letter", formData.cover_letter);
    data.append("resume", resume);

    try {
      await axios.post(`${API_URL}/jobs/apply`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setFormData({ full_name: "", email: "", phone: "", cover_letter: "" });
      setResume(null);
      setTimeout(() => setShowForm(false), 3000);
    } catch (error) {
      console.error("Error applying:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className=" mb-16 ">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Join Our Team
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Help us build a safer brand more sustainable future.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg p-2">
              No open positions at the moment. <br />Check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full uppercase tracking-widest">
                    {job.job_type}
                  </span>
                  <span className="text-gray-300 text-xs">|</span>
                  <span className="text-gray-500 text-xs font-medium">
                    {job.location}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">
                  {job.title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {job.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  {job.salary_range ? (
                    <span className="text-xs font-semibold text-gray-400">
                      {job.salary_range}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-gray-300 italic">
                      Competitive Salary
                    </span>
                  )}
                  <button
                    onClick={() => handleApply(job)}
                    className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    View & Apply →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-8 pt-8 pb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Apply for {selectedJob?.title}
                    </h3>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {!success && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <h4 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
                        Job Description
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                        {selectedJob?.description}
                      </p>
                    </div>
                  )}

                  {success ? (
                    <div className="text-center py-8">
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                        <svg
                          className="h-10 w-10 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        Application Sent!
                      </h4>
                      <p className="text-gray-600">
                        Thank you for applying. We'll be in touch soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          required
                          value={formData.full_name}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 rounded-xl border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-3 rounded-xl border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-3 rounded-xl border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Resume (PDF)
                        </label>
                        <input
                          type="file"
                          required
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Cover Letter (Optional)
                        </label>
                        <textarea
                          name="cover_letter"
                          rows="4"
                          value={formData.cover_letter}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 rounded-xl border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Tell us why you're a good fit..."
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200"
                      >
                        {submitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
