import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../lib/api";
import { PlayCircle, FileText, CheckCircle, Lock, ChevronLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const APP_URL = import.meta.env.VITE_APP_URL || "https://globalacademy.svarp.org";

const CourseOverview = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEnrollOrGo = () => {
    // Redirect to the learning portal for enrollment/payment/lessons
    window.location.href = `${APP_URL}/courses/${courseId}`;
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const response = await api.get(`/public/courses/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100dvh-80px)] sm:min-h-[calc(100dvh-96px)] bg-muted items-center justify-center pt-20 sm:pt-24">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-[calc(100dvh-80px)] sm:min-h-[calc(100dvh-96px)] bg-muted items-center justify-center pt-20 sm:pt-24 px-6">
        <div className="text-center bg-white p-10 rounded-xl shadow-xl border border-gray-100 max-w-sm w-full">
          <h2 className="text-2xl font-bold text-primary mb-4">Course not found</h2>
          <Link
            to="/global-academy"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-accent hover:text-primary transition-all duration-300 text-sm"
          >
            <ChevronLeft size={16} /> Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100dvh-80px)] sm:min-h-[calc(100dvh-96px)] bg-muted relative overflow-hidden pt-20 sm:pt-24 pb-16 sm:pb-24 text-gray-900 selection:bg-accent/30">
      {/* Decorative Brand Ambient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Back Link */}
        <Link
          to="/global-academy"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-bold mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Courses
        </Link>

        {/* Course Header Hero Card */}
        <div className="bg-primary text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(155,207,155,0.1)_0%,transparent_60%)] pointer-events-none"></div>
          <div className="max-w-4xl relative z-10">
            <h1 className="text-2xl sm:text-4xl font-extrabold mb-6 leading-tight tracking-tight">{course.title}</h1>
            <p className="text-gray-300 text-sm sm:text-base mb-8 whitespace-pre-wrap leading-relaxed">
              {course.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-wider text-accent">
              <span>Created by {course.instructor_name || "SVARP Safety Expert"}</span>
              <span className="text-gray-550">•</span>
              <span>
                Last updated {new Date(course.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Course Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold text-primary mb-6 tracking-tight">
              Course Syllabus
            </h2>

            {!user ? (
              <div className="bg-white p-8 sm:p-10 rounded-xl border border-gray-150 text-center shadow-md">
                <Lock className="mx-auto h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">
                  Login to View Syllabus
                </h3>
                <p className="text-gray-650 text-sm mb-6 max-w-sm mx-auto">
                  Please log in or register to preview the course modules, lessons, and certification requirements.
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href={`${APP_URL}/login`}
                    className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-accent hover:text-primary transition-all duration-300 text-xs shadow-sm"
                  >
                    Login
                  </a>
                  <a
                    href={`${APP_URL}/register`}
                    className="bg-white text-primary border border-gray-250 px-6 py-2.5 rounded-lg font-bold hover:border-accent hover:text-accent transition-all duration-300 text-xs shadow-sm"
                  >
                    Register
                  </a>
                </div>
              </div>
            ) : course.modules && course.modules.length > 0 ? (
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <div
                    key={module.id}
                    className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="bg-gray-50/80 p-4 font-bold text-primary border-b border-gray-100 flex justify-between items-center text-sm sm:text-base">
                      <span>{module.title}</span>
                      <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                        {module.lessons ? module.lessons.length : 0} lectures
                      </span>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {module.lessons &&
                        module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.lesson_type === "video" ? (
                                <PlayCircle size={16} className="text-accent" />
                              ) : (
                                <FileText size={16} className="text-accent" />
                              )}
                              <span className="text-gray-700 text-sm">
                                {lesson.title}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-550 italic p-6 bg-white/40 rounded-xl border border-dashed border-gray-300 text-center">
                No syllabus content available yet.
              </div>
            )}
          </div>

          {/* Right Column: Enrollment/Action Card */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 sticky top-24">
              <div className="aspect-video bg-gray-100 rounded-lg mb-6 overflow-hidden border border-gray-55 shadow-inner">
                {course.thumbnail_url ? (
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-405">
                    <PlayCircle size={40} />
                  </div>
                )}
              </div>
              {/* Price Display */}
              {course.is_paid && (
                <div className="mb-4 text-center flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-primary">
                    ₹{course.price}
                  </span>
                </div>
              )}
              <div className="space-y-4">
                <button
                  onClick={handleEnrollOrGo}
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:scale-[1.02] hover:bg-accent hover:text-primary transition-all duration-300 shadow-md text-sm"
                >
                  {course.is_paid ? `Enroll — ₹${course.price}` : "Enroll for Free"}
                </button>
                {!course.is_paid && (
                  <p className="text-[10px] uppercase font-bold text-center text-gray-550 tracking-wider">
                    Free — Full lifetime access
                  </p>
                )}
                <div className="text-xs sm:text-sm text-gray-650 space-y-2.5 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Full lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Access on mobile and desktop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Globally verifiable certification</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CourseOverview;
