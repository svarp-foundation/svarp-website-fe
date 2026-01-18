export default function Contact() {
  return (
    <section className="py-24 bg-muted">
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
              <p className="text-gray-700">
                info@svarp.org
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Phone</h3>
              <p className="text-gray-700">
                +91-9917759966
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
              <div className="flex gap-4 text-sm">
                <span className="hover:text-accent cursor-pointer">Facebook</span>
                <span className="hover:text-accent cursor-pointer">Instagram</span>
                <span className="hover:text-accent cursor-pointer">LinkedIn</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white rounded-3xl p-8 shadow-lg space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />

            <button
              type="submit"
              className="bg-accent text-primary px-8 py-3 rounded-full font-medium hover:scale-105 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
