import React, { useState, useEffect, useCallback } from "react";
import api from "../lib/api";
import CourseCard from "../components/CourseCard";
import { Search, ShieldAlert } from "lucide-react";

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/public/courses", {
        params: { search: debouncedSearch, limit: 100 },
      });
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-primary text-white py-16 px-6 mb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#2c5462,transparent)] opacity-60" />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Explore Our <span className="text-accent">Courses</span> Catalog
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Enhance your EHS knowledge, safety leadership compliance, and corporate certifications with our industry-accredited courses.
            </p>
          </div>

          {/* Search Bar Input Container */}
          <div className="w-full md:max-w-md relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-accent transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search courses by name or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md border border-white/15 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white/15 transition-all duration-300 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Main Catalog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : courses.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-16 flex flex-col items-center text-center max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
              <ShieldAlert size={36} className="text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              No Courses Found
            </h2>
            <p className="text-gray-500 mb-8 text-sm">
              We couldn't find any courses matching "{search}". Try searching for other EHS, safety, or compliance topics.
            </p>
            <button
              onClick={() => setSearch("")}
              className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-accent hover:text-primary transition duration-300 text-sm shadow-md"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} isPublic={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCatalog;
