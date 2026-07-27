import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="h-dvh flex items-center justify-center bg-muted px-4">
      <div className="text-center max-w-lg">
        {/* Glass Card */}
        <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-accent to-emerald-400 bg-clip-text text-transparent">
            {t("notFound.code")}
          </h1>

          <h2 className="text-2xl font-semibold mb-3">
            {t("notFound.title")}
          </h2>

          <p className="text-gray-600 mb-8">
            {t("notFound.description")}
          </p>

          <NavLink
            to="/"
            className="inline-block bg-accent text-primary px-6 py-3 rounded-full font-medium hover:scale-105 transition"
          >
            {t("notFound.backHome")}
          </NavLink>
        </div>
      </div>
    </section>
  );
}
