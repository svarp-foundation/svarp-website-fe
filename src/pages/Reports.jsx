import { useState } from "react";

export default function Reports() {
  const [activeCategory, setActiveCategory] = useState("All");

  const reports = [
    {
      title: "Annual Report 2023–2024",
      desc: "Education, safety, and humanitarian impact assessment with financial transparency statements.",
      category: "Annual Reports",
      date: "June 2024",
      size: "4.8 MB",
      format: "PDF",
    },
    {
      title: "Strategy Plan 2022–2027",
      desc: "Long-term operational roadmap establishing safety leadership and ESG milestones.",
      category: "Strategic Plans",
      date: "January 2022",
      size: "3.2 MB",
      format: "PDF",
    },
    {
      title: "Solar Project Report – Northern Iraq",
      desc: "Detailed sustainable energy campaign outcomes across remote refugee and community camps.",
      category: "Project Reports",
      date: "September 2023",
      size: "2.9 MB",
      format: "PDF",
    },
    {
      title: "Community Empowerment Report",
      desc: "Grassroots outreach safety training, livelihood coaching, and youth empowerment audits.",
      category: "Project Reports",
      date: "March 2024",
      size: "5.1 MB",
      format: "PDF",
    },
  ];

  const categories = ["All", "Annual Reports", "Strategic Plans", "Project Reports"];

  const filteredReports = activeCategory === "All"
    ? reports
    : reports.filter((r) => r.category === activeCategory);

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-muted relative overflow-hidden">
      {/* Premium background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase bg-white px-4 py-1.5 rounded-full inline-block mb-3 sm:mb-4 shadow-sm">
            Transparency & Impact
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-primary tracking-tight">
            Reports & Documents
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Access our annual audits, five-year strategic maps, and program-level records. We maintain strict reporting guidelines to share our development milestones.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-200/60 pb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md shadow-primary/10"
                  : "bg-white text-gray-600 hover:bg-gray-100 hover:text-primary border border-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Document list */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {filteredReports.map((report) => (
              <div
                key={report.title}
                className="group bg-white rounded-3xl p-6 border border-gray-100/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {report.category}
                  </span>
                  
                  <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors duration-200">
                    {report.title}
                  </h3>
                  
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {report.desc}
                  </p>

                  {/* Document details row */}
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-400">
                    <span className="flex items-center gap-1">
                      📅 Published: {report.date}
                    </span>
                    <span className="flex items-center gap-1">
                      📄 {report.format} ({report.size})
                    </span>
                  </div>
                </div>

                {/* Download trigger */}
                <button className="shrink-0 w-full sm:w-auto bg-primary text-white hover:bg-accent hover:text-primary border border-transparent px-6 py-3 rounded-full text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all duration-300 text-center flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
              </div>
            ))}

            {filteredReports.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center text-gray-500 border border-gray-100">
                No documents found in this category.
              </div>
            )}
          </div>

          {/* Sidebar Highlight Block */}
          <div className="bg-primary text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            {/* Background Accent Ambient light */}
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <span className="text-4xl">🔬</span>
              <h3 className="text-2xl font-bold tracking-tight">Our Integrity Guarantee</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                "At SVARP Global, we believe total financial accountability and performance audit transparency form the pillars of reliable social work."
              </p>
              <div className="pt-4 border-t border-white/10 flex flex-col gap-1">
                <span className="font-bold text-accent text-sm">Swastik Sharma</span>
                <span className="text-xs text-white/60">Executive Officer, SVARP Global</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
