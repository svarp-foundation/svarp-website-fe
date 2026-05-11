export default function Events() {
  const corporateEvents = [
    {
      title: "Corporate Safety Leadership Workshop",
      desc: "Expert-led sessions for organizations focusing on workplace safety culture, compliance, and leadership alignment with global standards.",
    },
    {
      title: "EHS & ESG Awareness Programs",
      desc: "Corporate events designed to integrate sustainability, ESG principles, and responsible business practices.",
    },
    {
      title: "Risk Assessment & Process Safety Seminars",
      desc: "Focused seminars covering HAZOP, QRA, and risk engineering for industrial and manufacturing sectors.",
    },
  ];

  const socialEvents = [
    {
      title: "Community Safety Awareness Drives",
      desc: "Programs aimed at spreading safety awareness among communities, schools, and local institutions.",
    },
    {
      title: "Youth Empowerment & Skill Development Camps",
      desc: "Educational and motivational events supporting youth development, leadership, and employability skills.",
    },
    {
      title: "Wellness & Fitness Initiatives",
      desc: "Health, wellness, and fitness-focused events promoting holistic well-being across age groups.",
    },
  ];

  return (
    <section className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Events
          </h1>
          <p className="text-lg text-gray-600">
            SVARP Foundation organizes corporate and social events aimed at
            strengthening safety culture, promoting sustainability, and driving
            positive social change through education and engagement.
          </p>
        </div>

        {/* Corporate Events */}
        <div className="mb-24">
          <h2 className="text-3xl font-semibold mb-10">
            Corporate Events
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {corporateEvents.map((event) => (
              <div
                key={event.title}
                className="bg-muted rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {event.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Social Events */}
        <div className="mb-24">
          <h2 className="text-3xl font-semibold mb-10">
            Social Events
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {socialEvents.map((event) => (
              <div
                key={event.title}
                className="bg-muted rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {event.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-white rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-3xl font-semibold mb-6">
            Partner With Us for Events
          </h2>

          <p className="max-w-3xl mx-auto opacity-90 mb-8">
            Whether you are an organization, institution, or community group,
            SVARP Foundation collaborates to design impactful corporate and
            social events aligned with safety, sustainability, and social
            responsibility goals.
          </p>

          <button className="bg-accent text-primary px-10 py-3 rounded-full font-medium hover:scale-105 transition">
            Plan an Event with SVARP
          </button>
        </div>
      </div>
    </section>
  );
}
