import React, { useState, useEffect } from "react";
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
        name: orderData.app_name || "SVARP",
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

  return (
    <div className="min-h-screen pt-24 bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 md:bg-white p-10 max-md:p-2 rounded-xl md:shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Support Our Cause
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your generous donation helps us make a difference. Thank you for
            your support.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handlePayment}>
          <div className="rounded-md shadow-sm space-y-4 text-left">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1"
                // placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1"
                // placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Donation Amount (INR)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  required
                  min="1"
                  className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md text-sm text-blue-800">
            <h4 className="font-medium text-blue-900 mb-1">
              Important Guidelines
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Please do not refresh or close the browser window while the
                transaction is processing.
              </li>
              <li>
                Ensure your internet connection is stable before initiating
                payment.
              </li>
              <li>
                A digital certificate will be generated upon successful payment
                and will be available in your account dashboard. If you do not
                already have an account, one will be automatically created using
                the email address provided during payment.
              </li>
              <li>
                The default password for first-time login will be "svarp". For
                security reasons, we strongly recommend changing your password
                after logging in for the first time.
              </li>
            </ul>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-bold rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Processing..." : "Donate"}
            </button>
            <p className="mt-3 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
              Payments are securely processed via Razorpay.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Donation;
