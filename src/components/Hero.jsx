import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  const row1Unique = [
    "/company/images/IMG-1.webp",
    "/company/images/IMG-2.webp",
    "/company/images/IMG-3.webp",
    "/company/images/IMG-4.webp",
    "/company/images/IMG-5.webp",
    "/company/images/IMG-6.webp",
  ];
  const row2Unique = [
    "/company/images/IMG-7.webp",
    "/company/images/IMG-8.webp",
    "/company/images/IMG-9.webp",
    "/company/images/IMG-10.webp",
    "/company/images/IMG-11.webp",
    "/company/images/IMG-1.webp",
  ];
  const row3Unique = [
    "/company/images/IMG-5.webp",
    "/company/images/IMG-3.webp",
    "/company/images/IMG-8.webp",
    "/company/images/IMG-2.webp",
    "/company/images/IMG-11.webp",
    "/company/images/IMG-4.webp",
  ];
  const row4Unique = [
    "/company/images/IMG-6.webp",
    "/company/images/IMG-9.webp",
    "/company/images/IMG-1.webp",
    "/company/images/IMG-10.webp",
    "/company/images/IMG-7.webp",
    "/company/images/IMG-3.webp",
  ];
  const row5Unique = [
    "/company/images/IMG-2.webp",
    "/company/images/IMG-8.webp",
    "/company/images/IMG-5.webp",
    "/company/images/IMG-11.webp",
    "/company/images/IMG-6.webp",
    "/company/images/IMG-1.webp",
  ];

  const row1Images = [...row1Unique, ...row1Unique];
  const row2Images = [...row2Unique, ...row2Unique];
  const row3Images = [...row3Unique, ...row3Unique];
  const row4Images = [...row4Unique, ...row4Unique];
  const row5Images = [...row5Unique, ...row5Unique];

  return (
    <section className="relative min-h-[100dvh] flex items-center bg-zinc-950 overflow-hidden">
      {/* Slanted Background Moving Collage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-[-15%] flex flex-col gap-3 sm:gap-6 transform -rotate-3 sm:-rotate-6 scale-115 justify-center h-[130%]">
          
          {/* Row 1: Left-moving */}
          <div className="flex overflow-hidden w-full select-none flex-shrink-0">
            <div className="flex gap-3 sm:gap-5 whitespace-nowrap animate-marquee-left">
              {row1Images.map((img, idx) => (
                <div key={idx} className="w-40 sm:w-64 h-24 sm:h-40 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
                  <img src={img} alt="SVARP" className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right-moving */}
          <div className="flex overflow-hidden w-full select-none flex-shrink-0">
            <div className="flex gap-3 sm:gap-5 whitespace-nowrap animate-marquee-right">
              {row2Images.map((img, idx) => (
                <div key={idx} className="w-40 sm:w-64 h-24 sm:h-40 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
                  <img src={img} alt="SVARP" className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Left-moving */}
          <div className="flex overflow-hidden w-full select-none flex-shrink-0">
            <div className="flex gap-3 sm:gap-5 whitespace-nowrap animate-marquee-left">
              {row3Images.map((img, idx) => (
                <div key={idx} className="w-40 sm:w-64 h-24 sm:h-40 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
                  <img src={img} alt="SVARP" className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 4: Right-moving */}
          <div className="flex overflow-hidden w-full select-none flex-shrink-0">
            <div className="flex gap-3 sm:gap-5 whitespace-nowrap animate-marquee-right">
              {row4Images.map((img, idx) => (
                <div key={idx} className="w-40 sm:w-64 h-24 sm:h-40 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
                  <img src={img} alt="SVARP" className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 5: Left-moving */}
          <div className="flex overflow-hidden w-full select-none flex-shrink-0">
            <div className="flex gap-3 sm:gap-5 whitespace-nowrap animate-marquee-left">
              {row5Images.map((img, idx) => (
                <div key={idx} className="w-40 sm:w-64 h-24 sm:h-40 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
                  <img src={img} alt="SVARP" className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Dark Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/15 to-black/50 z-0" />

      <div className="relative z-10 w-full pt-20 sm:pt-0">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div
            className="
              max-w-3xl 
              mx-auto md:mx-0
              rounded-3xl 
              bg-black/45 backdrop-blur-sm sm:backdrop-blur-md border border-white/10
              p-6 sm:p-8 md:p-12 
              shadow-2xl
              text-center md:text-left
            "
          >
            <h1 className="text-[1.75rem] leading-snug sm:text-4xl md:text-6xl font-semibold text-white">
              Building safer, smarter
              <br />
              <span className="bg-gradient-to-r from-accent to-emerald-300 bg-clip-text text-transparent">
                sustainable futures
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0 leading-relaxed">
              {t("hero.description")}
            </p>

            <p className="mt-4 sm:mt-6 text-accent font-script text-lg sm:text-3xl">
              Safety • Sustainability • Social Impact
            </p>

            {/* CTA */}
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <NavLink
                to="/membership"
                className="w-full sm:w-auto bg-accent text-primary px-7 py-3 rounded-full font-medium hover:scale-105 transition text-center text-sm sm:text-base"
              >
                {t("hero.ctaMembership")}
              </NavLink>

              <NavLink
                to="/donate"
                className="w-full sm:w-auto border border-white/40 text-white px-7 py-3 rounded-full hover:bg-white/10 transition text-center text-sm sm:text-base"
              >
                {t("hero.ctaDonate")}
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        ↓
      </div>
    </section>
  );
}
