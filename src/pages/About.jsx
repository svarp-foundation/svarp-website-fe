import { useTranslation, Trans } from "react-i18next";
import Team from "./Team";

export default function About({ showTeam = true }) {
  const { t } = useTranslation();

  return (
    <section className={`pb-12 sm:pb-16 bg-white ${showTeam ? "pt-24 sm:pt-32" : "pt-12 sm:pt-16"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 sm:mb-6">
            {t("about.title")}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {t("about.intro")}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
            <p>
              <Trans i18nKey="about.paragraph1">
                We work at the intersection of <strong>safety leadership</strong>,
                <strong> sustainability</strong>, and
                <strong> community development</strong>, delivering impactful
                training, research, and advisory services for individuals,
                organizations, and institutions.
              </Trans>
            </p>

            <p>
              {t("about.paragraph2")}
            </p>

            {/* Core Focus Areas inside a card */}
            <div className="bg-muted rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100 mt-6">
              <h3 className="text-lg font-semibold mb-3 text-accent">
                {t("about.coreFocusTitle")}
              </h3>

              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• {t("about.focus1")}</li>
                <li>• {t("about.focus2")}</li>
                <li>• {t("about.focus3")}</li>
                <li>• {t("about.focus4")}</li>
                <li>• {t("about.focus5")}</li>
              </ul>
            </div>
          </div>

          {/* Right Content: Stylized Image Component */}
          <div className="relative group">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/company/images/IMG-11.webp"
                alt="SVARP Global Impact"
                className="w-full h-[320px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-accent text-xs font-bold uppercase tracking-widest mb-1">
                  {t("about.imageTagline")}
                </span>
                <p className="text-sm font-medium text-gray-200">
                  {t("about.imageCaption")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Team Component */}
        {showTeam && (
          <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-gray-100">
            <Team isStandalone={false} />
          </div>
        )}
      </div>
    </section>
  );
}
