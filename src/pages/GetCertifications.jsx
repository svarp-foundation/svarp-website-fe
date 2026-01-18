export default function GetCertifications() {
  const certifications = [
    {
      title: "Professional Safety Certifications",
      desc: "Industry-aligned certification programs focused on workplace safety, risk management, and compliance with national and international standards.",
    },
    {
      title: "Sustainability & ESG Certifications",
      desc: "Programs designed to build expertise in sustainability practices, ESG integration, and responsible business operations.",
    },
    {
      title: "Quality & Management Systems",
      desc: "Certification courses aligned with ISO standards, quality management, and operational excellence frameworks.",
    },
    {
      title: "Leadership & Professional Development",
      desc: "Skill-based certifications covering leadership, safety culture, ethics, and organizational development.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Certifications & International Certificate
          </h1>
          <p className="text-lg text-gray-600">
            SVARP Foundation offers industry-recognized certification programs
            and international certificates designed to enhance professional
            credibility, global employability, and organizational excellence.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {certifications.map((item) => (
            <div
              key={item.title}
              className="bg-muted rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* International Certificate Section */}
        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              International Certificate
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              SVARP Foundation’s International Certificate programs are designed
              to meet global competency standards and are suitable for
              professionals seeking international recognition in safety,
              sustainability, quality, and leadership domains.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li>• Globally relevant curriculum</li>
              <li>• Industry-focused practical learning</li>
              <li>• Suitable for corporate & individual professionals</li>
              <li>• Enhances global career opportunities</li>
            </ul>
          </div>

          {/* Highlight Card */}
          <div className="bg-primary text-white rounded-3xl p-10 shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">
              Why Choose SVARP Certification?
            </h3>

            <ul className="space-y-3 text-sm opacity-90">
              <li>✔ Expert-led training & assessment</li>
              <li>✔ Alignment with global standards</li>
              <li>✔ Industry-recognized credentials</li>
              <li>✔ Focus on real-world application</li>
              <li>✔ Commitment to sustainability & innovation</li>
            </ul>

            <p className="mt-6 text-accent font-script text-2xl">
              certified for impact
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-700 text-lg mb-6">
            Strengthen your professional profile with SVARP Foundation’s
            certification and international certificate programs.
          </p>

          <button className="bg-accent text-primary px-8 py-3 rounded-full font-medium hover:scale-105 transition">
            Enquire About Certification
          </button>
        </div>
      </div>
    </section>
  );
}
