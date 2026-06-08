import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: "EHS & Sustainability Audits",
      desc: "Workplace safety, compliance audits, and ESG integration aligned with ISO and global standards.",
      detailedDesc: "SVARP Global provides end-to-end Environmental, Health, and Safety (EHS) audits alongside comprehensive ESG integration consulting. We help organizations ensure compliance with local and international regulatory frameworks while establishing robust corporate sustainability models.",
      image: "/company/images/IMG-1.webp",
      highlights: [
        "ISO 14001 & 45001 Compliance audits",
        "ESG Materiality mapping & reporting",
        "Site safety inspections & action plans",
        "Carbon footprint & environmental audits",
      ],
    },
    {
      title: "Training & Certification Programs",
      desc: "Industry-relevant professional training in safety, quality, ESG, leadership, and sustainability.",
      detailedDesc: "Empower your workforce with our industry-recognized safety and management training. We offer custom-designed programs that build internal competencies in workplace safety, risk control, and quality systems.",
      image: "/company/images/IMG-2.webp",
      highlights: [
        "Safety Officer Certification (EHS Leadership)",
        "First Aid, CPR & Emergency Response drills",
        "ESG compliance & sustainability workshops",
        "Custom sector-specific safety modules",
      ],
    },
    {
      title: "Corporate Membership & Advisory",
      desc: "Customized advisory services, safety consulting, and annual corporate membership programs.",
      detailedDesc: "Our annual advisory memberships provide corporations with ongoing access to SVARP's pool of safety and sustainability experts. Receive continuous support, regular site visits, and priority consultation.",
      image: "/company/images/IMG-4.webp",
      highlights: [
        "Dedicated senior EHS & ESG advisor",
        "Quarterly compliance & advisory audits",
        "Custom policy formulation & SOP updates",
        "Priority emergency safety consultation",
      ],
    },
    {
      title: "HAZOP, QRA & Risk Engineering",
      desc: "Advanced risk assessments, process safety studies, and fire & explosion risk engineering.",
      detailedDesc: "Identify, analyze, and mitigate potential hazards in complex chemical, manufacturing, and engineering processes. Our technical team conducts precise engineering safety studies using global methodologies.",
      image: "/company/images/IMG-3.webp",
      highlights: [
        "HAZOP study facilitation & reporting",
        "Quantitative Risk Assessment (QRA) models",
        "Fire & explosion safety system design",
        "Consequence & emergency response mapping",
      ],
    },
    {
      title: "Community & Youth Empowerment",
      desc: "Education, skill development, and social responsibility programs for communities and institutions.",
      detailedDesc: "We believe long-term safety and sustainability start at the grassroots level. SVARP Global initiates campaigns and projects to support community development, education, and youth empowerment.",
      image: "/company/images/IMG-5.webp",
      highlights: [
        "Road safety & hygiene campaigns",
        "School Eco-Club setups & resources",
        "Vocational training & skill development",
        "CSR project implementation and management",
      ],
    },
    {
      title: "Wellness & Leadership Development",
      desc: "Holistic programs focused on wellness, leadership, fitness, and life skills across age groups.",
      detailedDesc: "A sustainable future requires healthy, resilient individuals. Our wellness and leadership programs focus on physical fitness, stress management, mental health, and active life skills.",
      image: "/company/images/IMG-6.webp",
      highlights: [
        "Executive wellness & stress management",
        "Adaptive leadership coaching for managers",
        "Youth physical fitness & nutrition classes",
        "Mental wellness & mindfulness seminars",
      ],
    },
  ];

  const metrics = [
    { value: "100+", label: "Audits Completed" },
    { value: "10K+", label: "Professionals Trained" },
    { value: "50+", label: "Corporate Partners" },
    { value: "10+", label: "Years of Advisory" },
  ];

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-muted relative overflow-hidden">
      {/* Background blobs for premium depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase bg-white px-4 py-1.5 rounded-full inline-block mb-3 sm:mb-4 shadow-sm">
            Services & Solutions
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 sm:mb-6 text-primary leading-tight">
            Our Services & Initiatives
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            SVARP Global delivers integrated solutions across safety,
            sustainability, risk management, and social impact to help
            organizations and communities grow responsibly.
          </p>
        </div>

        {/* Hero Metrics Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {metrics.map((m, idx) => (
            <div key={idx} className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100/50 flex flex-col justify-center text-center">
              <span className="text-2xl sm:text-3xl font-bold text-primary mb-1">{m.value}</span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((item) => (
            <div
              key={item.title}
              onClick={() => setSelectedService(item)}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 border border-gray-100 transition-all duration-300 group flex flex-col cursor-pointer"
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Quick View
                </span>
              </div>
              
              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-2 mb-2">
                    {item.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                        <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Learn More link */}
                <div className="text-xs font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1 mt-6 border-t border-gray-50 pt-4">
                  Learn More <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 sm:mt-24 text-center max-w-2xl mx-auto">
          <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
            Ready to design a safer, more sustainable environment for your business or community?
          </p>

          <button 
            onClick={() => navigate("/contact")}
            className="w-full sm:w-auto bg-primary text-white border border-transparent hover:bg-white hover:text-primary hover:border-primary px-8 py-3.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            Connect with SVARP
          </button>
        </div>
      </div>

      {/* Enhanced Interactive Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition"
              aria-label="Close details"
            >
              ✕
            </button>

            {/* Modal Image Header */}
            <div className="relative h-48 sm:h-64">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-accent bg-accent/20 px-3 py-1 rounded-full backdrop-blur-md inline-block mb-2">
                  Detailed Service Overview
                </span>
                <h2 className="text-xl sm:text-3xl font-bold leading-tight">
                  {selectedService.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                {selectedService.detailedDesc}
              </p>

              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 border-b pb-2">
                Core Offerings & Key Highlights
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {selectedService.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end border-t border-gray-100 pt-6">
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto border border-gray-200 hover:bg-muted text-gray-700 px-6 py-3 rounded-full text-sm font-medium transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    navigate("/contact");
                  }}
                  className="w-full sm:w-auto bg-primary text-white hover:bg-white hover:text-primary hover:border-primary border border-transparent px-6 py-3 rounded-full text-sm font-medium transition shadow-sm"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
