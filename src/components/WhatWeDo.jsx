import { useTranslation } from "react-i18next";

export default function WhatWeDo() {
  const { t } = useTranslation();

  const items = [
    {
      title: t("whatWeDo.ehsAudits"),
      subtitle: t("whatWeDo.ehsAuditsDesc"),
      image: "/company/images/IMG-1.webp",
    },
    {
      title: t("whatWeDo.training"),
      subtitle: t("whatWeDo.trainingDesc"),
      image: "/company/images/IMG-2.webp",
    },
    {
      title: t("whatWeDo.riskEngineering"),
      subtitle: t("whatWeDo.riskEngineeringDesc"),
      image: "/company/images/IMG-3.webp",
    },
    {
      title: t("whatWeDo.corporateAdvisory"),
      subtitle: t("whatWeDo.corporateAdvisoryDesc"),
      image: "/company/images/IMG-4.webp",
    },
    {
      title: t("whatWeDo.communityEmpowerment"),
      subtitle: t("whatWeDo.communityEmpowermentDesc"),
      image: "/company/images/IMG-5.webp",
    },
    {
      title: t("whatWeDo.wellness"),
      subtitle: t("whatWeDo.wellnessDesc"),
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
            {t("whatWeDo.title")}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            {t("whatWeDo.description")}
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
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay for readable text */}
              <div className="absolute inset-0 bg-primary/75 group-hover:bg-primary/85 transition-colors duration-300" />
              
              {/* Content */}
              <div className="relative z-10 space-y-1 sm:space-y-2 text-white">
                <h3 className="text-sm sm:text-lg md:text-xl font-bold leading-tight group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-200 line-clamp-2 leading-tight">
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
