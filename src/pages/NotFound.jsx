import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="h-screen flex items-center justify-center bg-muted">
      <div className="text-center max-w-lg px-6">
        {/* Glass Card */}
        <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-3xl p-12 shadow-2xl">
          <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-accent to-emerald-400 bg-clip-text text-transparent">
            404
          </h1>

          <h2 className="text-2xl font-semibold mb-3">
            Page not found
          </h2>

          <p className="text-gray-600 mb-8">
            The page you’re looking for doesn’t exist or has been moved.
            Let’s get you back to safety.
          </p>

          <NavLink
            to="/"
            className="inline-block bg-accent text-primary px-6 py-3 rounded-full font-medium hover:scale-105 transition"
          >
            Back to Home
          </NavLink>
        </div>
      </div>
    </section>
  );
}
