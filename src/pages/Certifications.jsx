import React from "react";
import { NavLink } from "react-router-dom";
import cert1 from "../assets/certifications/certificate-1.webp";
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

// Removed background image import as user requested plain white background

const certificates = [
  {
    id: 1,
    image: cert2,
    title: "GST Registration Certificate",
    subtitle: "(Government of India)",
    year: "2024",
  },
  {
    id: 2,
    image: cert3,
    title: "UDYAM Registration",
    subtitle: "(MSME – Micro Enterprise)",
    year: "2024",
  },
  {
    id: 4,
    image: cert6,
    title: "CSR Registration",
    subtitle: "(Ministry of Corporate Affairs)",
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
    subtitle: "(Ministry of Social Justice & Empowerment)",
    year: "2024",
  },
  {
    id: 11,
    image: cert7,
    title: "NGO DARPAN Profile Details",
    subtitle: "",
    year: "2024",
  },
  {
    id: 10,
    image: cert5,
    title: "Company Registration",
    subtitle: "(Section 8 – Companies Act 2013)",
    year: "2024",
  },
];

export default function Certifications() {
  return (
    <section className="min-h-dvh bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24">
        {/* Header Section */}
        <div className="mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Our <span className="text-accent">Certifications</span> & Awards
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Recognitions and certifications received by our organization,
            demonstrating our commitment to quality, safety, and compliance.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="relative bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6"
            >
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-accent/10 text-accent text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full border border-accent/20">
                {cert.year}
              </div>

              <div className="h-44 sm:h-56 w-full flex items-center justify-center mb-4 sm:mb-6 bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md"
                />
              </div>

              <div className="text-center">
                <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                  {cert.title}
                </h3>
                {cert.subtitle && (
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    {cert.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-14 sm:mt-20 text-center">
          <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
            We are continuously striving for excellence and expanding our
            credentials.
          </p>
          <NavLink
            to="/contact"
            className="inline-block w-full sm:w-auto bg-accent text-white font-bold px-8 py-3 rounded-full hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent/20 text-center"
          >
            Partner With Us
          </NavLink>
        </div>
      </div>
    </section>
  );
}
