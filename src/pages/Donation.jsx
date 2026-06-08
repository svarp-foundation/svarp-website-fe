import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../context/PopupContext";
import { useAuth } from "../context/AuthContext";

const Donation = () => {
  const { showPopup } = usePopup();
  const navigate = useNavigate();
  const { user, token, loginWithToken } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    amount: "500",
  });
  const [activePreset, setActivePreset] = useState("500");
  const [loading, setLoading] = useState(false);

  // Auto-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.full_name || prev.name,
        email: user.email || prev.email,
        phone_number: user.phone_number || prev.phone_number,
      }));
    }
  }, [user]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "amount") {
      const val = e.target.value;
      if (["500", "1000", "2500", "5000"].includes(val)) {
        setActivePreset(val);
      } else {
        setActivePreset("custom");
      }
    }
  };

  const handlePresetClick = (amount) => {
    setActivePreset(amount);
    setFormData((prev) => ({ ...prev, amount }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (parseFloat(formData.amount) <= 0) {
      showPopup("Amount must be greater than 0", "error");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Order via Backend
      const orderResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/donations/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            amount: parseFloat(formData.amount),
          }),
        },
      );

      if (!orderResponse.ok) {
        const errData = await orderResponse.json();
        throw new Error(errData.detail || "Failed to create donation order.");
      }

      const orderData = await orderResponse.json();

      // Load Razorpay Script
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js",
      );

      if (!res) {
        showPopup("Razorpay SDK failed to load. Are you online?", "error");
        setLoading(false);
        return;
      }

      // 2. Initialize Razorpay Options
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: orderData.app_name || "SVARP Global",
        description: `Donation by ${formData.name}`,
        image: "https://www.svarp.org/company/svarp-logo.webp",
        order_id: orderData.razorpay_order_id,
        handler: async function (response) {
          try {
            // 3. Verify Payment
            showPopup("Payment successful! Verifying...", "info");

            const verifyResponse = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/donations/verify`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              },
            );

            if (!verifyResponse.ok) {
              const errData = await verifyResponse.json();
              throw new Error(errData.detail || "Payment verification failed.");
            }

            const verifyData = await verifyResponse.json();

            showPopup("Thank you for your donation!", "success");

            // Auto Login & Redirect
            if (verifyData.access_token) {
              if (!token) {
                loginWithToken(verifyData.access_token);
              }
              navigate("/dashboard");
            } else {
              setFormData({
                name: user?.full_name || "",
                email: user?.email || "",
                phone_number: user?.phone_number || "",
                amount: "500",
              });
              setActivePreset("500");
            }
          } catch (error) {
            console.error("Verification error:", error);
            showPopup(error.message || "Failed to verify donation.", "error");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone_number,
        },
        theme: {
          color: "#1f3b45",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        showPopup(`Payment failed: ${response.error.description}`, "error");
      });

      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      showPopup(error.message || "An error occurred during payment.", "error");
    } finally {
      setLoading(false);
    }
  };

  const causes = [
    {
      icon: "🚗",
      title: "Community Road Safety",
      desc: "Funding emergency road drills, warning markers, and local safety booklets.",
    },
    {
      icon: "🌱",
      title: "School Eco-Clubs",
      desc: "Delivering sustainability toolkits and recycling resource boxes to youth centers.",
    },
    {
      icon: "🤝",
      title: "Empowerment & Livelihood",
      desc: "Providing adaptive safety courses and startup resources to local communities.",
    },
  ];

  return (
    <div className="min-h-dvh pt-24 sm:pt-32 pb-16 bg-muted px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Visual Depth Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9bcf9b]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1f3b45]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          
          {/* Left Column: Causes Overview (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              <div>
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase bg-muted px-4 py-1.5 rounded-full inline-block mb-3">
                  Support Our Mission
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                  Empower Change
                </h1>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  Your donations fund grassroots programs that foster environmental sustainability and safety awareness across local communities.
                </p>
              </div>

              {/* List of Causes */}
              <div className="space-y-4 pt-4 border-t border-gray-50">
                {causes.map((c, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center shrink-0 text-lg">
                      {c.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-primary">{c.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Donation Form Container (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-6">Enter Donation Details</h2>
              
              <form onSubmit={handlePayment} className="space-y-5">
                <div className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="block w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-sm transition"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        className="block w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-sm transition"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        name="phone_number"
                        type="tel"
                        required
                        className="block w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white text-sm transition"
                        placeholder="+91 99999 88888"
                        value={formData.phone_number}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Quick Preset Amount Selector */}
                  <div>
                    <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">
                      Select Amount (INR)
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {["500", "1000", "2500", "5000"].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handlePresetClick(amt)}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                            activePreset === amt
                              ? "bg-primary text-white border-transparent shadow-sm"
                              : "bg-slate-50 text-gray-600 border-gray-200 hover:bg-slate-100"
                          }`}
                        >
                          ₹{amt}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => handlePresetClick("custom")}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          activePreset === "custom"
                            ? "bg-primary text-white border-transparent shadow-sm"
                            : "bg-slate-50 text-gray-600 border-gray-200 hover:bg-slate-100"
                        }`}
                      >
                        Custom
                      </button>
                    </div>
                  </div>

                  {/* Amount Value Input Box */}
                  <div>
                    <label className="block text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                      Donation Value
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 font-semibold text-sm">
                        ₹
                      </div>
                      <input
                        type="number"
                        name="amount"
                        required
                        min="1"
                        disabled={activePreset !== "custom"}
                        className={`block w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-sm transition ${
                          activePreset !== "custom" ? "bg-slate-100 text-gray-500 cursor-not-allowed" : "bg-slate-50"
                        }`}
                        value={formData.amount}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Important Guidelines box */}
                <div className="bg-slate-50 border-l-4 border-accent p-4 rounded-xl text-xs text-primary/80 space-y-2">
                  <h4 className="font-bold text-primary uppercase tracking-wider text-[10px]">
                    Information Guidelines
                  </h4>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Do not close the page or reload during the verification spinner.</li>
                    <li>A safety certificate is generated and logged inside your Dashboard immediately.</li>
                    <li>If you don't have an account, one is generated using your email with password "svarp".</li>
                  </ul>
                </div>

                {/* Donate CTA button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center py-3.5 px-4 bg-primary text-white text-sm font-bold rounded-xl hover:bg-accent hover:text-primary transition-all duration-200 shadow-md disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Initiating Transaction...
                      </>
                    ) : (
                      "Donate Now"
                    )}
                  </button>
                  <p className="mt-3 text-center text-[10px] text-gray-400 flex items-center justify-center gap-1 font-semibold uppercase tracking-wider">
                    🔒 Payments are safely processed via Razorpay SDK
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Donation;
