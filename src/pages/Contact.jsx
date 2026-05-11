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
    <section className="pt-32 pb-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Contact SVARP Foundation
          </h1>
          <p className="text-lg text-gray-600">
            Connect with us to learn more about our training programs,
            certifications, advisory services, and social impact initiatives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Address</h3>
              <p className="text-gray-700">
                A-200, Shatabdi Nagar, Sector 2, MDA <br />
                Meerut, Uttar Pradesh – 250103 <br />
                India
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-gray-700">info@svarp.org</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Phone</h3>
              <p className="text-gray-700">+91-9917759966</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
              <div className="flex gap-4 text-sm">
                <a
                  href="https://www.facebook.com/share/17zG3oSPaT/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/svarpfoundation?igsh=NDg0MzFmZmI2ZnI0&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 cursor-pointer"
                >
                  Instagram
                </a>
                <span className="hover:text-blue-600 cursor-pointer">
                  LinkedIn
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 shadow-lg space-y-5"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your Message"
              rows="5"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <button
              type="submit"
              disabled={loading}
              className={`bg-accent text-primary px-8 py-3 rounded-full font-medium transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"}`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
