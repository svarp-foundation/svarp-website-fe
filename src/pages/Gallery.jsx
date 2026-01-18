import { useState, useEffect } from "react";
import ImageModal from "../components/ImageModal";

export default function EventGallery() {
  const events = [
    {
      id: "corporate-training",
      title: "Corporate Safety Training",
      images: [
        "https://images.unsplash.com/photo-1552664730-d307ca884978",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      ],
    },
    {
      id: "certification-program",
      title: "Certification Program",
      images: [
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
      ],
    },
    {
      id: "social-awareness",
      title: "Social Awareness Event",
      images: [
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        "https://images.unsplash.com/photo-1497493292307-31c376b6e479",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0",
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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Event Gallery
          </h1>
          <p className="text-gray-600 text-lg">
            Explore moments from SVARP Foundation’s corporate, certification,
            and social events.
          </p>
        </div>


        <div className="mb-8 md:hidden">
          <select
            value={activeEvent.id}
            onChange={(e) =>
              setActiveEvent(events.find(ev => ev.id === e.target.value))
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


        <div className="hidden md:flex flex-wrap gap-4 mb-12">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => setActiveEvent(event)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                activeEvent.id === event.id
                  ? "bg-accent text-primary"
                  : "bg-muted hover:bg-gray-200"
              }`}
            >
              {event.title}
            </button>
          ))}
        </div>


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
          {activeEvent.images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <img
                src={`${img}?auto=format&fit=crop&w=800&q=80`}
                alt={activeEvent.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white text-sm">
                  View
                </span>
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
