import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
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
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        navigate("/careers");
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [jobId, navigate]);

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
    data.append("job_id", jobId);
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
    } catch (error) {
      console.error("Error applying:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-muted flex flex-col items-center justify-center pt-24 text-center px-4">
        <div className="text-5xl font-bold text-gray-300 mb-4">404</div>
        <h2 className="text-2xl font-bold text-primary mb-2">Job Not Found</h2>
        <Link to="/careers" className="text-primary hover:text-accent font-bold">
          &larr; Back to Careers
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-muted pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Brand blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/careers"
            className="inline-flex items-center text-sm font-bold text-primary hover:text-accent transition-colors duration-200 group"
          >
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Open Roles
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
          {/* Main details column */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="px-3 py-1 bg-accent/20 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {job.job_type}
                </span>
                <span className="text-gray-300 text-xs">|</span>
                <span className="text-gray-500 text-xs font-semibold">
                  Location: {job.location}
                </span>
                {job.salary_range && (
                  <>
                    <span className="text-gray-300 text-xs">|</span>
                    <span className="text-gray-500 text-xs font-semibold">
                      Salary: {job.salary_range}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                {job.title}
              </h1>

              <div className="prose max-w-none text-gray-700 space-y-6 leading-relaxed">
                <h3 className="text-lg font-bold text-primary border-b border-gray-100 pb-2">
                  Role Overview & Description
                </h3>
                <p className="whitespace-pre-line text-sm sm:text-base text-gray-600">
                  {job.description}
                </p>
              </div>
            </div>
          </div>

          {/* Application form column */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-md lg:sticky lg:top-28">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary">Apply Now</h3>
              <p className="text-xs text-gray-500 mt-1">
                Please complete the form below to submit your application.
              </p>
            </div>

            {success ? (
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-green-50 text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-primary">Application Sent!</h4>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Thank you for your interest in SVARP Global. Our recruitment team will review your qualifications and contact you if there is a match.
                </p>
                <div className="pt-4">
                  <Link
                    to="/careers"
                    className="inline-block px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-primary font-bold text-xs rounded-xl transition"
                  >
                    Browse Other Roles
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <div>
                  <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                    Email Address
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
                    Phone Number
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

                <div>
                  <label className="block text-xs font-bold text-primary mb-1.5 uppercase tracking-wider">
                    Resume / CV (PDF)
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
                      <svg className="w-8 h-8 mx-auto text-primary/70 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <p className="text-xs font-bold text-primary line-clamp-1">
                        {resume ? resume.name : "Click or Drag to Upload CV"}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        PDF, DOC, DOCX up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    name="cover_letter"
                    rows="3"
                    value={formData.cover_letter}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-sm transition resize-none"
                    placeholder="Tell us why you are a good match for this role..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex justify-center items-center px-6 py-3.5 bg-primary text-white border border-transparent font-bold rounded-xl hover:bg-accent hover:text-primary transition shadow-md disabled:opacity-50 mt-4 active:scale-[0.98]"
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
    </div>
  );
}
