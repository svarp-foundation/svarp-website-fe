import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../context/PopupContext";

export default function Membership() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { showPopup } = usePopup();
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/memberships/`);
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map(p => ({
            id: p.id,
            title: p.name,
            desc: p.description || "",
            benefits: p.features ? p.features.split(",").map(f => f.trim()).filter(Boolean) : [],
            highlight: p.highlight,
            price: p.price
          })).sort((a, b) => a.price - b.price);
          setPlans(formatted);
        }
      } catch (err) {
        console.error("Error fetching memberships", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleSubscribe = async (planTitle, price, planId) => {
    if (!user) {
      showPopup("Please login to apply for membership", "warning");
      navigate("/login");
      return;
    }

    if (!token) {
      showPopup("Authentication error. Please login again.", "error");
      navigate("/login");
      return;
    }

    // Check if mandatory application details are filled
    const isProfileComplete =
      user.date_of_birth &&
      user.government_id_type &&
      user.government_id_number &&
      user.government_id_path &&
      user.profile_picture_path;

    if (!isProfileComplete) {
      showPopup(
        "Please complete your Profile Details in the Dashboard first.",
        "warning",
      );
      navigate("/dashboard");
      return;
    }

    // Redirect to Payment page with plan details
    navigate("/payment", {
      state: {
        plan: {
          id: planId,
          title: planTitle,
          price: price,
        },
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const columns = [
    { key: "feature", label: "Features" },
    { key: "lifetime", label: "Lifetime" },
    { key: "yearly", label: "Yearly" },
    { key: "student", label: "Student" },
    { key: "corporate", label: "Corporate" },
  ];

  const rows = [
    {
      feature: "Full Online Course Access",
      lifetime: "✅",
      yearly: "✅",
      student: "✅",
      corporate: "✅",
    },
    {
      feature: "Access to Diploma Courses",
      lifetime: "✅",
      yearly: "❌",
      student: "❌",
      corporate: "✅",
    },
    {
      feature: "Validity",
      lifetime: "Lifetime",
      yearly: "1 Year",
      student: "1 Year",
      corporate: "1 Year",
    },
    {
      feature: "Offline Courses Access",
      lifetime: "✅",
      yearly: "❌",
      student: "Discounts",
      corporate: "✅",
    },
    {
      feature: "Networking Events",
      lifetime: "✅",
      yearly: "✅",
      student: "✅",
      corporate: "✅",
    },
    {
      feature: "Seminars & Workshops",
      lifetime: "✅",
      yearly: "✅",
      student: "✅",
      corporate: "✅",
    },
    {
      feature: "Discounts on Certifications",
      lifetime: "✅",
      yearly: "❌",
      student: "✅",
      corporate: "✅",
    },
    {
      feature: "Free Samples (All Products)",
      lifetime: "✅",
      yearly: "Partial",
      student: "Partial",
      corporate: "✅",
    },
    {
      feature: "R&D / Business Support",
      lifetime: "❌",
      yearly: "❌",
      student: "❌",
      corporate: "✅",
    },
    {
      feature: "Priority Access & Recognition",
      lifetime: "✅",
      yearly: "❌",
      student: "❌",
      corporate: "✅",
    },
    {
      feature: "Renewal Needed",
      lifetime: "❌",
      yearly: "✅",
      student: "✅",
      corporate: "✅",
    },
  ];

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 sm:mb-6">
            Membership
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            SVARP Global membership connects individuals, organizations, and
            institutions to a credible network focused on safety,
            sustainability, professional excellence, and social impact.
          </p>
        </div>

        {/* Membership Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          {plans.map((plan) => {
            const currentMembership = user?.membership?.is_active
              ? user.membership
              : null;
            const currentPlanId = currentMembership?.plan?.id;
            const currentPlanPrice = currentMembership?.plan?.price;

            const isCurrentPlan = currentPlanId === plan.id;
            const isDowngrade =
              currentPlanPrice && plan.price < currentPlanPrice;
            const isUpgrade = currentPlanPrice && plan.price > currentPlanPrice;

            let buttonText = "Apply for Membership";
            let isDisabled = false;

            if (isCurrentPlan) {
              buttonText = "Current Plan";
              isDisabled = true;
            } else if (isDowngrade) {
              buttonText = "Not Available (Downgrade)";
              isDisabled = true;
            } else if (isUpgrade) {
              buttonText = "Upgrade Plan";
            }

            return (
              <div
                key={plan.title}
                className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                  plan.highlight
                    ? "bg-gradient-to-br from-primary to-primary-dark text-white md:scale-105 ring-4 ring-accent/30"
                    : "bg-white border border-gray-100"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg sm:text-xl font-bold">{plan.title.split("–")[0].trim()}</h3>
                    {plan.highlight && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-accent px-2.5 py-1 rounded-md">
                        Best Value
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-sm leading-relaxed mb-6 font-medium ${
                      plan.highlight ? "text-white/90" : "text-gray-500"
                    }`}
                  >
                    {plan.desc}
                  </p>

                  <div className="text-2xl sm:text-3xl font-extrabold mb-6 flex items-baseline gap-1">
                    {plan.price === 250000 ? (
                      <span className="text-xl">from ₹2,50,000<span className="text-sm font-semibold">/year</span></span>
                    ) : plan.price === 25000 ? (
                      <span>₹25,000<span className="text-sm font-semibold"> (one-time)</span></span>
                    ) : plan.price === 5000 ? (
                      <span>₹5,000<span className="text-sm font-semibold">/year</span></span>
                    ) : (
                      <span>₹1,000<span className="text-sm font-semibold">/year</span></span>
                    )}
                  </div>

                  <ul className="space-y-3 text-sm mb-8">
                    {plan.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-accent" : "text-primary"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={plan.highlight ? "text-white/90" : "text-gray-700"}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() =>
                    handleSubscribe(plan.title, plan.price, plan.id)
                  }
                  disabled={isDisabled}
                  className={`w-full py-3.5 rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 ${
                    isDisabled
                      ? plan.highlight
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed opacity-80"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : plan.highlight
                        ? "bg-accent text-primary hover:bg-white hover:text-primary"
                        : "bg-primary text-white hover:bg-accent hover:text-primary"
                  }`}
                >
                  {buttonText}
                </button>
              </div>
            );
          })}
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white mt-16 sm:mt-24 -mx-4 sm:mx-0">
          <div className="sm:hidden text-xs text-gray-400 text-center mb-2 px-4">← Scroll to see all plans →</div>
          <table className="min-w-full border-collapse text-sm">
            {/* HEADER */}
            <thead>
              <tr className="bg-primary text-white">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 font-semibold ${
                      col.key === "feature" ? "text-left" : "text-center"
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 ${
                        col.key === "feature"
                          ? "font-medium text-left"
                          : "text-center"
                      }`}
                    >
                      {row[col.key] === "✅" ? (
                        <span className="text-emerald-500 font-bold text-base">✓</span>
                      ) : row[col.key] === "❌" ? (
                        <span className="text-slate-300 text-base">—</span>
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Why Join */}
        <div className="mt-16 sm:mt-24 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-lg text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
            Why Join SVARP Global?
          </h2>

          <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
            As a SVARP member, you become part of a credible, impact-driven
            network committed to building safer workplaces, sustainable
            practices, and empowered communities through collaboration,
            innovation, and professional excellence.
          </p>

          <p className="text-accent font-script text-2xl sm:text-3xl">
            together for a safer tomorrow
          </p>
        </div>

        {/* CTA */}
        <div className="mt-14 sm:mt-20 text-center">
          <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-6">
            Ready to become a member and create meaningful impact?
          </p>

          <button
            onClick={() => window.scrollTo({ top: 200, behavior: 'smooth' })}
            className="w-full sm:w-auto bg-accent text-primary px-10 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition shadow-lg shadow-accent/10"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
