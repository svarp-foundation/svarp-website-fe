import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleApply = (jobId) => {
    navigate(`/careers/${jobId}`);
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
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
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
                    <span className="text-gray-500 text-xs font-semibold">
                      Location: {job.location}
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
                      Salary: {job.salary_range}
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-gray-400 italic">
                      Competitive Salary
                    </span>
                  )}
                  <button
                    onClick={() => handleApply(job.id)}
                    className="text-xs font-bold text-primary group-hover:text-accent transition-all duration-200 flex items-center gap-1"
                  >
                    View & Apply <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
