export default function WhatWeDo() {
  const items = [
    {
      title: "EHS & Sustainability Audits",
      subtitle: "ISO-aligned safety & ESG compliance",
      image: "/company/images/IMG-1.webp",
    },
    {
      title: "Training & Certifications",
      subtitle: "Professional safety & leadership programs",
      image: "/company/images/IMG-2.webp",
    },
    {
      title: "Risk Engineering",
      subtitle: "HAZOP, QRA & process safety studies",
      image: "/company/images/IMG-3.webp",
    },
    {
      title: "Corporate Advisory",
      subtitle: "Membership & customized consulting",
      image: "/company/images/IMG-4.webp",
    },
    {
      title: "Community Empowerment",
      subtitle: "Education & social responsibility",
      image: "/company/images/IMG-5.webp",
    },
    {
      title: "Wellness & Leadership",
      subtitle: "Holistic growth & skill development",
      image: "/company/images/IMG-6.webp",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-muted relative overflow-hidden">
      {/* Decorative Brand Ambient Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6">
            What We Do
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            SVARP Global delivers integrated solutions across safety,
            sustainability, professional development, and social impact for
            organizations and communities.
          </p>
        </div>

        {/* Circles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 md:gap-12 place-items-center">
          {items.map((item) => (
            <div
              key={item.title}
              className="group relative w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full overflow-hidden flex flex-col items-center justify-center text-center p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              {/* Background Image with Zoom on Hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              {/* Dark/Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/55 to-black/85 transition-all duration-300 group-hover:from-black/90 group-hover:via-black/65 group-hover:to-black/90" />
              
              {/* Content */}
              <div className="relative z-10 text-white">
                <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-1 sm:mb-2 leading-tight group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-200 opacity-90 leading-snug">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
