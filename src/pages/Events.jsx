import { useNavigate } from "react-router-dom";

export default function Events() {
  const navigate = useNavigate();

  const corporateEvents = [
    {
      title: "Corporate Safety Leadership Workshop",
      desc: "Expert-led sessions for organizations focusing on workplace safety culture, compliance, and leadership alignment with global standards.",
      image: "/events/event-2/picture-1.webp",
      date: "Upcoming: Oct 2026",
      location: "New Delhi (Hybrid)",
    },
    {
      title: "EHS & ESG Awareness Programs",
      desc: "Corporate events designed to integrate sustainability, ESG principles, and responsible business practices.",
      image: "/events/event-6/picture-1.webp",
      date: "Upcoming: Nov 2026",
      location: "Mumbai",
    },
    {
      title: "Risk Assessment & Process Safety Seminars",
      desc: "Focused seminars covering HAZOP, QRA, and risk engineering for industrial and manufacturing sectors.",
      image: "/events/event-5/picture-1.webp",
      date: "Upcoming: Dec 2026",
      location: "Bengaluru",
    },
  ];

  const socialEvents = [
    {
      title: "Community Safety Awareness Drives",
      desc: "Programs aimed at spreading safety awareness among communities, schools, and local institutions.",
      image: "/events/event-4/picture-1.webp",
      date: "Recent: May 2026",
      location: "Meerut",
    },
    {
      title: "Youth Empowerment & Skill Development Camps",
      desc: "Educational and motivational events supporting youth development, leadership, and employability skills.",
      image: "/events/event-1/picture-1.webp",
      date: "Recent: Apr 2026",
      location: "DN Polytechnic",
    },
    {
      title: "Wellness & Fitness Initiatives",
      desc: "Health, wellness, and fitness-focused events promoting holistic well-being across age groups.",
      image: "/company/images/IMG-6.webp",
      date: "Recent: Jun 2026",
      location: "Meerut HQ",
    },
  ];

  const renderEventGrid = (events) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <div
          key={event.title}
          className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 border border-gray-100 transition-all duration-300 flex flex-col"
        >
          {/* Image Header */}
          <div className="relative h-52 overflow-hidden bg-gray-100">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center gap-2 flex-wrap">
              <span className="bg-accent text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                {event.date}
              </span>
              <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.location}
              </span>
            </div>
          </div>

          {/* Card Details */}
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {event.desc}
              </p>
            </div>

            {/* Action button inside card */}
            <div className="pt-6 mt-6 border-t border-gray-50 flex items-center justify-between">
              <button
                onClick={() => navigate("/contact")}
                className="text-xs font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-1"
              >
                Register Interest <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-muted relative overflow-hidden">
      {/* Visual Depth Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase bg-white px-4 py-1.5 rounded-full inline-block mb-3 sm:mb-4 shadow-sm">
            Events Calendar
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 sm:mb-6 text-primary leading-tight">
            Our Events & Programs
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            SVARP Global organizes corporate workshops and social drives aimed at
            strengthening safety culture, promoting sustainability, and driving
            positive community change through education and engagement.
          </p>
        </div>

        {/* Corporate Events Section */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <span className="w-8 h-1 bg-accent rounded-full"></span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
              Corporate Events & Workshops
            </h2>
          </div>
          {renderEventGrid(corporateEvents)}
        </div>

        {/* Social Events Section */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <span className="w-8 h-1 bg-accent rounded-full"></span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
              Social Drives & Community Camps
            </h2>
          </div>
          {renderEventGrid(socialEvents)}
        </div>

        {/* Call to Action (CTA) Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-primary text-white shadow-xl p-8 sm:p-12 md:p-16">
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Partner With Us for Events
            </h2>
            <p className="opacity-95 text-sm sm:text-base leading-relaxed">
              Whether you are a corporation seeking workplace safety audits, an educational
              institution building safety awareness, or a community organization looking to collaborate,
              SVARP Global provides custom-designed, expert-led events.
            </p>
            <div className="pt-4">
              <button
                onClick={() => navigate("/contact")}
                className="w-full sm:w-auto bg-accent text-primary px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-accent/20"
              >
                Plan an Event with SVARP
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
