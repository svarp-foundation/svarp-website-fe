import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "profile" | "membership" | "donations" | "academy"
  const [copiedId, setCopiedId] = useState(false);
  const navigate = useNavigate();

  const handleCopyId = () => {
    const portalId = `SVARP-USR-${userData?.id || "001"}`;
    navigator.clipboard.writeText(portalId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          logout();
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, navigate, logout]);

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-slate-900 text-white px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-400">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) return null;

  const membership = userData.membership;
  const planName = membership ? membership.plan.name : "No Active Membership";
  const status = membership && membership.is_active ? "Active" : "Inactive";
  const expiryDate =
    membership && membership.end_date
      ? new Date(membership.end_date).toLocaleDateString()
      : "N/A";
  const isLifetime = membership && !membership.end_date && membership.is_active;

  // Calculate Profile Completeness
  const totalMandatoryFields = 11 + (userData.is_student ? 1 : 0);
  const filledFields = 
    (userData.full_name ? 1 : 0) +
    (userData.phone_number ? 1 : 0) +
    (userData.date_of_birth ? 1 : 0) +
    (userData.address ? 1 : 0) +
    (userData.city ? 1 : 0) +
    (userData.state ? 1 : 0) +
    (userData.pincode ? 1 : 0) +
    (userData.government_id_type ? 1 : 0) +
    (userData.government_id_number ? 1 : 0) +
    (userData.government_id_path ? 1 : 0) +
    (userData.profile_picture_path ? 1 : 0) +
    (userData.is_student ? (userData.student_id_path ? 1 : 0) : 0);
  
  const profileCompleteness = Math.round((filledFields / totalMandatoryFields) * 100);

  const totalDonationsAmount = userData.donations
    ? userData.donations.reduce((acc, d) => (d.status === "success" ? acc + Number(d.amount || 0) : acc), 0)
    : 0;

  const navTabs = [
    {
      id: "overview",
      label: "Overview",
      shortLabel: "Overview",
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      id: "profile",
      label: "Profile & Identity",
      shortLabel: "Profile",
      badge: profileCompleteness < 100 ? `${profileCompleteness}%` : "Verified",
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: "membership",
      label: "Membership & Payments",
      shortLabel: "Plans",
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      id: "donations",
      label: "My Donations",
      shortLabel: "Donations",
      count: userData.donations ? userData.donations.length : 0,
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      id: "academy",
      label: "Academy & Courses",
      shortLabel: "Academy",
      icon: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-dvh bg-slate-100/90 pt-24 sm:pt-28 lg:pt-32 pb-12 font-sans text-slate-800 overflow-x-hidden w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">

        {/* ── Top Admin Portal Header ── */}
        <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 sm:w-64 h-48 sm:h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 -mb-12 w-60 sm:w-80 h-60 sm:h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            
            {/* User Info Stack */}
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="relative flex-shrink-0">
                {userData.profile_picture_path ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${userData.profile_picture_path}`}
                    alt={userData.full_name}
                    className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-accent/40 shadow-md"
                  />
                ) : (
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary via-slate-800 to-slate-900 border-2 border-accent/40 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-md">
                    {userData.full_name ? userData.full_name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                {userData.is_active && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 border-2 border-slate-900 rounded-full flex items-center justify-center text-slate-900" title="Account Active">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white truncate">
                    {userData.full_name || "User Portal"}
                  </h1>
                  {!userData.is_active && (
                    <span className="bg-red-500/20 text-red-400 text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-red-500/30 font-bold uppercase tracking-wider animate-pulse">
                      Restricted
                    </span>
                  )}
                  {status === "Active" && (
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-emerald-500/30 font-semibold inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      {planName}
                    </span>
                  )}
                </div>

                <p className="text-slate-400 text-xs sm:text-sm mt-0.5 truncate">
                  {userData.email}
                </p>

              </div>
            </div>

            {/* Quick Actions Toolbar (Fits UI structure on all screen sizes) */}
            <div className="grid grid-cols-3 sm:flex sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={handleCopyId}
                className="w-full sm:w-auto px-3 sm:px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center justify-center gap-1.5 border border-white/10 active:scale-95 cursor-pointer"
                title="Click to copy User ID"
              >
                <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {copiedId ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  )}
                </svg>
                <span className="truncate">{copiedId ? "Copied!" : "Copy ID"}</span>
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className="w-full sm:w-auto px-3 sm:px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center justify-center gap-1.5 border border-white/10 active:scale-95"
              >
                <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="truncate">Edit Profile</span>
              </button>

              <button
                onClick={logout}
                className="w-full sm:w-auto px-3 sm:px-3.5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-red-500/20 active:scale-95"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="truncate">Logout</span>
              </button>
            </div>

          </div>
        </div>

        {/* ── Mobile Responsive KPI Metric Cards Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: Membership Plan */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Membership Tier</span>
              <div className={`p-1.5 sm:p-2 rounded-xl ${status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
            <p className="text-sm sm:text-xl font-bold text-slate-900 mt-2 sm:mt-3 truncate">{planName}</p>
            <div className="mt-1 sm:mt-2 flex items-center justify-between text-[11px] sm:text-xs">
              <span className={`font-semibold px-2 py-0.5 rounded-full text-[10px] ${status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
                {status}
              </span>
              <span className="text-slate-500 font-medium truncate max-sm:hidden">
                {isLifetime ? "Lifetime" : expiryDate !== "N/A" ? expiryDate : "No Sub"}
              </span>
            </div>
          </div>

          {/* Card 2: Profile Health */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Profile Health</span>
              <div className="p-1.5 sm:p-2 rounded-xl bg-blue-50 text-blue-600">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 sm:gap-2 mt-2 sm:mt-3">
              <p className="text-lg sm:text-2xl font-bold text-slate-900">{profileCompleteness}%</p>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
                {profileCompleteness === 100 ? "Verified" : "Action Needed"}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 sm:h-2 rounded-full mt-2 sm:mt-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${profileCompleteness === 100 ? "bg-emerald-500" : "bg-blue-600"}`}
                style={{ width: `${profileCompleteness}%` }}
              ></div>
            </div>
          </div>

          {/* Card 3: Total Donations */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Total Donated</span>
              <div className="p-1.5 sm:p-2 rounded-xl bg-amber-50 text-amber-600">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-2 sm:mt-3 truncate">₹{totalDonationsAmount.toLocaleString()}</p>
            <div className="mt-1 sm:mt-2 flex items-center justify-between text-[10px] sm:text-xs text-slate-500">
              <span>{userData.donations ? userData.donations.length : 0} Receipts</span>
              <button
                onClick={() => setActiveTab("donations")}
                className="text-primary font-semibold hover:underline"
              >
                80G ↗
              </button>
            </div>
          </div>

          {/* Card 4: Global Academy */}
          <div className="bg-white rounded-2xl p-3.5 sm:p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Academy</span>
              <div className="p-1.5 sm:p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
            </div>
            <p className="text-sm sm:text-lg font-bold text-slate-900 mt-2 sm:mt-3 truncate">LMS Active</p>
            <div className="mt-1 sm:mt-2 flex items-center justify-between text-[10px] sm:text-xs">
              <span className="text-slate-500">Training</span>
              <Link to="/global-academy/catalog" className="text-indigo-600 font-semibold hover:underline">
                Catalog ↗
              </Link>
            </div>
          </div>

        </div>

        {/* ── Scrollable Touch-Friendly Tab Bar ── */}
        <div className="bg-white rounded-2xl p-1.5 sm:p-2 shadow-sm border border-slate-200 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center gap-1 min-w-max">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 ${
                    isActive
                      ? "bg-slate-900 text-accent shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                        isActive ? "bg-accent/20 text-accent border border-accent/30" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span
                      className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tab Content Views ── */}

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              
              {/* Membership Status Box */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 sm:pb-5">
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Current Subscription</span>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-0.5">{planName}</h3>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                      status === "Active" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-red-100 text-red-800 border border-red-200"
                    }`}>
                      ● {status}
                    </span>
                    {!membership && (
                      <button
                        onClick={() => navigate("/membership")}
                        className="bg-slate-900 text-accent hover:bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                      >
                        Browse Plans
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-5">
                  <div>
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide">Valid Until</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                      {isLifetime ? "✨ Lifetime" : expiryDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide">Account Role</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 uppercase">
                      {userData.role || "Member"}
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide">ID Verification</p>
                    <p className="text-xs sm:text-sm font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {userData.government_id_path ? "Verified" : "Pending"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions Shortcuts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <Link
                  to="/membership"
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group flex items-center sm:block gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Upgrade Membership</h4>
                    <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Corporate & Annual tiers</p>
                  </div>
                </Link>

                <Link
                  to="/global-academy/catalog"
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group flex items-center sm:block gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Course Catalog</h4>
                    <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">EHS & Safety training</p>
                  </div>
                </Link>

                <Link
                  to="/donate"
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group flex items-center sm:block gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Make a Donation</h4>
                    <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">Support green initiatives</p>
                  </div>
                </Link>
              </div>

              {/* Recent Transactions Preview */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-md font-bold text-slate-900">Recent Transactions</h3>
                  <button
                    onClick={() => setActiveTab("membership")}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    View All ↗
                  </button>
                </div>

                {userData.transactions && userData.transactions.length > 0 ? (
                  <>
                    {/* Desktop Table View */}
                    <div className="hidden sm:block overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-100">
                        <thead>
                          <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <th className="px-4 py-3 rounded-l-lg">Date</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3 rounded-r-lg">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                          {userData.transactions.slice(0, 3).map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-50/50 transition">
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                {new Date(tx.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3.5 whitespace-nowrap font-bold text-slate-900">
                                ₹{tx.amount}
                              </td>
                              <td className="px-4 py-3.5 whitespace-nowrap">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                    tx.status === "success"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  {tx.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Touch Cards View */}
                    <div className="sm:hidden space-y-2">
                      {userData.transactions.slice(0, 3).map((tx) => (
                        <div key={tx.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-slate-900">₹{tx.amount}</p>
                            <p className="text-[10px] text-slate-400">{new Date(tx.created_at).toLocaleDateString()}</p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                              tx.status === "success" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500 text-xs">
                    No transactions recorded yet.
                  </div>
                )}
              </div>

            </div>

            {/* Right Column (Sidebar Widgets) */}
            <div className="space-y-4 sm:space-y-6">

              {/* Profile Completion Checklist Widget */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-xs sm:text-md font-bold text-slate-900">Verification Health</h3>
                  <span className="text-xs font-bold text-primary">{profileCompleteness}%</span>
                </div>

                <ul className="space-y-2.5 text-xs">
                  <li className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-700">Basic Info & Contact</span>
                    {userData.phone_number ? (
                      <span className="text-emerald-600 font-bold">✓ Saved</span>
                    ) : (
                      <span className="text-amber-600 font-semibold">Pending</span>
                    )}
                  </li>
                  <li className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-700">Government ID Upload</span>
                    {userData.government_id_path ? (
                      <span className="text-emerald-600 font-bold">✓ Uploaded</span>
                    ) : (
                      <span className="text-amber-600 font-semibold">Pending</span>
                    )}
                  </li>
                  <li className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-700">Profile Photo</span>
                    {userData.profile_picture_path ? (
                      <span className="text-emerald-600 font-bold">✓ Uploaded</span>
                    ) : (
                      <span className="text-amber-600 font-semibold">Pending</span>
                    )}
                  </li>
                  {userData.is_student && (
                    <li className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-semibold text-slate-700">Student ID Verification</span>
                      {userData.student_id_path ? (
                        <span className="text-emerald-600 font-bold">✓ Uploaded</span>
                      ) : (
                        <span className="text-amber-600 font-semibold">Pending</span>
                      )}
                    </li>
                  )}
                </ul>

                <button
                  onClick={() => setActiveTab("profile")}
                  className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-accent font-bold text-xs rounded-xl transition text-center block"
                >
                  Complete Profile Form →
                </button>
              </div>

              {/* Verified Certificate Quick Lookup Widget */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-800">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-accent/20 text-accent flex items-center justify-center mb-2.5">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-extrabold text-xs sm:text-sm text-white">Certificate Verifier</h4>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  Verify genuine SVARP training certificates & digital credentials.
                </p>
                <Link
                  to="/global-academy/verify"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                >
                  Open Verifier Portal ↗
                </Link>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PROFILE & IDENTITY FORM */}
        {activeTab === "profile" && (
          <ProfileForm userData={userData} token={token} />
        )}

        {/* TAB 3: MEMBERSHIP & PAYMENTS */}
        {activeTab === "membership" && (
          <div className="space-y-4 sm:space-y-6">
            
            {/* Membership Card Details */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 sm:pb-5 mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">Subscription Overview</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Manage your active membership plan and view entitlement status</p>
                </div>
                <button
                  onClick={() => navigate("/membership")}
                  className="bg-slate-900 text-accent hover:bg-slate-800 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm self-start sm:self-auto w-full sm:w-auto"
                >
                  {membership ? "Change / Renew Plan" : "Subscribe Now"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase">Plan Name</span>
                  <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">{planName}</p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase">Active Status</span>
                  <div className="mt-0.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                    }`}>
                      {status}
                    </span>
                  </div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase">Access Period</span>
                  <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                    {isLifetime ? "Lifetime Unlimited" : expiryDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Full Transaction History Table */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Payment Transactions History</h3>
              
              {userData.transactions && userData.transactions.length > 0 ? (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-100">
                    <table className="min-w-full divide-y divide-slate-100">
                      <thead>
                        <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          <th className="px-6 py-3.5">Transaction ID</th>
                          <th className="px-6 py-3.5">Date</th>
                          <th className="px-6 py-3.5">Amount</th>
                          <th className="px-6 py-3.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100 text-xs font-medium text-slate-700">
                        {userData.transactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-slate-50/50 transition">
                            <td className="px-6 py-4 whitespace-nowrap font-mono text-slate-500">
                              TXN-{tx.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {new Date(tx.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-900">
                              ₹{tx.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                  tx.status === "success"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Touch Cards View */}
                  <div className="sm:hidden space-y-2.5">
                    {userData.transactions.map((tx) => (
                      <div key={tx.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-mono text-[10px] text-slate-400">TXN-{tx.id}</p>
                          <p className="font-bold text-slate-900 text-sm mt-0.5">₹{tx.amount}</p>
                          <p className="text-[10px] text-slate-500">{new Date(tx.created_at).toLocaleDateString()}</p>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            tx.status === "success" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8 sm:py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs sm:text-sm">
                  No payment transactions logged in your account history.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 4: MY DONATIONS */}
        {activeTab === "donations" && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 sm:pb-5">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Donation History & Tax Certificates</h3>
                <p className="text-xs text-slate-500 mt-0.5">Download your official 80G tax exemption certificates</p>
              </div>
              <Link
                to="/donate"
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm self-start sm:self-auto w-full sm:w-auto flex items-center justify-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Donate Again
              </Link>
            </div>

            {userData.donations && userData.donations.length > 0 ? (
              <>
                {/* Desktop Table View */}
                <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-100">
                  <table className="min-w-full divide-y divide-slate-100">
                    <thead>
                      <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <th className="px-6 py-3.5">Date</th>
                        <th className="px-6 py-3.5">Amount</th>
                        <th className="px-6 py-3.5">Status</th>
                        <th className="px-6 py-3.5 text-right">Tax Certificate</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 text-xs font-medium text-slate-700">
                      {userData.donations.map((donation) => (
                        <tr key={donation.id} className="hover:bg-slate-50/50 transition">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(donation.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-900">
                            ₹{donation.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                donation.status === "success"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {donation.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right font-semibold">
                            {donation.status === "success" ? (
                              <a
                                href={`${import.meta.env.VITE_API_BASE_URL}/donations/${donation.id}/certificate`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-primary hover:text-emerald-700 font-bold bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition"
                              >
                                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download PDF
                              </a>
                            ) : (
                              <span className="text-slate-400">N/A</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards View */}
                <div className="sm:hidden space-y-3">
                  {userData.donations.map((donation) => (
                    <div key={donation.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900 text-base">₹{donation.amount}</p>
                          <p className="text-[10px] text-slate-500">{new Date(donation.created_at).toLocaleDateString()}</p>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            donation.status === "success" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {donation.status}
                        </span>
                      </div>
                      {donation.status === "success" && (
                        <a
                          href={`${import.meta.env.VITE_API_BASE_URL}/donations/${donation.id}/certificate`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full mt-2 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-900 bg-white border border-slate-300 py-2 rounded-lg hover:bg-slate-100 transition shadow-sm"
                        >
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download 80G Certificate
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8 sm:py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs sm:text-sm">
                No donation records found. Your future contributions will generate 80G tax certificates here.
              </div>
            )}
          </div>
        )}

        {/* TAB 5: ACADEMY & COURSES */}
        {activeTab === "academy" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-r from-slate-900 via-primary to-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="max-w-2xl">
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
                  SVARP Global Academy
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold mt-3 text-white">
                  Environmental, Safety & EHS Learning Hub
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                  Access official safety training modules, certified EHS courses, and verify training certificates for global compliance.
                </p>
                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    to="/global-academy/catalog"
                    className="bg-accent hover:bg-emerald-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2 text-center"
                  >
                    Browse Course Catalog →
                  </Link>
                  <Link
                    to="/global-academy/verify"
                    className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl text-xs backdrop-blur-md transition border border-white/10 flex items-center justify-center gap-2 text-center"
                  >
                    Verify Certificate Code
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ── ProfileForm Component (100% Mobile Responsive) ── */
function ProfileForm({ userData, token }) {
  const [formData, setFormData] = useState({
    full_name: userData.full_name || "",
    phone_number: userData.phone_number || "",
    date_of_birth: userData.date_of_birth || "",
    address: userData.address || "",
    city: userData.city || "",
    state: userData.state || "",
    pincode: userData.pincode || "",
    government_id_type: userData.government_id_type || "",
    government_id_number: userData.government_id_number || "",
    government_id_path: userData.government_id_path || "",
    is_student: userData.is_student || false,
    student_id_path: userData.student_id_path || "",
    profile_picture_path: userData.profile_picture_path || "",
    gst_number: userData.gst_number || "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [disclaimerConfirmed, setDisclaimerConfirmed] = useState(false);

  // File upload states
  const [govIdFile, setGovIdFile] = useState(null);
  const [studentIdFile, setStudentIdFile] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);

  const isFullNameFilled = !!userData.full_name;
  const isPhoneFilled = !!userData.phone_number;
  const isDobFilled = !!userData.date_of_birth;
  const isAddressFilled = !!userData.address;
  const isCityFilled = !!userData.city;
  const isStateFilled = !!userData.state;
  const isPincodeFilled = !!userData.pincode;
  const isGovIdTypeFilled = !!userData.government_id_type;
  const isGovIdNumFilled = !!userData.government_id_number;
  const isGovIdPathFilled = !!userData.government_id_path;
  const isProfilePicFilled = !!userData.profile_picture_path;
  const isStudentFilled = userData.is_student === true;
  const isStudentIdPathFilled = !!userData.student_id_path;
  const isGstFilled = !!userData.gst_number;

  const isFullySubmitted =
    isFullNameFilled &&
    isPhoneFilled &&
    isDobFilled &&
    isAddressFilled &&
    isCityFilled &&
    isStateFilled &&
    isPincodeFilled &&
    isGovIdTypeFilled &&
    isGovIdNumFilled &&
    isGovIdPathFilled &&
    isProfilePicFilled &&
    (isStudentFilled ? isStudentIdPathFilled : true);

  const isPartiallySubmitted =
    isFullNameFilled ||
    isPhoneFilled ||
    isDobFilled ||
    isAddressFilled ||
    isCityFilled ||
    isStateFilled ||
    isPincodeFilled ||
    isGovIdTypeFilled ||
    isGovIdNumFilled ||
    isGovIdPathFilled ||
    isProfilePicFilled ||
    isStudentIdPathFilled ||
    isGstFilled;

  const hasChanges =
    formData.full_name !== (userData.full_name || "") ||
    formData.phone_number !== (userData.phone_number || "") ||
    formData.date_of_birth !== (userData.date_of_birth || "") ||
    formData.address !== (userData.address || "") ||
    formData.city !== (userData.city || "") ||
    formData.state !== (userData.state || "") ||
    formData.pincode !== (userData.pincode || "") ||
    formData.government_id_type !== (userData.government_id_type || "") ||
    formData.government_id_number !== (userData.government_id_number || "") ||
    formData.is_student !== (userData.is_student || false) ||
    formData.gst_number !== (userData.gst_number || "") ||
    govIdFile !== null ||
    studentIdFile !== null ||
    profilePicFile !== null;

  const showSubmitSection = !isFullySubmitted || hasChanges;

  const totalMandatoryFields = 11 + (formData.is_student ? 1 : 0);
  const filledMandatoryFields = 
    (formData.full_name ? 1 : 0) +
    (formData.phone_number ? 1 : 0) +
    (formData.date_of_birth ? 1 : 0) +
    (formData.address ? 1 : 0) +
    (formData.city ? 1 : 0) +
    (formData.state ? 1 : 0) +
    (formData.pincode ? 1 : 0) +
    (formData.government_id_type ? 1 : 0) +
    (formData.government_id_number ? 1 : 0) +
    (formData.government_id_path || govIdFile ? 1 : 0) +
    (formData.profile_picture_path || profilePicFile ? 1 : 0) +
    (formData.is_student ? (formData.student_id_path || studentIdFile ? 1 : 0) : 0);
  
  const percentComplete = Math.round((filledMandatoryFields / totalMandatoryFields) * 100);

  const disabledInputClass = "mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed text-xs sm:text-sm p-3 sm:p-3.5 border transition-all";
  const activeInputClass = "mt-1 block w-full rounded-xl border-slate-200 shadow-sm focus:border-slate-900 focus:ring-slate-900/20 focus:ring-4 text-xs sm:text-sm p-3 sm:p-3.5 border transition-all bg-white placeholder-slate-400";

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFileChange = (e, setter) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("file", file);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/upload/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || "File upload failed");
    }

    const result = await response.json();
    return result.file_path;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!disclaimerConfirmed) {
      setMessage("Please confirm the disclaimer to proceed.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      let updatedData = { ...formData };

      if (govIdFile)
        updatedData.government_id_path = await uploadFile(govIdFile);
      if (studentIdFile)
        updatedData.student_id_path = await uploadFile(studentIdFile);
      if (profilePicFile)
        updatedData.profile_picture_path = await uploadFile(profilePicFile);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        setMessage("Application details updated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.detail || "Update failed"}`);
      }
    } catch (error) {
      console.error("Update error", error);
      setMessage(error.message || "Update failed due to network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-sm border border-slate-200 relative overflow-hidden">
      
      {/* Form Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6 border-b border-slate-100 pb-4 sm:pb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
            Membership & Verification Details
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Complete all fields to verify your profile identity and qualify for official membership services.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-left sm:text-right">
            <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Completeness</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900">{percentComplete}%</span>
          </div>
          <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${percentComplete}%` }} />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        
        {/* 1. Personal Details */}
        <div className="space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-sm sm:text-md font-bold text-slate-900">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  disabled={isFullNameFilled}
                  className={isFullNameFilled ? disabledInputClass : activeInputClass}
                  required
                />
                {isFullNameFilled && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={userData.email || ""}
                  disabled
                  className="mt-1 block w-full rounded-xl border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed text-xs sm:text-sm p-3 sm:p-3.5 border"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" title="Email locked">
                  🔒
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Contact Number *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  disabled={isPhoneFilled}
                  className={isPhoneFilled ? disabledInputClass : activeInputClass}
                  required
                  placeholder="Ex: +91 9876543210"
                />
                {isPhoneFilled && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Date of Birth *
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  disabled={isDobFilled}
                  className={isDobFilled ? disabledInputClass : activeInputClass}
                  required
                />
                {isDobFilled && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Address Details */}
        <div className="space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <h3 className="text-sm sm:text-md font-bold text-slate-900">Address Info</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Street Address *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={isAddressFilled}
                  className={isAddressFilled ? disabledInputClass : activeInputClass}
                  placeholder="Apartment, unit, street address"
                  required
                />
                {isAddressFilled && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                City *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={isCityFilled}
                  className={isCityFilled ? disabledInputClass : activeInputClass}
                  placeholder="Ex: Meerut"
                  required
                />
                {isCityFilled && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                State *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={isStateFilled}
                  className={isStateFilled ? disabledInputClass : activeInputClass}
                  placeholder="Ex: Uttar Pradesh"
                  required
                />
                {isStateFilled && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Pincode *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  disabled={isPincodeFilled}
                  className={isPincodeFilled ? disabledInputClass : activeInputClass}
                  placeholder="Ex: 250103"
                  required
                  maxLength={6}
                />
                {isPincodeFilled && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Identity Verification & File Uploads */}
        <div className="space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.378 0 2.5-1.122 2.5-2.5S10.378 9 9 9" />
              </svg>
            </div>
            <h3 className="text-sm sm:text-md font-bold text-slate-900">Identity Verification</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Government ID Type *
              </label>
              <div className="relative">
                <select
                  name="government_id_type"
                  value={formData.government_id_type}
                  onChange={handleChange}
                  disabled={isGovIdTypeFilled}
                  className={isGovIdTypeFilled ? disabledInputClass : `${activeInputClass} bg-white`}
                  required
                >
                  <option value="">Select ID Type</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="Passport">Passport</option>
                </select>
                {isGovIdTypeFilled && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>

            {formData.government_id_type && (
              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  {formData.government_id_type} Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="government_id_number"
                    value={formData.government_id_number}
                    onChange={handleChange}
                    disabled={isGovIdNumFilled}
                    className={isGovIdNumFilled ? disabledInputClass : activeInputClass}
                    required
                  />
                  {isGovIdNumFilled && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" title="Locked & Verified">
                      🔒
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Gov ID Upload Box */}
            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Government ID File *
              </label>
              
              {formData.government_id_path ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-emerald-800 truncate">Gov ID Uploaded</p>
                      <a
                        href={`${import.meta.env.VITE_API_BASE_URL}${formData.government_id_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] sm:text-[11px] text-primary hover:underline font-bold"
                      >
                        View File ↗
                      </a>
                    </div>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              ) : govIdFile ? (
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <p className="text-xs font-bold text-blue-800 truncate">{govIdFile.name}</p>
                  <button
                    type="button"
                    onClick={() => setGovIdFile(null)}
                    className="text-xs font-bold text-red-600 hover:underline flex-shrink-0 ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-3.5 text-center hover:border-slate-800 transition bg-slate-50/50">
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) => handleFileChange(e, setGovIdFile)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <p className="text-xs font-bold text-slate-700">Click to Upload Gov ID</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">PDF or Image (Max 5MB)</p>
                </div>
              )}
            </div>

            {/* Profile Photo Box */}
            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Profile Passport Photo *
              </label>

              {formData.profile_picture_path ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${formData.profile_picture_path}`}
                      alt="Profile Pic"
                      className="w-7 h-7 rounded-full object-cover border border-emerald-300 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-emerald-800 truncate">Photo Uploaded</p>
                      <a
                        href={`${import.meta.env.VITE_API_BASE_URL}${formData.profile_picture_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] sm:text-[11px] text-primary hover:underline font-bold"
                      >
                        View Photo ↗
                      </a>
                    </div>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              ) : profilePicFile ? (
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <p className="text-xs font-bold text-blue-800 truncate">{profilePicFile.name}</p>
                  <button
                    type="button"
                    onClick={() => setProfilePicFile(null)}
                    className="text-xs font-bold text-red-600 hover:underline flex-shrink-0 ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-3.5 text-center hover:border-slate-800 transition bg-slate-50/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setProfilePicFile)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <p className="text-xs font-bold text-slate-700">Click to Upload Photo</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Image format (Max 3MB)</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Additional Info & Student Verification */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm sm:text-md font-bold text-slate-900">Student & Tax Info</h3>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                name="is_student"
                checked={formData.is_student}
                onChange={handleChange}
                disabled={isStudentFilled}
                className="h-4 w-4 mt-0.5 text-slate-900 focus:ring-slate-900 border-slate-300 rounded"
                id="student_checkbox"
              />
              <label htmlFor="student_checkbox" className="ml-2 text-xs font-bold text-slate-700 cursor-pointer">
                Apply for Student Membership Discount
                <p className="text-[10px] text-slate-400 font-normal mt-0.5">
                  Requires uploading valid College/School Student ID Card.
                </p>
              </label>
            </div>

            {formData.is_student && (
              <div className="pl-3 sm:pl-4 border-l-2 border-slate-900 space-y-2.5">
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                  Student ID File *
                </label>
                {formData.student_id_path ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl max-w-md">
                    <span className="text-xs font-bold text-emerald-800">Student ID Uploaded</span>
                    <a href={`${import.meta.env.VITE_API_BASE_URL}${formData.student_id_path}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-primary">
                      View ↗
                    </a>
                  </div>
                ) : studentIdFile ? (
                  <div className="flex items-center justify-between p-2.5 bg-blue-50 border border-blue-100 rounded-xl max-w-md">
                    <span className="text-xs font-bold text-blue-800 truncate">{studentIdFile.name}</span>
                    <button type="button" onClick={() => setStudentIdFile(null)} className="text-xs text-red-600 font-bold ml-2">Remove</button>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-3 text-center bg-slate-50 max-w-md">
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) => handleFileChange(e, setStudentIdFile)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required={formData.is_student && !formData.student_id_path}
                    />
                    <p className="text-xs font-bold text-slate-700">Click to Upload Student ID</p>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                GST Number (Optional)
              </label>
              <input
                type="text"
                name="gst_number"
                value={formData.gst_number}
                onChange={handleChange}
                disabled={isGstFilled}
                className={isGstFilled ? disabledInputClass : activeInputClass}
                placeholder="Ex: 22AAAAA0000A1Z5"
              />
            </div>
          </div>
        </div>

        {/* 5. Terms Affirmation */}
        {showSubmitSection && (
          <div className="bg-slate-50 border border-slate-200 p-3.5 sm:p-5 rounded-xl space-y-2.5">
            <h4 className="text-[11px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Mandatory Affirmation
            </h4>
            <div className="flex items-start">
              <input
                id="disclaimer"
                type="checkbox"
                checked={disclaimerConfirmed}
                onChange={(e) => setDisclaimerConfirmed(e.target.checked)}
                className="h-4 w-4 mt-0.5 text-slate-900 focus:ring-slate-900 border-slate-300 rounded cursor-pointer"
                required
              />
              <label htmlFor="disclaimer" className="ml-2 text-xs text-slate-700 font-semibold cursor-pointer">
                I confirm that all submitted details and documents are true and accurate.
              </label>
            </div>
          </div>
        )}

        {/* Submit Actions */}
        {showSubmitSection ? (
          <div className="pt-3 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading || !disclaimerConfirmed}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-accent font-bold px-8 py-3.5 sm:py-3 rounded-xl text-xs sm:text-xs transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
              )}
              {loading
                ? "Submitting..."
                : isPartiallySubmitted
                  ? "Update Details"
                  : "Save Profile Details"}
            </button>
            
            {message && (
              <div
                className={`mt-3 p-3 rounded-xl text-xs font-bold border ${
                  message.includes("successfully") 
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                    : "bg-red-50 text-red-800 border-red-200"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        ) : (
          <div className="pt-3 border-t border-slate-100">
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-3.5 rounded-xl flex items-center gap-2.5">
              <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-xs font-bold">
                Profile Verified & Locked. Your identity records are approved by administration.
              </p>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
