import { NavLink } from "react-router-dom";
import { background } from "../assets/assets";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70" />

      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div
            className="
              max-w-3xl 
              mx-auto md:mx-0
              backdrop-blur-md bg-white/5 border border-white/10 
              rounded-3xl 
              p-6 sm:p-8 md:p-14 
              shadow-2xl
              text-center md:text-left
            "
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight text-white">
              Building safer, smarter
              <br />
              <span className="bg-gradient-to-r from-accent to-emerald-300 bg-clip-text text-transparent">
                sustainable futures
              </span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0">
              SVARP Foundation promotes safety, sustainability, and social
              responsibility through expert-led training, certification,
              advisory services, and community-driven initiatives.
            </p>

            <p className="mt-5 sm:mt-6 text-accent font-script text-2xl sm:text-3xl">
              safety • sustainability • social impact
            </p>

            {/* CTA */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="w-full sm:w-auto bg-accent text-primary px-7 py-3 rounded-full font-medium hover:scale-105 transition">
                Explore Our Memberships
              </button>

              <button className="w-full sm:w-auto border border-white/40 text-white px-7 py-3 rounded-full hover:bg-white/10 transition">
                <NavLink to={"/memberships"}>Get Certified</NavLink>
              </button>
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
