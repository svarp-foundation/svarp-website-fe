import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useAuth } from "../../context/AuthContext";
import CourseCard from "../components/CourseCard";
import {
  CheckCircle,
  ShieldCheck,
  Award,
  Globe,
  BarChart3,
  Users,
  Zap,
  ChevronRight,
  Search,
  BookOpen,
  Clock,
  Layout,
  Smartphone,
  Languages,
} from "lucide-react";

const APP_URL = import.meta.env.VITE_APP_URL || "https://globalacademy.svarp.org";

const CourseHome = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/public/featured-courses");
        setCourses(response.data);
      } catch (error) {
        if (
          error.response?.status !== 401 &&
          error.message !== "No refresh token"
        ) {
          console.error("Error fetching public courses:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [loading, courses]);

  const features = [
    {
      title: "Verified Learner Identity",
      desc: "Complete government ID and photo validation ensures authenticity.",
      icon: <ShieldCheck className="w-8 h-8 text-accent" />,
    },
    {
      title: "Secure Certification",
      desc: "QR-based, tamper-proof certificates with unique IDs and photos.",
      icon: <Award className="w-8 h-8 text-accent" />,
    },
    {
      title: "Advanced Assessments",
      desc: "Structured tests with randomized questions and strict final exams.",
      icon: <Zap className="w-8 h-8 text-accent" />,
    },
    {
      title: "Global Verification",
      desc: "Anyone can instantly verify certificates through our public portal.",
      icon: <Globe className="w-8 h-8 text-accent" />,
    },
  ];

  return (
    <div className="min-h-[calc(100dvh-80px)] sm:min-h-[calc(100dvh-96px)] bg-muted relative overflow-hidden pt-20 sm:pt-24 pb-16 sm:pb-24 text-gray-900 selection:bg-accent/30">
      {/* Decorative Brand Ambient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. HERO SECTION */}
      <section className="relative px-6 mb-16 overflow-hidden min-h-[calc(100dvh-80px)] sm:min-h-[calc(100dvh-96px)] flex items-center">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 w-full">
          <div className="flex-1 text-center lg:text-left">
            <div className="reveal">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight tracking-tight">
                Empowering Excellence, <br />
                <span className="text-accent italic">Verified</span> Achievement.
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                SVARP Global Academy ensures authentic identity, structured
                learning, and tamper-proof certification for professionals and
                institutions worldwide.
              </p>
              <div className="flex flex-col gap-4 max-w-xs mx-auto lg:mx-0">
                <Link
                  to="/register"
                  className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:scale-[1.02] hover:bg-accent hover:text-primary transition-all duration-300 shadow-md text-sm text-center"
                >
                  Join the Academy
                </Link>
                <Link
                  to="/global-academy"
                  className="px-6 py-3 bg-white border border-gray-200 text-primary font-bold rounded-lg hover:scale-[1.02] hover:border-accent hover:text-accent transition-all duration-300 shadow-sm text-sm text-center"
                >
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-xl lg:max-w-none reveal reveal-delay-300">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border-4 border-white/50 hover:scale-[1.01] transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Digital Learning Platform"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>

              {/* Floating Stat Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md p-6 rounded-lg flex items-center justify-between text-white border border-white/10">
                <div>
                  <p className="text-[10px] opacity-90 uppercase tracking-widest mb-1 font-bold">
                    Total Certificates Issued
                  </p>
                  <p className="text-2xl font-bold tracking-tight">
                    128,450+
                  </p>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gray-400 overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 15}`}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-accent text-xs flex items-center justify-center font-bold text-primary shadow-sm">
                    +5k
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COURSES SECTION */}
      <section className="py-16 px-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 reveal">
            <div className="md:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4 tracking-tight">
                Featured Courses
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Explore our most popular and professionally vetted EHS and safety programs.
              </p>
            </div>
            <Link
              to="/global-academy/catalog"
              className="text-accent font-bold flex items-center gap-2 hover:gap-3 transition-all duration-300 border-b-2 border-accent pb-1 group"
            >
              View Catalog{" "}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center p-12">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} isPublic={true} />
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-white/50 backdrop-blur-sm rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-550 italic">
                Fresh courses arriving soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. WHY CHOOSE SVARP */}
      <section className="py-16 px-6 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4 tracking-tight">
              Why Choose SVARP Global Academy
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
              Our LMS ensures authentic learner identity, structured learning,
              and tamper-proof certification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 group reveal"
              >
                <div className="mb-6 p-4 rounded-lg bg-muted shadow-inner inline-block group-hover:bg-accent/20 transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SMART ASSESSMENT SYSTEM */}
      <section className="py-16 px-6 bg-primary text-white rounded-2xl shadow-2xl relative overflow-hidden mb-16 border border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 text-accent font-bold text-xs mb-6 border border-white/10 uppercase tracking-wider">
              <Zap className="w-5 h-5" />
              <span>ADVANCED EXAMINATION ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-8 leading-tight tracking-tight">
              Uncompromising Quality in <br />
              <span className="text-accent italic underline decoration-accent/30 underline-offset-8">
                Continuous Assessment
              </span>
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Continuous Learning",
                  desc: "Topic, Chapter, and Module level checks with instant feedback.",
                },
                {
                  title: "Strict Mode Final Exams",
                  desc: "Single attempt, time-limited, and screen-locked to prevent cheating.",
                },
                {
                  title: "Intelligent Question Bank",
                  desc: "50% Easy, 25% Moderate, 25% Difficult randomized selection.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-5 p-5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 reveal"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center font-extrabold shadow-lg shadow-accent/20">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 group-hover:text-accent">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 reveal reveal-delay-200">
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center group hover:bg-white/10 hover:border-accent/50 transition-all duration-500 cursor-default shadow-xl">
                <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center text-accent mx-auto mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-500 shadow-lg shadow-accent/10">
                  <Search className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-accent transition-colors">
                  Randomized Questions
                </h4>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center group hover:bg-white/10 hover:border-accent/50 transition-all duration-500 cursor-default shadow-xl">
                <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center text-accent mx-auto mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-500 shadow-lg shadow-accent/10">
                  <Clock className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-accent transition-colors">
                  Time Limit Control
                </h4>
              </div>
            </div>

            <div className="space-y-6 lg:translate-y-12">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center group hover:bg-white/10 hover:border-accent/50 transition-all duration-500 cursor-default shadow-xl">
                <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center text-accent mx-auto mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-500 shadow-lg shadow-accent/10">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-accent transition-colors">
                  Anti-Cheating Tech
                </h4>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center group hover:bg-white/10 hover:border-accent/50 transition-all duration-500 cursor-default shadow-xl">
                <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center text-accent mx-auto mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-500 shadow-lg shadow-accent/10">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-accent transition-colors">
                  Live Analytics
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COURSES & LEARNING MODEL */}
      <section className="py-16 px-6 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 reveal">
            <div className="md:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-4 tracking-tight">
                Flexible Learning Model
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Courses tailored for students, safety professionals, and global corporate learners.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Free Courses",
                sub: "+ Free Certificate",
                tag: "Open Access",
                color: "bg-blue-500",
                desc: "No-cost learning with basic verification.",
              },
              {
                title: "Free Courses",
                sub: "+ Paid Certificate",
                tag: "Professional",
                color: "bg-primary",
                desc: "Study for free, pay only for official certification.",
              },
              {
                title: "Paid Courses",
                sub: "+ Paid Certificate",
                tag: "Premium",
                color: "bg-accent",
                desc: "Full access to advanced modules and premium support.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group reveal"
              >
                <div
                  className={`absolute top-0 right-0 px-4 py-1 rounded-bl-lg text-white text-[10px] font-bold uppercase tracking-wider ${card.color}`}
                >
                  {card.tag}
                </div>
                <h3 className="text-2xl font-bold mb-1 text-primary group-hover:text-accent transition-colors">
                  {card.title}
                </h3>
                <p className="text-accent font-extrabold mb-6 italic">
                  {card.sub}
                </p>
                <p className="text-sm text-gray-600 mb-8 font-medium">{card.desc}</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Course Completion",
                    "Final Assessment Pass",
                    "Identity Verified",
                  ].map((item, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-accent transition-colors cursor-default"
                    >
                      <CheckCircle className="w-4 h-4 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/global-academy"
                  className="block text-center w-full py-3 px-4 bg-muted hover:bg-primary hover:text-white text-primary font-bold rounded-lg transition duration-300 border border-gray-150"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CERTIFICATE SHOWCASE */}
      <section className="py-16 px-6 bg-white rounded-2xl border border-gray-100 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 reveal">
              <div className="relative group perspective-1000">
                <div className="relative z-10 bg-white p-6 md:p-12 shadow-2xl rounded-xl border-2 border-gray-55 transform rotate-2 group-hover:rotate-0 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary">
                        Certificate of Achievement
                      </h3>
                      <p className="text-[10px] text-gray-400 tracking-widest mt-1">
                        SVARP GLOBAL ACADEMY
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-[8px] text-gray-400 font-bold border border-dashed border-gray-200">
                      QR CODE
                    </div>
                  </div>

                  <div className="text-center mb-10">
                     <p className="text-gray-550 font-medium mb-4 italic text-sm">
                      This is to certify that
                    </p>
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-primary mb-2">
                      John Doe
                    </h4>
                    <div className="w-24 h-24 mx-auto rounded-lg bg-gray-200 border-2 border-accent/20 mb-4 overflow-hidden shadow-inner">
                      <img
                        src="https://i.pravatar.cc/150"
                        alt="Verified Learner"
                      />
                    </div>
                    <p className="text-gray-500 mb-1 text-xs">
                      has successfully completed the course
                    </p>
                    <h5 className="text-lg font-bold text-accent">
                      Advanced Safety Leadership
                    </h5>
                  </div>

                  <div className="flex justify-between items-end border-t border-gray-100 pt-8">
                    <div className="text-[10px] text-gray-400 uppercase font-mono">
                      <p className="mb-1">ID: SV-2024-8849</p>
                      <p>Date: March 9, 2026</p>
                    </div>
                    <div className="text-right">
                      <div className="w-auto border-b border-gray-300 mx-auto mb-2 font-script text-primary text-lg">
                        Mr. Vikash Kumar
                      </div>
                      <p className="text-[9px] uppercase font-bold text-primary">
                        authorized signatory
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back side hint */}
                <div className="absolute -bottom-8 -right-8 w-64 bg-zinc-900 text-white p-5 rounded-lg shadow-xl transform group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500 z-20 border border-white/10">
                  <h4 className="font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2 text-accent">
                    <Layout className="w-4 h-4 text-accent" />
                    Back-Side Details
                  </h4>
                  <ul className="text-[10px] space-y-1.5 text-zinc-400">
                    <li>• Major Topics Covered</li>
                    <li>• Course Duration (Hours)</li>
                    <li>• Assessment Type</li>
                    <li>• Grading: Pass / With Honour</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 reveal">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-6 tracking-tight">
                Trusted Certificate System
              </h2>
              <p className="text-sm sm:text-base text-gray-605 mb-8 leading-relaxed">
                Our certificates meet elite professional standards. Every
                credential is dual-purpose: a badge of honor for the learner
                and a verifiable asset for the employer.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  "Learner Photograph",
                  "QR Code Verification",
                  "Unique Certificate ID",
                  "Digital Signature",
                  "Skill-based Grading",
                  "Globally Verifiable",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 group/item">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-primary transition-all duration-300">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-xs sm:text-sm text-gray-700 group-hover/item:text-accent transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-8 rounded-xl bg-muted border border-accent/20 shadow-inner">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2 text-base">
                  <Globe className="w-5 h-5 text-accent" />
                  Public Verification Portal
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-6 font-medium">
                  Verify instant credibility using Certificate ID or QR scan.
                </p>
                <div className="flex gap-2">
                  <input
                    id="manual-verify-input"
                    type="text"
                    placeholder="Enter Certificate ID"
                    className="flex-1 px-5 py-3 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-accent outline-none font-mono placeholder:font-sans transition-all duration-300"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const code = e.target.value.trim();
                        if (code) navigate(`/global-academy/verify/${code}`);
                      }
                    }}
                  />
                  <button
                    className="px-6 py-3 bg-primary text-white rounded-lg text-sm font-bold hover:bg-accent hover:text-primary transition-all duration-300 shadow-md"
                    onClick={() => {
                      const code = document
                        .getElementById("manual-verify-input")
                        ?.value.trim();
                      if (code) navigate(`/global-academy/verify/${code}`);
                    }}
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INSTITUTIONS & CORPORATES */}
      <section className="py-16 px-6 bg-zinc-950 text-white rounded-2xl overflow-hidden relative mb-16 border border-white/5 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(155,207,155,0.05)_0%,transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 reveal">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 tracking-tight">
              Built for Scale & Impact
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto font-medium">
              Custom solutions for government institutions, corporate giants,
              and safety training workshops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Institutional",
                icon: <Globe />,
                users: "Government / Schools",
              },
              {
                title: "Enterprise",
                icon: <ShieldCheck />,
                users: "Corporates / HR Teams",
              },
              {
                title: "SkillVerse",
                icon: <Users />,
                users: "Training Centers",
              },
            ].map((box, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-8 rounded-xl hover:bg-white/10 transition-all duration-300 group reveal"
              >
                <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center text-accent mb-5 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                  {React.cloneElement(box.icon, { className: "w-7 h-7" })}
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                  {box.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-5 font-semibold uppercase tracking-wider">{box.users}</p>
                <ul className="grid grid-cols-2 gap-y-3.5 gap-x-2">
                  {[
                    "Batch Enrollment",
                    "Bulk Certification",
                    "Learning Analytics",
                    "Custom Branding",
                  ].map((item, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-[10px] text-gray-300 group-hover:text-white transition-colors cursor-default"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-white/10 pt-12">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-accent mb-2">99.9%</p>
              <p className="text-gray-400 text-xs sm:text-sm">Platform Uptime</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-accent mb-2">GDPR</p>
              <p className="text-gray-450 text-xs sm:text-sm">Data Handling</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-accent mb-2">15+</p>
              <p className="text-gray-450 text-xs sm:text-sm">Languages Supported</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-accent mb-2">1M+</p>
              <p className="text-gray-450 text-xs sm:text-sm">Question Bank</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MEMBERSHIP PROGRAMS */}
      <section className="py-12 px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-12 rounded-xl bg-primary text-white border border-white/10">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Multi-Language & Offline Learning
              </h3>
              <p className="text-sm font-medium opacity-90 leading-relaxed text-gray-305">
                Study in your preferred language with localized content and
                assessments. Offline workshop participants must also register,
                upload ID, and pass the online assessment for standardized
                certification.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 border border-white/10 p-4 rounded-lg flex flex-col items-center">
                <Languages className="w-8 h-8 mb-2 text-accent" />
                <span className="text-xs font-bold">15+ Languages</span>
              </div>
              <div className="bg-white/10 border border-white/10 p-4 rounded-lg flex flex-col items-center">
                <Smartphone className="w-8 h-8 mb-2 text-accent" />
                <span className="text-xs font-bold">Offline Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-16 px-6 relative overflow-hidden text-white bg-primary rounded-2xl shadow-2xl border border-white/10">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Collaborative learning"
            className="w-full h-full object-cover scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left reveal">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-8 leading-tight tracking-tight">
            Start Your Learning <br />
            Journey <span className="text-accent italic">Today</span>.
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
            Join thousands of safety professionals gaining verified skills and
            globally trusted EHS certifications.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-6">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-accent text-primary font-extrabold rounded-lg shadow-lg hover:bg-white transition duration-300"
            >
              Register Now
            </Link>
            <div className="flex flex-col justify-center text-left">
              <p className="font-bold flex items-center gap-2 text-accent text-sm sm:text-base">
                <ShieldCheck className="w-6 h-6" />
                Verified Credentials
              </p>
              <p className="text-xs text-gray-400 font-medium">
                Trusted by Global EHS Institutions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseHome;
