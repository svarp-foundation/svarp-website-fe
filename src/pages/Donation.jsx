import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import { useAuth } from "../context/AuthContext";

const Donation = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user, token, loginWithToken } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    pan_card: "",
    amount: "",
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
        pan_card: user.pan_card || prev.pan_card,
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
      toast.error("Amount must be greater than 0");
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
        toast.error("Razorpay SDK failed to load. Are you online?");
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
        order_id: orderData.razorpay_order_id,
        handler: async function (response) {
          try {
            // 3. Verify Payment
            toast.info("Payment successful! Verifying...");

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

            toast.success("Thank you for your donation!");

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
                pan_card: user?.pan_card || "",
                amount: "",
              });
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.error(error.message || "Failed to verify donation.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone_number,
        },
        theme: {
          color: "#4ADE80",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        toast.error(`Payment failed: ${response.error.description}`);
      });

      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-xl shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
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
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1"
                placeholder="+91 9876543210"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="pan_card"
                className="block text-sm font-medium text-gray-700"
              >
                PAN Card Number (Optional)
              </label>
              <input
                id="pan_card"
                name="pan_card"
                type="text"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm mt-1 uppercase"
                placeholder="ABCDE1234F"
                value={formData.pan_card}
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
                  placeholder="1000"
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
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Processing..." : "Donate"}
              {!loading && (
                <svg
                  className="ml-2 -mr-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
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
