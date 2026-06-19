import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../lib/api";
import {
  CheckCircle2,
  XCircle,
  Award,
  Calendar,
  User,
  BookOpen,
  ShieldCheck,
  ChevronLeft,
  Loader2,
} from "lucide-react";

const APP_URL = import.meta.env.VITE_APP_URL || "https://globalacademy.svarp.org";

const VerifyCertificate = () => {
  const { certificateCode } = useParams();
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerification = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/public/certificates/verify/${certificateCode}`,
        );
        setVerification(response.data);
      } catch (err) {
        console.error("Verification error:", err);
        setError(
          err.response?.data?.detail || "Certificate not found or invalid.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (certificateCode) {
      fetchVerification();
    }
  }, [certificateCode]);

  if (loading) {
    return (
      <div className="min-h-[calc(100dvh-80px)] sm:min-h-[calc(100dvh-96px)] bg-muted flex flex-col items-center justify-center p-6 text-center pt-20 sm:pt-24">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          Verifying Certificate...
        </h2>
        <p className="text-gray-555 mt-2 text-sm">
          Connecting to SVARP Secure Registry
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100dvh-80px)] sm:min-h-[calc(100dvh-96px)] bg-muted flex flex-col items-center justify-center p-6 text-center pt-20 sm:pt-24 selection:bg-accent/30">
        <div className="bg-white p-12 rounded-xl shadow-xl max-w-md w-full border border-red-150 relative overflow-hidden">
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-primary mb-4">
            Verification Failed
          </h2>
          <p className="text-gray-600 text-sm mb-8">{error}</p>
          <a
            href={`${APP_URL}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-accent hover:text-primary transition-all duration-300 text-sm"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Academy
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100dvh-80px)] sm:min-h-[calc(100dvh-96px)] bg-muted pt-20 sm:pt-24 pb-16 sm:pb-24 px-6 relative overflow-hidden selection:bg-accent/30">
      {/* Decorative Brand Ambient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto relative z-10">
        <a
          href={`${APP_URL}`}
          className="inline-flex items-center gap-2 text-gray-505 hover:text-primary font-bold mb-6 transition-colors text-sm"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Academy
        </a>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row transition-all duration-300 hover:shadow-primary/10">
          {/* Left Side: Status & Badge */}
          <div className="bg-primary p-8 flex flex-col items-center justify-center text-center text-white md:w-1/3">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center border-4 border-accent/20 shadow-2xl">
                {verification.profile_picture_url ? (
                  <img
                    src={verification.profile_picture_url}
                    alt={verification.student_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = ""; 
                    }}
                  />
                ) : (
                  <ShieldCheck className="w-12 h-12 text-accent" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-accent text-primary p-1.5 rounded-full shadow-lg">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <h2 className="text-xl font-bold mb-1">Authenticated</h2>
            <div className="px-3 py-0.5 rounded-md bg-white/10 border border-white/20 text-accent text-[9px] font-bold tracking-widest uppercase">
              {verification.status}
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="p-8 md:p-10 flex-1 relative">
            <div className="absolute top-0 right-0 p-6 opacity-[0.02]">
              <Award className="w-32 h-32 text-primary" />
            </div>

            <div className="relative z-10">
              <div className="mb-6">
                <p className="text-[9px] font-bold text-accent uppercase tracking-widest mb-1">
                  Certificate of Achievement
                </p>
                <h1 className="text-xl sm:text-2xl font-extrabold text-primary leading-tight">
                  Authentic Credential Verified
                </h1>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/60 border border-gray-50">
                  <div className="w-10 h-10 rounded-md bg-white shadow-sm flex items-center justify-center text-accent">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-500 font-bold uppercase mb-0.5 tracking-wider">
                      Learner Name
                    </p>
                    <p className="text-base sm:text-lg font-bold text-primary">
                      {verification.student_name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/60 border border-gray-50">
                  <div className="w-10 h-10 rounded-md bg-white shadow-sm flex items-center justify-center text-accent">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-505 text-gray-500 font-bold uppercase mb-0.5 tracking-wider">
                      Course Completed
                    </p>
                    <p className="text-base sm:text-lg font-bold text-primary">
                      {verification.course_title}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/60 border border-gray-50">
                    <div className="w-10 h-10 rounded-md bg-white shadow-sm flex items-center justify-center text-accent">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-500 font-bold uppercase mb-0.5 tracking-wider">
                        Issue Date
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-primary">
                        {new Date(verification.issue_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/60 border border-gray-50">
                    <div className="w-10 h-10 rounded-md bg-white shadow-sm flex items-center justify-center text-accent">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-500 font-bold uppercase mb-0.5 tracking-wider">
                        Certificate ID
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-primary font-mono truncate max-w-[150px]">
                        {verification.certificate_code}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0" />
                <p className="text-xs text-primary font-semibold leading-relaxed">
                  This certificate has been issued by <strong>SVARP Global Academy</strong> after successful
                  completion of all required assessments and identity verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
