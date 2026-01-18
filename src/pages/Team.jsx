import { 
    drShilpiBansal,
    preetiChaudhary,
    priyankaVerma,
    rajvirSingh,
    santoshSingh,
    seemaChaudhary,
    poonamSingh,
    vikashKumar
} from "../assets/assets";

export default function Team() {
  const team = [
    {
      img: rajvirSingh,
      name: "Late Mr. Rajvir Singh",
      role: "Former Director",
      bio: "A distinguished leader with over 40 years of experience in Central Government governance, administration, and public policy. His vision laid the foundation for SVARP Foundation’s values of integrity and service.",
    },
    {
      img: santoshSingh,
      name: "Mrs. Santosh Singh",
      role: "Director",
      bio: "A committed social activist focused on women empowerment, community welfare, and social development initiatives across diverse groups.",
    },
    {
      img: preetiChaudhary,
      name: "Dr. Preeti Chaudhary",
      role: "Director",
      bio: "PhD in Sociology with deep expertise in community development, social research, and educational empowerment programs.",
    },
    {
      img: vikashKumar,
      name: "Vikash Kumar",
      role: "CEO & Founder",
      bio: "An accomplished HSE leader and global trainer specializing in risk management, safety leadership, sustainability, and professional certification programs.",
    },
    {
      img: seemaChaudhary,
      name: "Ms. Seema Chaudhary",
      role: "Project Director",
      bio: "A fitness and wellness specialist with a strong sports background, leading wellness, health, and holistic development initiatives.",
    },
    {
      img: poonamSingh,
      name: "Mrs. Poonam Singh",
      role: "Project Director",
      bio: "A philosophy graduate dedicated to promoting life skills, home management education, and personal development programs.",
    },
    {
      img: priyankaVerma,
      name: "Mrs. Priyanka Verma",
      role: "Project Director",
      bio: "An education specialist with over 15 years of experience in academic leadership, curriculum development, and training delivery.",
    },
    {
      img: drShilpiBansal,
      name: "Dr. Shilpi Bansal",
      role: "Project Director",
      bio: "Dr. Shilpi Bansal, Ph.D. (Environmental Science), brings over 22 years of environmental management and compliance expertise to SVARP Foundation.",
    },
    {
      img: "https://kgdarcnvrkzjyasdpoab.supabase.co/storage/v1/object/public/Company%20Portal/profile%20images/sales001.jpeg",
      name: "Swastik",
      role: "Software Lead",
      bio: "",
    },
  ];

  const defaultImg =
    "https://ui-avatars.com/api/?background=9bcf9b&color=1f3b45&size=256";

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Our Team
          </h1>
          <p className="text-lg text-gray-600">
            SVARP Foundation is guided by experienced professionals, educators,
            and social leaders committed to safety, sustainability, and
            community empowerment.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member) => (
            <div
              key={member.name}
              className="group bg-muted rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
            >
              <img
                src={member.img || defaultImg}
                alt={member.name}
                className="w-24 h-24 rounded-xl object-cover mb-6 border border-gray-300"
              />

              <h3 className="text-xl font-semibold mb-1">
                {member.name}
              </h3>

              <p className="text-sm text-accent font-medium mb-4">
                {member.role}
              </p>

              <p className="text-sm text-gray-700 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Values Strip */}
        <div className="mt-20 bg-muted rounded-3xl p-10 text-center">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            Our team brings together expertise in education, safety leadership,
            sustainability, wellness, and social development to create
            meaningful, measurable impact across industries and communities.
          </p>

          <p className="mt-6 text-accent font-script text-3xl">
            leadership with purpose
          </p>
        </div>
      </div>
    </section>
  );
}
