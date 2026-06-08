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
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 sm:mb-6">
            Certifications & International Certificate
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            SVARP Global offers industry-recognized certification programs
            and international certificates designed to enhance professional
            credibility, global employability, and organizational excellence.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          {certifications.map((item) => (
            <div
              key={item.title}
              className="bg-muted rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* International Certificate Section */}
        <div className="mt-14 sm:mt-20 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
              International Certificate
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              SVARP Global's International Certificate programs are designed
              to meet global competency standards and are suitable for
              professionals seeking international recognition in safety,
              sustainability, quality, and leadership domains.
            </p>

            <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
              <li>• Globally relevant curriculum</li>
              <li>• Industry-focused practical learning</li>
              <li>• Suitable for corporate & individual professionals</li>
              <li>• Enhances global career opportunities</li>
            </ul>
          </div>

          {/* Highlight Card */}
          <div className="relative group overflow-hidden rounded-3xl shadow-xl bg-accent text-white p-8 sm:p-10 flex flex-col justify-between min-h-[350px]">
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('/company/images/IMG-8.webp')` }}
            />
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-primary">
                Why Choose SVARP Certification?
              </h3>

              <ul className="space-y-3 text-sm text-gray-200">
                <li>✔ Expert-led training & assessment</li>
                <li>✔ Alignment with global standards</li>
                <li>✔ Industry-recognized credentials</li>
                <li>✔ Focus on real-world application</li>
                <li>✔ Commitment to sustainability & innovation</li>
              </ul>
            </div>

            <div className="relative z-10 mt-6 border-t border-white/10 pt-4 flex justify-between items-center">
              <span className="font-script text-2xl text-primary">certified for impact</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 sm:mt-20 text-center">
          <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-6">
            Strengthen your professional profile with SVARP Global's
            certification and international certificate programs.
          </p>

          <button className="w-full sm:w-auto bg-accent text-primary px-8 py-3 rounded-full font-medium hover:scale-105 transition">
            Enquire About Certification
          </button>
        </div>
      </div>
    </section>
  );
}
