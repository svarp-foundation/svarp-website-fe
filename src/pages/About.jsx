import Team from "./Team";

export default function About() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            About SVARP Foundation
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            SVARP Foundation is a forward-thinking organization dedicated to
            building safer, smarter, and sustainable futures through safety,
            sustainability, and social impact.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-6 text-gray-700 leading-relaxed">
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

            <p>
              With a strong network of industry experts, educators, and social
              leaders, SVARP Foundation acts as a credible platform for driving
              measurable, long-term impact across industries and society.
            </p>
          </div>

          {/* Right Highlight Card */}
          <div className="bg-muted rounded-3xl p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Our Core Focus Areas
            </h3>

            <ul className="space-y-3 text-gray-700">
              <li>• Workplace Safety & Risk Engineering</li>
              <li>• Sustainability & ESG Integration</li>
              <li>• Training & Professional Certification</li>
              <li>• Community & Youth Empowerment</li>
              <li>• Wellness, Leadership & Skill Development</li>
            </ul>

            <p className="mt-6 text-accent font-script text-2xl">
              Safety with purpose
            </p>
          </div>
        </div>
      </div>
      <Team />
    </section>
  );
}
