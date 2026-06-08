import Team from "./Team";

export default function About({ showTeam = true }) {
  return (
    <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 sm:mb-6">
            About SVARP Global
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            SVARP Global is a forward-thinking organization dedicated to
            building safer, smarter, and sustainable futures through safety,
            sustainability, and social impact.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
            <p>
              We work at the intersection of <strong>safety leadership</strong>,
              <strong> sustainability</strong>, and
              <strong> community development</strong>, delivering impactful
              training, research, and advisory services for individuals,
              organizations, and institutions.
            </p>

            <p>
              Our programs are designed to promote workplace safety, ESG
              integration, risk management, and professional development while
              empowering communities through education, wellness, and skill
              development initiatives.
            </p>

            {/* Core Focus Areas inside a nice card */}
            <div className="bg-muted rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100 mt-6">
              <h3 className="text-lg font-semibold mb-3 text-accent">
                Our Core Focus Areas
              </h3>

              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Workplace Safety & Risk Engineering</li>
                <li>• Sustainability & ESG Integration</li>
                <li>• Training & Professional Certification</li>
                <li>• Community & Youth Empowerment</li>
                <li>• Wellness, Leadership & Skill Development</li>
              </ul>
            </div>
          </div>

          {/* Right Content: Stylized Image Component */}
          <div className="relative group">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/company/images/IMG-7.webp" 
                alt="SVARP Global Action" 
                className="w-full h-80 md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
              
              {/* Badge overlay on image */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">SVARP Global</p>
                <p className="text-lg sm:text-xl font-semibold leading-snug mb-1">
                  Driving measurable, long-term impact across industries and society.
                </p>
                <p className="font-script text-2xl text-primary/90 mt-1">
                  Safety with purpose
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showTeam && <Team />}
    </section>
  );
}
