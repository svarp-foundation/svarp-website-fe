import { NavLink } from "react-router-dom";
import { background } from "../assets/assets";

export default function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] flex items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70" />

      <div className="relative z-10 w-full pt-20 sm:pt-0">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div
            className="
              max-w-3xl 
              mx-auto md:mx-0
              rounded-2xl sm:rounded-3xl 
              bg-black/30 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none
              p-6 sm:p-8 md:p-14 
              md:shadow-2xl
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
              SVARP Global promotes safety, sustainability, and social
              responsibility through expert-led training, certification,
              advisory services, and community-driven initiatives.
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
                Explore Our Memberships
              </NavLink>

              <NavLink
                to="/donate"
                className="w-full sm:w-auto border border-white/40 text-white px-7 py-3 rounded-full hover:bg-white/10 transition text-center text-sm sm:text-base"
              >
                Donate
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (hide on small screens) */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        ↓
      </div>
    </section>
  );
}
