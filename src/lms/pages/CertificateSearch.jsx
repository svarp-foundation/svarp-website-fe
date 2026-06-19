import React, { useState, useEffect } from "react";

import { 
  ShieldCheck, 
  Search, 
  ChevronLeft, 
  Award, 
  Globe, 
  CheckCircle 
} from "lucide-react";

const APP_URL = import.meta.env.VITE_APP_URL || "https://globalacademy.svarp.org";

const CertificateSearch = () => {
  const [certificateId, setCertificateId] = useState("");

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    const code = certificateId.trim();
    if (code) {
      window.location.href = `${APP_URL}/verify/${code}`;
    }
  };

  return (
    <div className="min-h-[calc(100dvh-80px)] sm:min-h-[calc(100dvh-96px)] bg-muted relative overflow-hidden pt-20 sm:pt-24 pb-16 sm:pb-24 flex items-center justify-center px-6 selection:bg-accent/30">
      {/* Decorative Brand Ambient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Context & Trust */}
        <div className="reveal">
          <a
            href={`${APP_URL}`}
            className="inline-flex items-center gap-2 text-gray-505 hover:text-primary font-bold mb-8 transition-colors text-sm"
          >
            <ChevronLeft size={18} />
            Back to Academy
          </a>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/10 border border-accent/20 text-primary rounded-md text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck size={14} className="text-accent" />
            Secure Verification
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold text-primary mb-6 leading-tight tracking-tight">
            Verify Excellence with Global Standards.
          </h1>
          
          <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-md leading-relaxed">
            Enter a unique Certificate ID to instantly validate the authenticity of credentials issued by SVARP Global Academy.
          </p>

          <div className="space-y-4">
            {[
              "Real-time Registry Access",
              "Tamper-proof Digital IDs",
              "Globally Recognized Accreditation"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-accent flex-shrink-0" />
                <span className="font-semibold text-gray-750 text-xs sm:text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Search Interface */}
        <div className="reveal reveal-delay-200">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-gray-100 relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-3xl -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-700"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-8 text-accent shadow-inner">
                <Award size={32} />
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                Validator Portal
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-8 font-medium">
                Please enter the 12-character ID found on the bottom-left of the certificate.
              </p>

              <form onSubmit={handleVerify} className="space-y-4">
                <div className="relative">
                  <Search 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" 
                    size={20} 
                  />
                  <input
                    type="text"
                    placeholder="e.g. SV-2024-8849"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-4 focus:ring-accent/10 focus:border-accent outline-none transition-all font-mono placeholder:font-sans text-sm"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-accent hover:text-primary transition-all duration-300 shadow-lg shadow-primary/10 flex items-center justify-center gap-2 group/btn text-sm"
                >
                  Verify Now
                  <Globe size={18} className="group-hover/btn:rotate-12 transition-transform" />
                </button>
              </form>
              
              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-accent" />
                  GDPR Compliant
                </span>
                <span>•</span>
                <span>Encrypted Audit Trail</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CertificateSearch;
