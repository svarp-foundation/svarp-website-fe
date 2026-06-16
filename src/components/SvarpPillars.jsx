import { useState } from "react";

export default function SvarpPillars() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const pillars = [
    {
      letter: "S",
      title: "Safety",
      description: "Protecting lives, preventing workplace hazards, and securing sustainable operations worldwide.",
      color: "from-blue-500 to-cyan-500",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50/50",
    },
    {
      letter: "V",
      title: "Value",
      description: "Enhancing organizational excellence, compliance standards, and corporate integrity.",
      color: "from-emerald-500 to-teal-500",
      textColor: "text-emerald-600",
      bgLight: "bg-emerald-50/50",
    },
    {
      letter: "A",
      title: "Awareness",
      description: "Spreading safety education, professional certification training, and driving proactive social actions.",
      color: "from-amber-500 to-orange-500",
      textColor: "text-amber-600",
      bgLight: "bg-amber-50/50",
    },
    {
      letter: "R",
      title: "Resilience",
      description: "Fostering organizational adaptability, emergency preparedness, and systemic operational endurance.",
      color: "from-purple-500 to-indigo-500",
      textColor: "text-purple-600",
      bgLight: "bg-purple-50/50",
    },
    {
      letter: "P",
      title: "Prosperity",
      description: "Cultivating long-term community wellness, environmental wealth, and sustainable social growth.",
      color: "from-rose-500 to-pink-500",
      textColor: "text-rose-600",
      bgLight: "bg-rose-50/50",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted relative overflow-hidden">
      {/* Background ambient light blur blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase bg-white px-4 py-1.5 rounded-full inline-block mb-3 sm:mb-4 shadow-sm">
            Our Core Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight mb-4">
            The Meaning of SVARP
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Our name defines our purpose. Explore each letter of our name to see the core principles guiding SVARP Global.
          </p>
        </div>

        {/* Interactive Split Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Column: Interactive Selector */}
          <div className="lg:col-span-5 flex flex-row lg:flex-col justify-center lg:justify-start items-center gap-2 sm:gap-4 lg:gap-3 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
            {pillars.map((pillar, index) => (
              <button
                key={pillar.letter}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setHoveredIndex(index)}
                className={`w-auto lg:w-full flex items-center justify-center lg:justify-start gap-4 p-2 sm:p-2.5 lg:p-3.5 rounded-2xl transition-all duration-300 ${
                  hoveredIndex === index
                    ? "bg-white shadow-sm border border-gray-100"
                    : "hover:bg-white/40 border border-transparent"
                }`}
                aria-label={`Show details for ${pillar.title}`}
              >
                {/* Visual Letter Circle */}
                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center font-black text-lg lg:text-xl shadow-sm transition-all duration-300 ${
                  hoveredIndex === index
                    ? `bg-gradient-to-br ${pillar.color} text-white scale-110`
                    : "bg-slate-100 text-gray-400 group-hover:text-primary"
                }`}>
                  {pillar.letter}
                </div>

                {/* Pillar Label (Visible on large screens, hides on mobile for simplicity) */}
                <div className="hidden lg:block text-left">
                  <span className={`block text-[10px] font-bold uppercase tracking-wider ${
                    hoveredIndex === index ? pillar.textColor : "text-gray-400"
                  }`}>
                    Pillar 0{index + 1}
                  </span>
                  <span className={`text-base font-extrabold transition-colors ${
                    hoveredIndex === index ? "text-primary" : "text-gray-500"
                  }`}>
                    {pillar.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Dynamic Info Card */}
          <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[220px] flex items-center">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.letter}
                className={`w-full bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl transition-all duration-500 ease-out flex flex-col justify-center ${
                  hoveredIndex === index
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto relative"
                    : "opacity-0 translate-y-4 scale-95 pointer-events-none absolute"
                }`}
              >
                {/* Small indicator */}
                <div className="flex justify-between items-center mb-6">
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md ${pillar.bgLight} ${pillar.textColor}`}>
                    Pillar 0{index + 1}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                    SVARP Identity
                  </span>
                </div>

                {/* Word display */}
                <h3 className="text-2xl sm:text-3xl font-black text-primary mb-3">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${pillar.color}`}>
                    {pillar.letter}
                  </span>
                  {" "} stands for {" "}
                  <span className="text-primary">{pillar.title}</span>
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
