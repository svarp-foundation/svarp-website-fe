import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Stories({ isStandalone = false }) {
  const stories = [
    {
      name: "Ravi Malhotra",
      role: "EHS Manager, Tata Steel – Jamshedpur",
      quote:
        "SVARP's training programs embedded sustainability thinking into our safety culture and significantly improved engagement across teams.",
      rating: 5,
    },
    {
      name: "Dr. Anjali Mehta",
      role: "Principal, Bright Future Academy – Pune",
      quote:
        "The youth empowerment initiatives delivered by SVARP Global created measurable positive change among students and educators.",
      rating: 5,
    },
    {
      name: "Pooja Sinha",
      role: "Graduate Trainee, Infosys – Bengaluru",
      quote:
        "SVARP's professional training prepared me with real-world safety and leadership skills required in corporate environments.",
      rating: 5,
    },
    {
      name: "Imran Qureshi",
      role: "Plant Head, KCP Cements – Hyderabad",
      quote:
        "Workplace safety metrics improved significantly after implementing SVARP's risk assessment and advisory solutions.",
      rating: 5,
    },
    {
      name: "Nikita Shah",
      role: "Founder, GreenHive Essentials – Surat",
      quote:
        "Entrepreneurial coaching and sustainability guidance helped launch and scale my eco-conscious brand.",
      rating: 5,
    },
    {
      name: "Rajeev Bansal",
      role: "HR Director, L&T Ltd. – Mumbai",
      quote:
        "SVARP's corporate training programs align well with global safety and sustainability standards.",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  // Dragging / Swiping State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  // Responsive logic to handle visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = stories.length - visibleCount;

  // Auto-play logic (pauses when hovering)
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered, maxIndex]);

  // Make sure current index stays valid when resizing
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [visibleCount, currentIndex, maxIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  // Swipe gesture handlers for mobile devices
  const startDrag = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragDistance(0);
  };

  const moveDrag = (clientX) => {
    if (!isDragging) return;
    setDragDistance(startX - clientX);
  };

  const endDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const minDragDistance = 50;

    if (dragDistance > minDragDistance) {
      handleNext();
    } else if (dragDistance < -minDragDistance) {
      handlePrev();
    }
    setDragDistance(0);
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Left click only
    startDrag(e.clientX);
  };

  const handleMouseMove = (e) => {
    moveDrag(e.clientX);
  };

  const handleMouseUp = () => {
    endDrag();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragDistance(0);
    }
  };

  const handleTouchStart = (e) => {
    startDrag(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    moveDrag(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    endDrag();
  };

  // Get initials for profile placeholder
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // Generate pagination dots
  const totalDots = maxIndex + 1;

  return (
    <section className={`pb-12 sm:pb-16 bg-white relative overflow-hidden ${isStandalone ? "pt-24 sm:pt-32" : "pt-12 sm:pt-16"}`}>
      {/* Decorative premium background blobs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#9bcf9b]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase bg-muted px-4 py-1.5 rounded-full inline-block mb-3 sm:mb-4">
              Testimonials
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 sm:mb-6 text-primary leading-tight">
              Impact Stories
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Hear from professionals, educators, and organizations who have
              experienced positive change through SVARP Global's training,
              advisory, and community initiatives.
            </p>
          </div>
        </div>

        {/* Carousel Container with Floating Side Arrows */}
        <div className="relative px-4 sm:px-12">
          {/* Floating Left Button */}
          <button
            onClick={handlePrev}
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-primary shadow-lg hover:shadow-xl hover:bg-muted hover:border-primary/20 transition-all duration-300 active:scale-95"
            aria-label="Previous Testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            className="relative select-none cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              handleMouseLeave();
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Outer Slider Window */}
            <div className="overflow-hidden">
              {/* Slider Track */}
              <div
                className={`flex ${isDragging ? "transition-none" : "transition-transform duration-500 ease-out"}`}
                style={{
                  transform: `translate3d(calc(-${currentIndex * (100 / visibleCount)}% - ${dragDistance}px), 0px, 0px)`,
                }}
              >
                {stories.map((s, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0"
                    style={{
                      width: `${100 / visibleCount}%`,
                      padding: "0 10px",
                    }}
                  >
                    {/* Card design with rich aesthetics */}
                    <div className="h-full bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/10 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                      {/* Top Accent bar on hover */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div>
                        {/* Quote Icon & Stars Row */}
                        <div className="flex justify-between items-start mb-6">
                          <span className="text-[#9bcf9b] opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                            <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                          </span>
                          
                          {/* Rating Stars */}
                          <div className="flex gap-1">
                            {[...Array(s.rating)].map((_, idx) => (
                              <svg key={idx} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
  
                        {/* Quote Text */}
                        <p className="text-gray-700 italic mb-6 text-sm sm:text-base leading-relaxed">
                          "{s.quote}"
                        </p>
                      </div>
  
                      {/* Author Info */}
                      <div className="border-t border-gray-100 pt-5 mt-auto flex items-center gap-4">
                        {/* Avatar Circle with Brand Gradients */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                          {getInitials(s.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-primary text-sm sm:text-base">
                            {s.name}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                            {s.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Right Button */}
          <button
            onClick={handleNext}
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-primary shadow-lg hover:shadow-xl hover:bg-muted hover:border-primary/20 transition-all duration-300 active:scale-95"
            aria-label="Next Testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Carousel Bottom Control Bar (Dots Only) */}
        <div className="mt-8 flex justify-center items-center">
          {/* Dots Indicator */}
          <div className="flex gap-2 items-center">
            {[...Array(totalDots)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="p-1 focus:outline-none"
                aria-label={`Go to slide ${i + 1}`}
              >
                <div
                  className={`h-2 transition-all duration-300 rounded-full ${
                    currentIndex === i ? "w-6 bg-primary" : "w-2 bg-gray-200 hover:bg-gray-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Call To Action */}
        <div className="mt-16 sm:mt-24 text-center">
          <p className="text-gray-700 mb-6 text-base sm:text-lg">
            Join organizations and professionals building safer, sustainable
            futures with SVARP Global.
          </p>

          <NavLink
            to="/contact"
            className="inline-block w-full sm:w-auto bg-primary text-white border border-transparent hover:bg-white hover:text-primary hover:border-primary px-8 py-3.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            Partner with SVARP
          </NavLink>
        </div>
      </div>
    </section>
  );
}
