export default function Stories() {
  const stories = [
    {
      name: "Ravi Malhotra",
      role: "EHS Manager, Tata Steel – Jamshedpur",
      quote:
        "SVARP’s training programs embedded sustainability thinking into our safety culture and significantly improved engagement across teams.",
    },
    {
      name: "Dr. Anjali Mehta",
      role: "Principal, Bright Future Academy – Pune",
      quote:
        "The youth empowerment initiatives delivered by SVARP Foundation created measurable positive change among students and educators.",
    },
    {
      name: "Pooja Sinha",
      role: "Graduate Trainee, Infosys – Bengaluru",
      quote:
        "SVARP’s professional training prepared me with real-world safety and leadership skills required in corporate environments.",
    },
    {
      name: "Imran Qureshi",
      role: "Plant Head, KCP Cements – Hyderabad",
      quote:
        "Workplace safety metrics improved significantly after implementing SVARP’s risk assessment and advisory solutions.",
    },
    {
      name: "Nikita Shah",
      role: "Founder, GreenHive Essentials – Surat",
      quote:
        "Entrepreneurial coaching and sustainability guidance helped launch and scale my eco-conscious brand.",
    },
    {
      name: "Rajeev Bansal",
      role: "HR Director, L&T Ltd. – Mumbai",
      quote:
        "SVARP’s corporate training programs align well with global safety and sustainability standards.",
    },
  ];

  return (
    <section className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Impact Stories & Testimonials
          </h1>
          <p className="text-lg text-gray-600">
            Hear from professionals, educators, and organizations who have
            experienced positive change through SVARP Foundation’s training,
            advisory, and community initiatives.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((s, i) => (
            <div
              key={i}
              className="bg-muted rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
            >
              <p className="text-gray-700 italic mb-6">
                “{s.quote}”
              </p>

              <div className="border-t pt-4">
                <p className="font-semibold">
                  {s.name}
                </p>
                <p className="text-sm text-gray-600">
                  {s.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-700 mb-6 text-lg">
            Join organizations and professionals building safer, sustainable
            futures with SVARP Foundation.
          </p>

          <button className="bg-accent text-primary px-8 py-3 rounded-full font-medium hover:scale-105 transition">
            Partner with SVARP
          </button>
        </div>
      </div>
    </section>
  );
}
