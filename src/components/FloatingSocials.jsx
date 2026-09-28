import { useTranslation } from "react-i18next";

export default function FloatingSocials() {
  const { i18n } = useTranslation();
  const isRtl = i18n?.language === "ar" || document.documentElement.dir === "rtl";

  const socialChannels = [
    {
      name: "WhatsApp",
      url: "https://wa.me/919917759966",
      bgClass: "bg-[#25D366]",
      hoverBgClass: "hover:bg-[#20ba59]",
      textShadow: "shadow-[#25D366]/40",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.54 1.861.855 2.796.855 3.18 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.742-5.767-5.742zm0-2.172c4.385 0 7.969 3.583 7.969 7.968 0 4.386-3.584 7.969-7.969 7.969-1.391 0-2.695-.357-3.832-.984L3 21l2.05-4.843C4.385 15.01 4 13.564 4 12c0-4.385 3.584-7.968 8.031-7.968zm3.626 11.233c-.152.428-.77.785-1.258.887-.333.069-.768.125-2.227-.479-1.866-.773-3.067-2.673-3.16-2.797-.093-.125-.758-1.009-.758-1.924 0-.916.48-1.367.65-1.554.172-.187.375-.234.5-.234.125 0 .25 0 .36.006.115.006.27-.044.422.321.157.375.535 1.306.582 1.401.047.094.078.204.016.329-.063.125-.094.203-.188.312-.094.11-.197.245-.282.33-.094.093-.192.195-.083.382.11.187.487.804 1.045 1.301.718.64 1.324.838 1.512.932.187.093.297.078.406-.047.11-.125.469-.547.594-.734.125-.188.25-.156.422-.094.172.063 1.094.516 1.281.609.188.094.313.141.36.219.046.078.046.453-.106.881z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61590402162054",
      bgClass: "bg-[#1877F2]",
      hoverBgClass: "hover:bg-[#166fe5]",
      textShadow: "shadow-[#1877F2]/40",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/svarpglobal/?hl=en",
      bgClass: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
      hoverBgClass: "hover:opacity-95",
      textShadow: "shadow-[#dc2743]/40",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/svarpglobal",
      bgClass: "bg-[#0A66C2]",
      hoverBgClass: "hover:bg-[#084e96]",
      textShadow: "shadow-[#0A66C2]/40",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/svarpglobal",
      bgClass: "bg-black",
      hoverBgClass: "hover:bg-zinc-900",
      textShadow: "shadow-black/40",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@svarpglobal",
      bgClass: "bg-[#FF0000]",
      hoverBgClass: "hover:bg-[#d90000]",
      textShadow: "shadow-[#FF0000]/40",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      aria-label="Social Media Links"
      className={`fixed ${
        isRtl ? "right-0" : "left-0"
      } top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1.5 transition-all duration-300 pointer-events-auto`}
    >
      {socialChannels.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit SVARP Global on ${social.name}`}
          className={`group relative flex items-center h-10 sm:h-11 text-white ${
            social.bgClass
          } ${social.hoverBgClass} shadow-md hover:shadow-xl ${
            social.textShadow
          } ${
            isRtl ? "rounded-l-xl rounded-r-none" : "rounded-r-xl rounded-l-none"
          } transition-all duration-300 ease-out overflow-hidden w-10 sm:w-11 hover:w-36 sm:hover:w-40 px-2.5 sm:px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white`}
        >
          {/* Ambient Shine Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

          {/* Icon Container */}
          <div className="flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            {social.icon}
          </div>

          {/* Slide-out Text Label */}
          <span
            className={`${
              isRtl ? "mr-2.5 sm:mr-3" : "ml-2.5 sm:ml-3"
            } text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75`}
          >
            {social.name}
          </span>
        </a>
      ))}
    </aside>
  );
}
