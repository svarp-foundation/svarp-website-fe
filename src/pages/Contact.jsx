import { useState } from "react";
import { usePopup } from "../context/PopupContext";

export default function Contact() {
  const { showPopup } = usePopup();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/contact/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Failed to send message.");
      }

      showPopup("Your message has been sent successfully!", "success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      showPopup(
        error.message || "An error occurred while sending your message.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-20 sm:pt-32 pb-12 sm:pb-24 bg-muted relative overflow-hidden">
      {/* Decorative ambient background blur blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        {/* Header Section */}
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase bg-white px-4 py-1.5 rounded-full inline-block mb-3 sm:mb-4 shadow-sm">
            Get in Touch
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 text-primary tracking-tight">
            Connect with SVARP Global
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
            Have questions about our safety leadership courses, EHS audits, or youth empowerment drives? Let us know how we can assist you.
          </p>
        </div>

        {/* Main Grid: Details (Left) & Form (Right) */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Info Cards Grid */}
          <div className="flex flex-col justify-between gap-4 sm:gap-6">
            {/* Address Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100 flex gap-3 sm:gap-4 items-start hover:shadow-md transition duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-primary shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-primary text-sm sm:text-base">Office Address</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  A-200, Shatabdi Nagar, Sector 2, MDA <br />
                  Meerut, Uttar Pradesh – 250103 <br />
                  India
                </p>
              </div>
            </div>

            {/* Email & Phone Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100 flex gap-3 sm:gap-4 items-start hover:shadow-md transition duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-primary shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-primary text-sm sm:text-base">Direct Channels</h3>
                <div className="flex flex-col gap-2 text-xs sm:text-sm text-gray-600">
                  <div>
                    <span className="block font-semibold text-primary text-[10px] uppercase tracking-wider">Phone</span>
                    <a href="tel:+919917759966" className="text-gray-600 hover:text-accent transition text-sm">+91-9917759966</a>
                  </div>
                  <div>
                    <span className="block font-semibold text-primary text-[10px] uppercase tracking-wider">Email</span>
                    <a href="mailto:info@svarp.org" className="text-gray-600 hover:text-accent transition text-sm break-all">info@svarp.org</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials & Hours Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100 flex gap-3 sm:gap-4 items-start hover:shadow-md transition duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-primary shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-extrabold text-primary text-sm sm:text-base">Hours & Networking</h3>
                <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">
                  Monday – Friday: 9:00 AM – 6:00 PM <br />
                  Saturday: 10:00 AM – 4:00 PM
                </p>
                <div className="flex flex-wrap gap-2 pt-1.5">
                  <a
                    href="https://www.facebook.com/profile.php?id=61590402162054"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-muted hover:bg-blue-50 text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition duration-200 border border-gray-100 hover:border-blue-100"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/svarpglobal/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-muted hover:bg-purple-50 text-gray-600 hover:text-purple-600 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition duration-200 border border-gray-100 hover:border-purple-100"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://x.com/svarpglobal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-muted hover:bg-sky-50 text-gray-600 hover:text-sky-600 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition duration-200 border border-gray-100 hover:border-sky-100"
                  >
                    X (Twitter)
                  </a>
                  <a
                    href="https://www.linkedin.com/company/svarpglobal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-muted hover:bg-blue-50 text-gray-600 hover:text-blue-700 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition duration-200 border border-gray-100 hover:border-blue-200"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-4 sm:mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Full Name"
                  className="w-full border border-gray-200 bg-slate-50/50 p-3 sm:p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-xs sm:text-sm transition"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email Address"
                  className="w-full border border-gray-200 bg-slate-50/50 p-3 sm:p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-xs sm:text-sm transition"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  rows="4"
                  className="w-full border border-gray-200 bg-slate-50/50 p-3 sm:p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-xs sm:text-sm transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-primary text-white hover:bg-accent hover:text-primary border border-transparent px-6 py-3 sm:px-8 sm:py-3.5 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Full Width Google Map Section */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 h-64 sm:h-96 relative">
          <iframe
            title="SVARP Global Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3492.0583154017686!2d77.66124287551159!3d28.92631887550566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c63203aab1a9d%3A0xc66856ce84d968ed!2sSvarp%20Foundation!5e0!3m2!1sen!2sin!4v1780942581902!5m2!1sen!2sin"
            className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </section>
  );
}
