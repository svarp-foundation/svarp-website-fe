export default function WhatWeDo() {
  const items = [
    {
      title: "EHS & Sustainability Audits",
      subtitle: "ISO-aligned safety & ESG compliance",
    },
    {
      title: "Training & Certifications",
      subtitle: "Professional safety & leadership programs",
    },
    {
      title: "Risk Engineering",
      subtitle: "HAZOP, QRA & process safety studies",
    },
    {
      title: "Corporate Advisory",
      subtitle: "Membership & customized consulting",
    },
    {
      title: "Community Empowerment",
      subtitle: "Education & social responsibility",
    },
    {
      title: "Wellness & Leadership",
      subtitle: "Holistic growth & skill development",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            What We Do
          </h2>
          <p className="text-gray-600 text-lg">
            SVARP Foundation delivers integrated solutions across safety,
            sustainability, professional development, and social impact for
            organizations and communities.
          </p>
        </div>

        {/* Circles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 place-items-center">
          {items.map((item) => (
            <div
              key={item.title}
              className="group w-44 h-44 md:w-52 md:h-52 rounded-full border border-gray-300 flex flex-col items-center justify-center text-center p-6 hover:bg-muted hover:shadow-xl transition"
            >
              <h3 className="text-sm md:text-base font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 opacity-80">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
