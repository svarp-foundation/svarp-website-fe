import { useState, useEffect } from "react";
import {
    drShilpiBansal,
    preetiChaudhary,
    priyankaVerma,
    rajvirSingh,
    santoshSingh,
    seemaChaudhary,
    poonamSingh,
    vikashKumar,
    swastikSharma
} from "../assets/assets";

export default function Team({ isStandalone = false }) {
  const team = [
    {
      img: rajvirSingh,
      name: "Late Mr. Rajvir Singh",
      role: "Former Director",
      bio: "A distinguished leader with over 40 years of experience in Central Government governance, administration, and public policy. His vision laid the foundation for SVARP Global's values of integrity and service.",
    },
    {
      img: santoshSingh,
      name: "Mrs. Santosh Singh",
      role: "Director",
      bio: "A committed social activist focused on women empowerment, community welfare, and social development initiatives across diverse groups.",
    },
    {
      img: preetiChaudhary,
      name: "Dr. Preeti Chaudhary",
      role: "Director",
      bio: "PhD in Sociology with deep expertise in community development, social research, and educational empowerment programs.",
    },
    {
      img: vikashKumar,
      name: "Mr. Vikash Kumar",
      role: "CEO & Founder",
      bio: "An HSE leader and global trainer specializing in risk management, safety leadership, sustainability, and professional certification programs.",
    },
    {
      img: seemaChaudhary,
      name: "Ms. Seema Chaudhary",
      role: "Project Director",
      bio: "A fitness and wellness specialist with a strong sports background, leading wellness, health, and holistic development initiatives.",
    },
    {
      img: poonamSingh,
      name: "Mrs. Poonam Singh",
      role: "Project Director",
      bio: "A philosophy graduate dedicated to promoting life skills, home management education, and personal development programs.",
    },
    {
      img: priyankaVerma,
      name: "Mrs. Priyanka Verma",
      role: "Project Director",
      bio: "An education specialist with over 15 years of experience in academic leadership, curriculum development, and training delivery.",
    },
    {
      img: drShilpiBansal,
      name: "Dr. Shilpi Bansal",
      role: "Project Director",
      bio: "Dr. Shilpi Bansal, Ph.D. (Environmental Science), brings over 22 years of environmental management and compliance expertise to SVARP Global.",
    },
    {
      img: swastikSharma,
      name: "Mr. Swastik Sharma",
      role: "Head of Software & IT",
      bio: "An IT infrastructure and software engineering lead driving digital platforms, LMS tools, and portal development for SVARP.",
    },
  ];

  const defaultImg =
    "https://ui-avatars.com/api/?background=9bcf9b&color=1f3b45&size=256";

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

  const maxIndex = team.length - visibleCount;

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

  const totalDots = maxIndex + 1;

  return (
    <section className={`pb-16 sm:pb-24 bg-white relative overflow-hidden ${isStandalone ? "pt-24 sm:pt-32" : "pt-16 sm:pt-32"}`}>
      {/* Decorative premium background blobs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-primary leading-tight">
              Our Team
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              SVARP Global is guided by experienced professionals, educators,
              and social leaders committed to safety, sustainability, and
              community empowerment.
            </p>
          </div>

          {/* Navigation Controls (Visible on Desktop / Tablet next to header) */}
          <div className="hidden sm:flex gap-3 mt-6 md:mt-0">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-primary shadow-sm hover:shadow-md hover:bg-muted hover:border-primary/20 transition-all duration-300 active:scale-95"
              aria-label="Previous Team Member"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-primary shadow-sm hover:shadow-md hover:bg-muted hover:border-primary/20 transition-all duration-300 active:scale-95"
              aria-label="Next Team Member"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative px-1 select-none cursor-grab active:cursor-grabbing"
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
              {team.map((member, i) => (
                <div
                  key={i}
                  className="flex-shrink-0"
                  style={{
                    width: `${100 / visibleCount}%`,
                    padding: "0 12px",
                  }}
                >
                  {/* Card design with rich aesthetics */}
                  <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/10 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group min-h-[380px]">
                    {/* Top Accent bar on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div>
                      {/* Avatar Circle with Shadow */}
                      <img
                        src={member.img || defaultImg}
                        alt={member.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover mb-4 sm:mb-6 border border-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Name & Role */}
                      <h3 className="text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-accent font-semibold tracking-wider uppercase mb-4">
                        {member.role}
                      </p>

                      {/* Bio */}
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-5">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Bottom Control Bar (Dots & Mobile Arrows) */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
          
          {/* Active Index Details */}
          <div className="text-xs text-gray-400 font-medium">
            Showing {currentIndex + 1} - {Math.min(currentIndex + visibleCount, team.length)} of {team.length}
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {[...Array(totalDots)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 transition-all duration-300 rounded-full ${
                  currentIndex === i ? "w-6 bg-primary" : "w-2 bg-gray-200 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile Only Arrows */}
          <div className="flex sm:hidden gap-4 mt-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-primary shadow-sm hover:bg-muted active:scale-95 transition-all"
              aria-label="Previous Team Member"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-primary shadow-sm hover:bg-muted active:scale-95 transition-all"
              aria-label="Next Team Member"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Values Strip */}
        <div className="mt-12 sm:mt-20 bg-muted rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center">
          <p className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto">
            Our team brings together expertise in education, safety leadership,
            sustainability, wellness, and social development to create
            meaningful, measurable impact across industries and communities.
          </p>

          <p className="mt-4 sm:mt-6 text-accent font-script text-2xl sm:text-3xl">
            leadership with purpose
          </p>
        </div>
      </div>
    </section>
  );
}
