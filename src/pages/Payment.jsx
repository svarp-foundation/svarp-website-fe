import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePopup } from "../context/PopupContext";

export default function Payment() {
  const { state } = useLocation();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { showPopup } = usePopup();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pan_card: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const taxRate = import.meta.env.VITE_TAX_RATE
    ? parseFloat(import.meta.env.VITE_TAX_RATE)
    : 18;
  const taxAmount = state?.plan?.price ? (state.plan.price * taxRate) / 100 : 0;
  const totalAmount = state?.plan?.price ? state.plan.price + taxAmount : 0;

  const isDisabledName = !!user?.full_name;
  const isDisabledPhone = !!user?.phone_number;
  const isDisabledPan = !!(
    user?.government_id_number ||
    user?.pan_card ||
    user?.adhaar_card
  );
  const isDisabledAddress = !!user?.address;
  const isDisabledCity = !!user?.city;
  const isDisabledState = !!user?.state;
  const isDisabledPincode = !!user?.pincode;
  const disabledClass = "bg-gray-100 text-gray-500 cursor-not-allowed";

  useEffect(() => {
    if (!state?.plan) {
      navigate("/membership");
      return;
    }

    if (user) {
      setFormData({
        name: user.full_name || "",
        email: user.email || "",
        phone: user.phone_number || "",
        pan_card:
          user.government_id_number || user.pan_card || user.adhaar_card || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
      });
    }
  }, [user, state, navigate]);

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

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.pan_card.trim())
      newErrors.pan_card = "Government ID is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.match(/^\d{6}$/))
      newErrors.pincode = "Pincode must be 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    // 1. Update User Profile with billing details (optional, but good for records)
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: formData.name,
          phone_number: formData.phone,
          pan_card: formData.pan_card,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        }),
      });
    } catch (err) {
      console.warn("Failed to save billing details", err);
      // Continue to payment even if save fails? verify
    }

    // 2. Initiate Payment
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!res) {
      showPopup("Razorpay SDK failed to load. Are you online?", "error");
      setLoading(false);
      return;
    }

    try {
      // Create Order
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/memberships/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            membership_id: state.plan.id,
            amount: totalAmount,
            currency: "INR",
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        showPopup(
          `Application failed: ${errorData.detail || "Unknown error"}`,
          "error",
        );
        setLoading(false);
        return;
      }

      const orderData = await response.json();

      const options = {
        key: orderData.key_id,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: orderData.app_name || "SVARP Global",
        description: `Membership: ${state.plan.title}`,
        image: "https://www.svarp.org/company/svarp-logo.webp",
        order_id: orderData.razorpay_order_id,
        handler: async function (response) {
          const verifyPayload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const verifyRes = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/memberships/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(verifyPayload),
              },
            );

            if (verifyRes.ok) {
              navigate("/dashboard");
            } else {
              const errorData = await verifyRes.json();
              showPopup(
                `Payment Verification Failed: ${errorData.detail}`,
                "error",
              );
            }
          } catch (error) {
            console.error("Verification Error", error);
            showPopup(
              "Payment verification failed due to network error.",
              "error",
            );
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#1f3b45",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setLoading(false);
    } catch (error) {
      console.error("Payment error", error);
      showPopup("An error occurred. Please try again.", "error");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!state?.plan) return null;

  return (
    <div className="min-h-dvh bg-muted py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Billing Details Form */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4 sm:mb-6">
            Billing Details
          </h2>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {" "}
                Name{" "}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isDisabledName}
                required
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border ${
                  errors.name ? "border-red-500" : ""
                } ${isDisabledName ? disabledClass : ""}`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {" "}
                Phone{" "}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isDisabledPhone}
                required
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border ${
                  errors.phone ? "border-red-500" : ""
                } ${isDisabledPhone ? disabledClass : ""}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {" "}
                Government ID Number{" "}
              </label>
              <input
                type="text"
                name="pan_card"
                value={formData.pan_card}
                onChange={handleChange}
                disabled={isDisabledPan}
                required
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border ${
                  errors.pan_card ? "border-red-500" : ""
                } ${isDisabledPan ? disabledClass : ""}`}
              />
              {errors.pan_card && (
                <p className="text-red-500 text-xs mt-1">{errors.pan_card}</p>
              )}
            </div>
            {/* Address Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {" "}
                Address{" "}
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={isDisabledAddress}
                required
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border ${
                  errors.address ? "border-red-500" : ""
                } ${isDisabledAddress ? disabledClass : ""}`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {" "}
                  City{" "}
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={isDisabledCity}
                  required
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border ${
                    errors.city ? "border-red-500" : ""
                  } ${isDisabledCity ? disabledClass : ""}`}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {" "}
                  State{" "}
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={isDisabledState}
                  required
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border ${
                    errors.state ? "border-red-500" : ""
                  } ${isDisabledState ? disabledClass : ""}`}
                />
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {" "}
                Pincode{" "}
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                disabled={isDisabledPincode}
                required
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border ${
                  errors.pincode ? "border-red-500" : ""
                } ${isDisabledPincode ? disabledClass : ""}`}
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
              )}
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md text-sm text-blue-800 mt-6">
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
                  Membership benefits will be activated immediately upon
                  successful payment.
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-full font-bold hover:opacity-90 transition mt-6 disabled:opacity-50"
            >
              {loading ? "Processing..." : `PAY`}
            </button>
          </form>
        </div>

        {/* Invoice Summary */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg h-fit">
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4 sm:mb-6">
            Order Summary
          </h2>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex justify-between border-b pb-4">
              <span>Plan</span>
              <span className="font-medium text-gray-900">
                {state.plan.title}
              </span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span>Price</span>
              <span className="font-medium text-gray-900">
                ₹{state.plan.price}
              </span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span>Tax ({taxRate}%)</span>
              <span className="font-medium text-gray-900">
                ₹{taxAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-2 text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-4 rounded-xl text-xs text-blue-800">
            <p className="font-semibold mb-1">Secure Payment</p>
            <p>
              Your payment information is encrypted and processed securely by
              Razorpay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
