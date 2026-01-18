export default function Membership() {
  const plans = [
    {
      title: "Lifetime Membership – ₹25,000 (One-Time Payment)",
      desc: "One membership. Lifelong learning, growth, and recognition with maximum long-term value.",
      benefits: [
        "Full access to all online & offline courses (including diplomas)",
        "Priority access to new courses & annual training calendar",
        "Free samples of all new products & services",
        "Invitations to premium networking events",
        "Access to workshops, seminars & expert presentations",
        "Exclusive discounts on certifications & premium programs",
        "Recognized as a Lifetime Core Member",
        "No renewals, no hassle – lifelong access",
        "Most recommended by experts & alumni",
      ],
      highlight: true,
    },
    {
      title: "Yearly Membership – ₹5,000 / Year",
      desc: "Ideal for short-term access and periodic learning with essential benefits.",
      benefits: [
        "Access to online courses (excluding diplomas)",
        "Free samples of select products & services",
        "Invitations to networking meetups & events",
        "Access to selected workshops & sessions",
        "1-year validity with annual renewal",
        "Limited benefits compared to Lifetime Membership",
      ],
    },
    {
      title: "Student Membership – ₹1,000 / Year",
      desc: "Designed for students and young innovators focused on learning, projects, and career growth.",
      benefits: [
        "All benefits of Yearly Membership",
        "Special student discounts on diplomas & offline courses",
        "Project recognition, awards & certifications",
        "Career guidance & startup mentoring",
        "Internship opportunities & real-world project exposure",
      ],
    },
    {
      title: "Corporate Membership – from ₹2,50,000 / Year",
      desc: "Tailored for MSMEs (turnover under ₹100 Cr) to drive innovation, safety, and business growth.",
      benefits: [
        "Full access to all training & certification programs",
        "R&D support and innovation assistance",
        "Business growth, branding & expansion strategy",
        "High-level networking & industry collaboration",
        "HSE (Health, Safety & Sustainability) implementation support",
      ],
    },
  ];

  const columns = [
    { key: "feature", label: "Features" },
    { key: "lifetime", label: "Lifetime 🏆" },
    { key: "yearly", label: "Yearly" },
    { key: "student", label: "Student" },
    { key: "corporate", label: "Corporate" },
  ];

  const rows = [
    {
      feature: "Full Online Course Access",
      lifetime: "✅",
      yearly: "✅",
      student: "✅",
      corporate: "✅",
    },
    {
      feature: "Access to Diploma Courses",
      lifetime: "✅",
      yearly: "❌",
      student: "❌",
      corporate: "✅",
    },
    {
      feature: "Validity",
      lifetime: "Lifetime",
      yearly: "1 Year",
      student: "1 Year",
      corporate: "1 Year",
    },
    {
      feature: "Offline Courses Access",
      lifetime: "✅",
      yearly: "❌",
      student: "Discounts",
      corporate: "✅",
    },
    {
      feature: "Networking Events",
      lifetime: "✅",
      yearly: "✅",
      student: "✅",
      corporate: "✅",
    },
    {
      feature: "Seminars & Workshops",
      lifetime: "✅",
      yearly: "✅",
      student: "✅",
      corporate: "✅",
    },
    {
      feature: "Discounts on Certifications",
      lifetime: "✅",
      yearly: "❌",
      student: "✅",
      corporate: "✅",
    },
    {
      feature: "Free Samples (All Products)",
      lifetime: "✅",
      yearly: "Partial",
      student: "Partial",
      corporate: "✅",
    },
    {
      feature: "R&D / Business Support",
      lifetime: "❌",
      yearly: "❌",
      student: "❌",
      corporate: "✅",
    },
    {
      feature: "Priority Access & Recognition",
      lifetime: "✅",
      yearly: "❌",
      student: "❌",
      corporate: "✅",
    },
    {
      feature: "Renewal Needed",
      lifetime: "❌",
      yearly: "✅",
      student: "✅",
      corporate: "✅",
    },
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Membership
          </h1>
          <p className="text-lg text-gray-600">
            SVARP Foundation membership connects individuals, organizations, and
            institutions to a credible network focused on safety,
            sustainability, professional excellence, and social impact.
          </p>
        </div>

        {/* Membership Plans */}
        <div className="grid md:grid-cols-2 gap-10">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`rounded-3xl p-8 shadow-lg transition ${
                plan.highlight ? "bg-primary text-white scale-105" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>

              <p
                className={`text-sm leading-relaxed mb-6 ${
                  plan.highlight ? "opacity-90" : "text-gray-600"
                }`}
              >
                {plan.desc}
              </p>

              <ul className="space-y-3 text-sm mb-8">
                {plan.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-accent">✔</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-full font-medium transition ${
                  plan.highlight
                    ? "bg-accent text-primary hover:scale-105"
                    : "bg-primary text-white hover:opacity-90"
                }`}
              >
                Apply for Membership
              </button>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white mt-24">
          <table className="min-w-full border-collapse text-sm">
            {/* HEADER */}
            <thead>
              <tr className="bg-primary text-white">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 font-semibold ${
                      col.key === "feature" ? "text-left" : "text-center"
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 ${
                        col.key === "feature"
                          ? "font-medium text-left"
                          : "text-center"
                      }`}
                    >
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Why Join */}
        <div className="mt-24 bg-white rounded-3xl p-12 shadow-lg text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Why Join SVARP Foundation?
          </h2>

          <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
            As a SVARP member, you become part of a credible, impact-driven
            network committed to building safer workplaces, sustainable
            practices, and empowered communities through collaboration,
            innovation, and professional excellence.
          </p>

          <p className="text-accent font-script text-3xl">
            together for a safer tomorrow
          </p>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-700 text-lg mb-6">
            Ready to become a member and create meaningful impact?
          </p>

          <button className="bg-accent text-primary px-10 py-3 rounded-full font-medium hover:scale-105 transition">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
