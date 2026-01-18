export default function ImageModal({ src, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-6 right-6 text-white text-3xl hover:text-accent"
        aria-label="Close"
        onClick={onClose}
      >
        ✕
      </button>

      {/* Image */}
      <img
        src={`${src}?auto=format&fit=contain&w=1400&q=90`}
        alt="Event"
        className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
