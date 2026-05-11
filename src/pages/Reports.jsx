export default function Reports() {
  const reports = [
    {
      title: "Annual Report 2023–2024",
      desc: "Education & humanitarian impact assessment",
    },
    {
      title: "Strategy Plan 2022–2027",
      desc: "Long-term vision and operational roadmap",
    },
    {
      title: "Solar Project Report – Northern Iraq",
      desc: "Sustainable energy initiative for camps",
    },
    {
      title: "Community Empowerment Report",
      desc: "Supporting survivors through education",
    },
  ];

  return (
    <section className="pt-32 pb-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Reports & Documents
          </h1>
          <p className="text-gray-600 text-lg">
            Access our annual reports, strategy plans, and project documentation
            outlining our mission, transparency, and measurable impact.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Reports List */}
          <div className="md:col-span-2 space-y-6">
            {reports.map((r) => (
              <div
                key={r.title}
                className="group bg-white/80 backdrop-blur border border-gray-200 rounded-2xl p-6 flex justify-between items-start hover:shadow-xl transition"
              >
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {r.desc}
                  </p>
                </div>

                <button className="shrink-0 bg-accent text-primary px-4 py-2 rounded-full text-sm font-medium group-hover:scale-105 transition">
                  Download ⬇
                </button>
              </div>
            ))}
          </div>

          {/* Side Quote / Highlight */}
          <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-between">
            <p className="text-lg leading-relaxed text-gray-700">
              “Transparency builds trust. Our reports reflect our commitment to
              accountability, dignity, and long-term impact.”
            </p>

            <p className="mt-8 text-accent font-script text-3xl">
              Impact through action
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
