import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ImageModal from "../components/ImageModal";

export default function EventGallery() {
  const { t } = useTranslation();
  const events = [
    {
      id: "dn-polytechnic",
      title: "DN Polytechnic",
      images: [
        "/events/event-1/picture-1.webp",
        "/events/event-1/picture-2.webp",
        "/events/event-1/picture-3.webp",
        "/events/event-1/picture-4.webp",
        "/events/event-1/picture-5.webp",
      ],
    },
    {
      id: "gandola-training",
      title: "Gandola Training",
      images: [
        "/events/event-2/picture-1.webp",
        "/events/event-2/picture-2.webp",
        "/events/event-2/picture-3.webp",
        "/events/event-2/picture-4.webp",
        "/events/event-2/picture-5.webp",
      ],
    },
    {
      id: "onground-training",
      title: "Onground Training",
      images: [
        "/events/event-4/picture-1.webp",
        "/events/event-4/picture-2.webp",
        "/events/event-4/picture-3.webp",
        "/events/event-4/picture-4.webp",
        "/events/event-4/picture-5.webp",
      ],
    },
    {
      id: "training",
      title: "Training",
      images: [
        "/events/event-5/picture-1.webp",
        "/events/event-5/picture-2.webp",
        "/events/event-5/picture-3.webp",
        "/events/event-5/picture-4.webp",
        "/events/event-5/picture-5.webp",
      ],
    },
    {
      id: "seminar",
      title: "Seminar",
      images: [
        "/events/event-6/picture-1.webp",
        "/events/event-6/picture-2.webp",
        "/events/event-6/picture-3.webp",
        "/events/event-6/picture-4.webp",
        "/events/event-6/picture-5.webp",
      ],
    },
    {
      id: "Six Sigma College",
      title: "Six Sigma College",
      images: [
        "/events/event-7/picture-1.webp",
        "/events/event-7/picture-2.webp",
        "/events/event-7/picture-3.webp",
        "/events/event-7/picture-4.webp",
        "/events/event-7/picture-5.webp",
      ],
    },
  ];

  const [activeEvent, setActiveEvent] = useState(events[0]);
  const [selectedImage, setSelectedImage] = useState(null);

  // ESC close
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setSelectedImage(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 sm:mb-4">
            {t("gallery.title")}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            {t("gallery.description")}
          </p>
        </div>

        {/* Mobile dropdown selector */}
        <div className="mb-6 sm:mb-8 md:hidden">
          <select
            value={activeEvent.id}
            onChange={(e) =>
              setActiveEvent(events.find((ev) => ev.id === e.target.value))
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop tabs */}
        <div className="hidden md:flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => setActiveEvent(event)}
              className={`px-5 sm:px-6 py-2 rounded-full text-sm font-medium transition ${
                activeEvent.id === event.id
                  ? "bg-accent text-primary"
                  : "bg-muted hover:bg-gray-200"
              }`}
            >
              {event.title}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 auto-rows-[140px] sm:auto-rows-[180px]">
          {activeEvent.images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer group ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={`${img}?auto=format&fit=crop&w=800&q=80`}
                alt={activeEvent.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white text-sm">{t("gallery.view")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <ImageModal
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
}
