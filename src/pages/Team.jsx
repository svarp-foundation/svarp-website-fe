import { useState } from "react";
import {
  drShilpiBansal,
  preetiChaudhary,
  priyankaVerma,
  rajvirSingh,
  santoshSingh,
  seemaChaudhary,
  poonamSingh,
  vikashKumar,
  swastikSharma,
  praveenKumarDuggal,
  drVeenaChugh
} from "../assets/assets";

function TeamCard({ member, defaultImg }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/10 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group min-h-[280px]">
      {/* Top Accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Avatar Circle with Shadow */}
        <img
          src={member.img || defaultImg}
          alt={member.name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-fill mb-4 sm:mb-6 border border-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-500"
        />

        {/* Name & Role */}
        <h3 className="text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-1">
          {member.name}
        </h3>
        <p className="text-xs sm:text-sm text-accent font-semibold tracking-wider uppercase mb-4">
          {member.role}
        </p>

        {/* Bio */}
        <p className={`text-gray-600 text-sm leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
          {member.bio}
        </p>
      </div>

      <div className="mt-4 pt-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-semibold text-primary hover:text-accent transition-colors duration-200 focus:outline-none flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              See Less
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
            </>
          ) : (
            <>
              See More
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function Team({ isStandalone = false }) {
  const team = [
    {
      img: rajvirSingh,
      name: "Late Mr. Rajvir Singh",
      role: "Former Director",
      bio: "A distinguished leader with over 40 years of experience in Central Government governance, administration, and public policy. His vision laid the foundation for SVARP Global's values of integrity and service.",
    },
    {
      img: santoshSingh,
      name: "Mrs. Santosh Singh",
      role: "Director",
      bio: "A committed social activist focused on women empowerment, community welfare, and social development initiatives across diverse groups.",
    },
    {
      img: preetiChaudhary,
      name: "Dr. Preeti Chaudhary",
      role: "Director",
      bio: "PhD in Sociology with deep expertise in community development, social research, and educational empowerment programs.",
    },
    {
      img: vikashKumar,
      name: "Mr. Vikash Kumar",
      role: "CEO & Founder",
      bio: "An HSE leader and global trainer specializing in risk management, safety leadership, sustainability, and professional certification programs.",
    },
    {
      img: seemaChaudhary,
      name: "Ms. Seema Chaudhary",
      role: "Project Director",
      bio: "A fitness and wellness specialist with a strong sports background, leading wellness, health, and holistic development initiatives.",
    },
    {
      img: poonamSingh,
      name: "Mrs. Poonam Singh",
      role: "Project Director",
      bio: "A philosophy graduate dedicated to promoting life skills, home management education, and personal development programs.",
    },
    {
      img: priyankaVerma,
      name: "Mrs. Priyanka Verma",
      role: "Project Director",
      bio: "An education specialist with over 15 years of experience in academic leadership, curriculum development, and training delivery.",
    },
    {
      img: drShilpiBansal,
      name: "Dr. Shilpi Bansal",
      role: "Project Director",
      bio: "Dr. Shilpi Bansal, Ph.D. (Environmental Science), brings over 22 years of environmental management and compliance expertise to SVARP Global.",
    },
    {
      img: swastikSharma,
      name: "Mr. Swastik Sharma",
      role: "Head of Software & IT",
      bio: "An IT infrastructure and software engineering lead driving digital platforms, LMS tools, and portal development for SVARP.",
    },
    {
      img: drVeenaChugh,
      name: "Dr. Veena Chugh",
      role: "Resource Professional",
      bio: "A senior anesthesiologist and former Director General Health Services, Government of Haryana, with 25+ years of experience in trauma care, emergency response, patient safety, and critical care. She brings extensive expertise in trauma resuscitation, Golden Hour response, safety protocols, medical training, and community health initiatives, with a strong commitment to advancing road safety and reducing road traffic injuries."
    },
    {
      img: praveenKumarDuggal,
      name: "Praveen Kumar Duggal",
      role: "Safety & Fire Professional",
      bio: "A seasoned Safety Engineer and Occupational Health & Safety specialist with 44 years of experience in industrial safety, fire protection, emergency management, safety audits, and training across power plants, construction sites, and hazardous industries."
    },
    {
      img: "https://kgdarcnvrkzjyasdpoab.supabase.co/storage/v1/object/public/Company%20Portal/profile%20images/hr001.jpeg",
      name: "Vani Baliyan",
      role: "Graphics Designer & Social Media Manager",
      bio: "A creative professional specializing in graphic design, visual communication, social media management, and digital content creation, focused on building engaging brand identities and strengthening online presence."
    },
    {
      img: "https://kgdarcnvrkzjyasdpoab.supabase.co/storage/v1/object/public/Company%20Portal/profile%20images/sales002.png",
      name: "Robin Chaudhary",
      role: "E-Commerce & Documentation Manager",
      bio: "A detail-oriented professional specializing in e-commerce operations, product management, documentation, and digital workflows, ensuring organized processes and efficient management of online business operations."
    },
  ];

  const defaultImg =
    "https://ui-avatars.com/api/?background=9bcf9b&color=1f3b45&size=256";

  return (
    <section className={`pb-16 sm:pb-24 bg-white relative overflow-hidden ${isStandalone ? "pt-24 sm:pt-32" : "pt-16 sm:pt-32"}`}>
      {/* Decorative premium background blobs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-primary leading-tight">
              Our Team
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              SVARP Global is guided by experienced professionals, educators,
              and social leaders committed to safety, sustainability, and
              community empowerment.
            </p>
          </div>
        </div>

        {/* Team Grid Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {team.map((member, i) => (
            <TeamCard key={i} member={member} defaultImg={defaultImg} />
          ))}
        </div>

        {/* Values Strip */}
        <div className="mt-12 sm:mt-20 bg-muted rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center">
          <p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto">
            Our team brings together expertise in education, safety leadership,
            sustainability, wellness, and social development to create
            meaningful, measurable impact across industries and communities.
          </p>

          <p className="mt-4 sm:mt-6 text-accent font-script text-2xl sm:text-3xl">
            leadership with purpose
          </p>
        </div>
      </div>
    </section>
  );
}
