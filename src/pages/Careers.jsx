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
    <div className="min-h-dvh bg-muted pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Brand blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase bg-white px-4 py-1.5 rounded-full inline-block mb-3 sm:mb-4 shadow-sm">
            Careers at SVARP Global
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">
            Join Our Team
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Help us build a safer, smarter, and more sustainable future. Browse our current open roles or send in a speculative application.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <span className="text-4xl mb-4 inline-block">💼</span>
            <p className="text-gray-500 text-base sm:text-lg">
              No open positions at the moment. <br />Please check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="group bg-white rounded-3xl border border-gray-100 p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  {/* Job Header Badges */}
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="px-3 py-1 bg-accent/20 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {job.job_type}
                    </span>
                    <span className="text-gray-300 text-xs">|</span>
                    <span className="text-gray-500 text-xs font-semibold flex items-center gap-1">
                      📍 {job.location}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-200 mb-3 line-clamp-1">
                    {job.title}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {job.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                  {job.salary_range ? (
                    <span className="text-xs font-bold text-gray-400">
                      💰 {job.salary_range}
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-gray-400 italic">
                      Competitive Salary
                    </span>
                  )}
                  <button
                    onClick={() => handleApply(job)}
                    className="text-xs font-bold text-primary group-hover:text-accent transition-all duration-200 flex items-center gap-1"
                  >
                    View & Apply <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Application Modal Popup */}
        {showForm && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
              {/* Close Icon */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-gray-500 flex items-center justify-center transition"
                aria-label="Close form"
              >
                ✕
              </button>

              <div className="p-6 sm:p-8">
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-primary">
                    Apply: {selectedJob?.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">
                    {selectedJob?.job_type} • {selectedJob?.location}
                  </p>
                </div>

                {!success && (
                  <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-gray-100/50">
                    <h4 className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                      Role Overview
                    </h4>
                    <p className="text-gray-600 text-xs leading-relaxed whitespace-pre-line">
                      {selectedJob?.description}
                    </p>
                  </div>
                )}

                {success ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 text-2xl">
                      ✓
                    </div>
                    <h4 className="text-xl font-bold text-primary">
                      Application Sent!
                    </h4>
                    <p className="text-sm text-gray-600 max-w-sm mx-auto">
                      Thank you for your interest in SVARP Global. Our HR team will evaluate your CV and reach out soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name input */}
                    <div>
                      <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        required
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-sm transition"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email and Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-sm transition"
                          placeholder="john@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-sm transition"
                          placeholder="+91 99999 88888"
                        />
                      </div>
                    </div>

                    {/* Styled Custom File Upload Zone */}
                    <div>
                      <label className="block text-xs font-bold text-primary mb-1.5 uppercase tracking-wider">
                        Resume (PDF)
                      </label>
                      <div className="relative border-2 border-dashed border-gray-200 rounded-2xl hover:border-accent transition bg-slate-50/50 p-4 text-center cursor-pointer">
                        <input
                          type="file"
                          required
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="space-y-1">
                          <span className="text-2xl mb-1 inline-block">📤</span>
                          <p className="text-xs font-bold text-primary">
                            {resume ? resume.name : "Click or Drag to Upload CV"}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            PDF, DOC, DOCX up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Cover letter */}
                    <div>
                      <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                        Cover Letter (Optional)
                      </label>
                      <textarea
                        name="cover_letter"
                        rows="3"
                        value={formData.cover_letter}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-sm transition"
                        placeholder="Introduce yourself and tell us why you are a good match..."
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex justify-center items-center px-6 py-3.5 bg-primary text-white border border-transparent font-bold rounded-xl hover:bg-accent hover:text-primary transition shadow-md disabled:opacity-50 mt-4"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting Application...
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
        )}
      </div>
    </div>
  );
}
