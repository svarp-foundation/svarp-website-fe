import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import cert2 from "../assets/certifications/certificate-2.webp";
import cert3 from "../assets/certifications/certificate-3.webp";
import cert4 from "../assets/certifications/certificate-4.webp";
import cert5 from "../assets/certifications/certificate-5.webp";
import cert6 from "../assets/certifications/certificate-6.webp";
import cert7 from "../assets/certifications/certificate-7.webp";
import cert8 from "../assets/certifications/certificate-8.webp";
import cert9 from "../assets/certifications/certificate-9.webp";
import cert10 from "../assets/certifications/certificate-10.webp";
import cert11 from "../assets/certifications/certificate-11.webp";

const certificates = [
  {
    id: 1,
    image: cert2,
    title: "GST Registration Certificate",
    subtitle: "Government of India",
    year: "2024",
  },
  {
    id: 2,
    image: cert3,
    title: "UDYAM Registration",
    subtitle: "MSME – Micro Enterprise",
    year: "2024",
  },
  {
    id: 4,
    image: cert6,
    title: "CSR Registration",
    subtitle: "Ministry of Corporate Affairs",
    year: "2025",
  },
  {
    id: 5,
    image: cert8,
    title: "ISO 9001:2015",
    subtitle: "Quality Management System",
    year: "2025",
  },
  {
    id: 6,
    image: cert9,
    title: "ISO 14001:2015",
    subtitle: "Environmental Management System",
    year: "2025",
  },
  {
    id: 7,
    image: cert10,
    title: "ISO 45001:2018",
    subtitle: "Occupational Health & Safety",
    year: "2025",
  },
  {
    id: 8,
    image: cert11,
    title: "ISO 50001:2018",
    subtitle: "Energy Management System",
    year: "2025",
  },
  {
    id: 9,
    image: cert4,
    title: "NGO DARPAN Enrollment",
    subtitle: "Ministry of Social Justice & Empowerment",
    year: "2024",
  },
  {
    id: 11,
    image: cert7,
    title: "NGO DARPAN Profile Details",
    subtitle: "Enrollment verification record",
    year: "2024",
  },
  {
    id: 10,
    image: cert5,
    title: "Company Registration",
    subtitle: "Section 8 – Companies Act 2013",
    year: "2024",
  },
];

export default function Certifications() {
  const [activeCertIndex, setActiveCertIndex] = useState(null);

  const handleOpenLightbox = (index) => {
    setActiveCertIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveCertIndex(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveCertIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveCertIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="min-h-dvh bg-muted relative overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-24">
      {/* Decorative Brand Ambient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase bg-white px-4 py-1.5 rounded-full inline-block shadow-sm">
            Compliance & Accreditation
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
            Our <span className="text-accent bg-accent/10 px-2 py-0.5 rounded-lg">Certifications</span> & Accreditation
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Recognitions and quality management system standard certifications received by SVARP Global, proving our EHS auditing and community governance excellence.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              onClick={() => handleOpenLightbox(index)}
              className="group relative bg-white border border-gray-100/80 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Year badge */}
              <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm group-hover:bg-accent group-hover:text-primary transition duration-300">
                {cert.year}
              </div>

              {/* Certificate image wrapper */}
              <div className="relative h-44 sm:h-52 w-full flex items-center justify-center mb-5 bg-slate-50/50 rounded-2xl p-4 overflow-hidden border border-gray-50">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Zoom Hover Overlay */}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-[1px]">
                  <span className="bg-white/95 text-primary text-xs font-bold px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    🔍 View Full Certificate
                  </span>
                </div>
              </div>

              {/* Certificate labels */}
              <div className="text-center pb-2">
                <h3 className="text-base sm:text-lg font-bold text-primary mb-1">
                  {cert.title}
                </h3>
                {cert.subtitle && (
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                    {cert.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Call Section */}
        <div className="mt-16 sm:mt-24 text-center max-w-xl mx-auto space-y-5">
          <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider font-semibold">
            🛡️ Striving for international governance & auditing standards
          </p>
          <NavLink
            to="/contact"
            className="inline-block bg-primary text-white hover:bg-accent hover:text-primary border border-transparent px-8 py-3.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 text-sm"
          >
            Connect With Our Compliance Team
          </NavLink>
        </div>
      </div>

      {/* Slide Lightbox Modal Overlay */}
      {activeCertIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={handleCloseLightbox}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center transition z-50"
            aria-label="Close Lightbox"
          >
            ✕
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center transition z-40 active:scale-90"
            aria-label="Previous Certificate"
          >
            ‹
          </button>

          {/* Certificate Container with Metadata */}
          <div
            className="max-w-3xl w-full flex flex-col items-center justify-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Aspect Frame */}
            <div className="bg-white p-3 sm:p-5 rounded-3xl shadow-2xl max-h-[70vh] sm:max-h-[75vh] flex items-center justify-center overflow-hidden border border-white/10 relative">
              <img
                src={certificates[activeCertIndex].image}
                alt={certificates[activeCertIndex].title}
                className="max-h-[60vh] sm:max-h-[65vh] w-auto object-contain rounded-lg sm:rounded-xl"
              />
            </div>

            {/* Modal details */}
            <div className="text-center text-white space-y-1 px-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/20 px-3 py-1 rounded-full">
                Year: {certificates[activeCertIndex].year}
              </span>
              <h3 className="text-lg sm:text-2xl font-bold tracking-tight mt-2">
                {certificates[activeCertIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {certificates[activeCertIndex].subtitle}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center transition z-40 active:scale-90"
            aria-label="Next Certificate"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
