export default function Projects() {
  const services = [
    {
      title: "EHS & Sustainability Audits",
      desc: "Workplace safety, compliance audits, and ESG integration aligned with ISO and global standards.",
    },
    {
      title: "Training & Certification Programs",
      desc: "Industry-relevant professional training in safety, quality, ESG, leadership, and sustainability.",
    },
    {
      title: "Corporate Membership & Advisory",
      desc: "Customized advisory services, safety consulting, and annual corporate membership programs.",
    },
    {
      title: "HAZOP, QRA & Risk Engineering",
      desc: "Advanced risk assessments, process safety studies, and fire & explosion risk engineering.",
    },
    {
      title: "Community & Youth Empowerment",
      desc: "Education, skill development, and social responsibility programs for communities and institutions.",
    },
    {
      title: "Wellness & Leadership Development",
      desc: "Holistic programs focused on wellness, leadership, fitness, and life skills across age groups.",
    },
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Our Services & Initiatives
          </h1>
          <p className="text-lg text-gray-600">
            SVARP Foundation delivers integrated solutions across safety,
            sustainability, risk management, and social impact to help
            organizations and communities grow responsibly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-700 mb-6 text-lg">
            Join the movement for safety, sustainability, and social change.
          </p>

          <button className="bg-accent text-primary px-8 py-3 rounded-full font-medium hover:scale-105 transition">
            Connect with SVARP
          </button>
        </div>
      </div>
    </section>
  );
}
