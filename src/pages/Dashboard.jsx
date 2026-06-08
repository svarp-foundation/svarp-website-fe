import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
          },
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          // If token invalid
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

  if (loading)
    return (
      <div className="min-h-dvh flex items-center justify-center">
        Loading...
      </div>
    );
  if (!userData) return null;

  const membership = userData.membership;
  const planName = membership ? membership.plan.name : "No Active Membership";
  const status = membership && membership.is_active ? "Active" : "Inactive";
  const expiryDate =
    membership && membership.end_date
      ? new Date(membership.end_date).toLocaleDateString()
      : "N/A";
  const isLifetime = membership && !membership.end_date && membership.is_active;

  return (
    <div className="min-h-dvh bg-muted py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mt-12 sm:mt-12">
      <div className="max-w-4xl mx-auto space-y-5 sm:space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg flex max-lg:flex-col max-lg:gap-3 lg:justify-between lg:items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl max-lg:text-xl font-bold text-primary flex items-center gap-2 sm:gap-3 flex-wrap">
              Hello, {userData.full_name}!
              {!userData.is_active && (
                <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full border border-red-200 animate-pulse font-bold uppercase tracking-wider">
                  ⚠️ Suspended
                </span>
              )}
            </h1>
            <p className="text-gray-500 mt-1">
              {userData.is_active
                ? "Welcome to your dashboard."
                : "Your account access is currently restricted."}
            </p>
          </div>
        </div>

        {/* Membership Status Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg border-l-4 sm:border-l-8 border-accent">
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4 sm:mb-6">
            Membership Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-md:gap-3">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                Current Plan
              </p>
              <p className="text-xl font-medium text-gray-900 mt-1">
                {planName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                Status
              </p>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                  status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                Valid Until
              </p>
              <p className="text-xl font-medium text-gray-900 mt-1">
                {isLifetime ? "Lifetime Access" : expiryDate}
              </p>
            </div>
          </div>

          {!membership && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate("/membership")}
                className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition"
              >
                Browse Plans
              </button>
            </div>
          )}
        </div>

        {/* Profile Details Form */}
        <ProfileForm userData={userData} token={token} />

        {/* Recent Transactions (Optional/If data exists) */}
        {userData.transactions && userData.transactions.length > 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4 sm:mb-6">
              Transaction History
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{tx.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            tx.status === "success"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
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
          </div>
        )}

        {/* My Donations (Optional/If data exists) */}
        {userData.donations && userData.donations.length > 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4 sm:mb-6">
              My Donations
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.donations.map((donation) => (
                    <tr key={donation.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(donation.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{donation.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            donation.status === "success"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        {donation.status === "success" && (
                          <a
                            href={`${import.meta.env.VITE_API_BASE_URL}/donations/${donation.id}/certificate`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-green-700 font-medium"
                          >
                            Download Certificate
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg flex max-lg:flex-col max-lg:gap-3 lg:justify-between lg:items-center">
          <button
            onClick={logout}
            className="bg-red-50 text-red-600 px-5 py-2 rounded-full font-medium hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

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

  // Separate states for file uploads
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

  // Track if any changes have been made to the form relative to saved userData
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

  // Calculate completeness score for the progress bar
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

  const disabledInputClass = "mt-1 block w-full rounded-xl border-gray-200 bg-gray-50/70 text-gray-500 cursor-not-allowed sm:text-sm p-3.5 border transition-all";
  const activeInputClass = "mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-primary focus:ring-primary/20 focus:ring-4 sm:text-sm p-3.5 border transition-all bg-white placeholder-gray-400";

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
      },
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

      // Upload files if selected
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
        },
      );

      if (response.ok) {
        setMessage("Application details updated successfully!");
        // Refresh page or details after short timeout
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
    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-lg border-t-8 border-primary relative overflow-hidden">
      
      {/* Form Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b pb-6 border-gray-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            Membership Application Form
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Complete the fields below to verify your profile and qualify for membership.
          </p>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-gray-400 font-semibold block uppercase">Profile Strength</span>
            <span className="text-sm font-bold text-primary">{percentComplete}% Complete</span>
          </div>
          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-accent transition-all duration-500" style={{ width: `${percentComplete}%` }} />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 1. Personal Details Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-primary">Personal Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
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
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={userData.email || ""}
                  disabled
                  className="mt-1 block w-full rounded-xl border-gray-100 bg-gray-50/70 text-gray-400 cursor-not-allowed sm:text-sm p-3.5 border"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" title="Email locked">
                  🔒
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
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
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
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
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Address Details Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-primary">Address & Contact Info</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
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
                  placeholder="Apartment, unit, building, street, etc."
                  required
                />
                {isAddressFilled && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
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
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
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
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
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
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Identity Verification Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.378 0 2.5-1.122 2.5-2.5S10.378 9 9 9" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-primary">Identity Verification</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
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
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" title="Locked & Verified">
                    🔒
                  </span>
                )}
              </div>
            </div>

            {formData.government_id_type && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
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
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" title="Locked & Verified">
                      🔒
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Gov ID File Area */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Upload Government ID Card *
              </label>
              
              {formData.government_id_path ? (
                <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-800">Government ID Uploaded</p>
                      <a
                        href={`${import.meta.env.VITE_API_BASE_URL}${formData.government_id_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline font-semibold flex items-center gap-0.5 mt-0.5"
                      >
                        View File ↗
                      </a>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/40 px-2.5 py-1 rounded-md">
                    Locked
                  </span>
                </div>
              ) : govIdFile ? (
                <div className="flex items-center justify-between p-3.5 bg-blue-50 border border-blue-100 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-800 line-clamp-1">{govIdFile.name}</p>
                      <p className="text-xs text-blue-600">{(govIdFile.size / 1024 / 1024).toFixed(2)} MB • Ready</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGovIdFile(null)}
                    className="text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 px-2.5 py-1.5 rounded-lg transition"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-5 text-center hover:border-primary transition duration-300 bg-gray-50/50 group">
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) => handleFileChange(e, setGovIdFile)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <svg className="w-8 h-8 text-gray-400 group-hover:text-primary mx-auto mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-xs font-semibold text-gray-700">Click to upload ID Card</p>
                  <p className="text-[10px] text-gray-400 mt-1">PDF or Image, max 5MB</p>
                </div>
              )}
            </div>

            {/* Profile Pic Upload Area */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Profile Photo (Passport size) *
              </label>

              {formData.profile_picture_path ? (
                <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-emerald-200 overflow-hidden shadow-sm flex-shrink-0">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${formData.profile_picture_path}`}
                        alt="Profile Pic"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-800">Photograph Uploaded</p>
                      <a
                        href={`${import.meta.env.VITE_API_BASE_URL}${formData.profile_picture_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline font-semibold flex items-center gap-0.5 mt-0.5"
                      >
                        View Photo ↗
                      </a>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/40 px-2.5 py-1 rounded-md">
                    Locked
                  </span>
                </div>
              ) : profilePicFile ? (
                <div className="flex items-center justify-between p-3.5 bg-blue-50 border border-blue-100 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-blue-200 overflow-hidden shadow-sm flex-shrink-0 bg-blue-50">
                      <img
                        src={URL.createObjectURL(profilePicFile)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-800 line-clamp-1">{profilePicFile.name}</p>
                      <p className="text-xs text-blue-600">{(profilePicFile.size / 1024 / 1024).toFixed(2)} MB • Ready</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setProfilePicFile(null)}
                    className="text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 px-2.5 py-1.5 rounded-lg transition"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-5 text-center hover:border-primary transition duration-300 bg-gray-50/50 group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setProfilePicFile)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <svg className="w-8 h-8 text-gray-400 group-hover:text-primary mx-auto mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs font-semibold text-gray-700">Click to upload photo</p>
                  <p className="text-[10px] text-gray-400 mt-1">Image format only, max 3MB</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Additional Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-primary">Additional Information</h3>
          </div>

          <div className="space-y-5">
            {/* Student Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  type="checkbox"
                  name="is_student"
                  checked={formData.is_student}
                  onChange={handleChange}
                  disabled={isStudentFilled}
                  className="h-5 w-5 text-primary focus:ring-primary/25 border-gray-300 rounded-lg transition"
                  id="student_checkbox"
                />
              </div>
              <label
                htmlFor="student_checkbox"
                className="ml-3 text-sm font-semibold text-gray-700 cursor-pointer"
              >
                I am applying for a Student Membership discount
                <p className="text-xs text-gray-400 font-normal mt-0.5">
                  Requires loading a valid College or School Identification Card for verification.
                </p>
              </label>
            </div>

            {/* Conditional Student ID Upload */}
            {formData.is_student && (
              <div className="pl-6 border-l-2 border-primary mt-4 space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Upload Student ID Card *
                </label>

                {formData.student_id_path ? (
                  <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl max-w-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-emerald-800">Student ID Uploaded</p>
                        <a
                          href={`${import.meta.env.VITE_API_BASE_URL}${formData.student_id_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline font-semibold flex items-center gap-0.5 mt-0.5"
                        >
                          View Student ID ↗
                        </a>
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/40 px-2.5 py-1 rounded-md">
                      Locked
                    </span>
                  </div>
                ) : studentIdFile ? (
                  <div className="flex items-center justify-between p-3.5 bg-blue-50 border border-blue-100 rounded-2xl max-w-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-blue-800 line-clamp-1">{studentIdFile.name}</p>
                        <p className="text-xs text-blue-600">{(studentIdFile.size / 1024 / 1024).toFixed(2)} MB • Ready</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStudentIdFile(null)}
                      className="text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 px-2.5 py-1.5 rounded-lg transition"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-5 text-center hover:border-primary transition duration-300 bg-gray-50/50 group max-w-md">
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) => handleFileChange(e, setStudentIdFile)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required={formData.is_student && !formData.student_id_path}
                    />
                    <svg className="w-8 h-8 text-gray-400 group-hover:text-primary mx-auto mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-xs font-semibold text-gray-700">Click to upload Student ID</p>
                    <p className="text-[10px] text-gray-400 mt-1">PDF or image, max 4MB</p>
                  </div>
                )}
              </div>
            )}

            {/* GST Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  GST Number (if applicable)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="gst_number"
                    value={formData.gst_number}
                    onChange={handleChange}
                    disabled={isGstFilled}
                    className={isGstFilled ? disabledInputClass : activeInputClass}
                    placeholder="Ex: 22AAAAA0000A1Z5"
                  />
                  {isGstFilled && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" title="Locked & Verified">
                      🔒
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Disclaimer Checkbox */}
        {showSubmitSection && (
          <div className="bg-yellow-50/50 border border-yellow-200/80 p-5 sm:p-6 rounded-2xl space-y-4">
            <h3 className="text-md font-bold text-yellow-800 flex items-center gap-2">
              ⚠️ Mandatory Terms & Affirmation
            </h3>
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id="disclaimer"
                  name="disclaimer"
                  type="checkbox"
                  checked={disclaimerConfirmed}
                  onChange={(e) => setDisclaimerConfirmed(e.target.checked)}
                  className="focus:ring-yellow-500 h-5 w-5 text-yellow-600 border-gray-300 rounded-lg cursor-pointer transition"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="disclaimer"
                  className="font-bold text-gray-800 cursor-pointer block"
                >
                  I confirm that all application details are correct
                </label>
                <ul className="list-disc pl-5 mt-2 text-xs text-gray-600 space-y-1.5">
                  <li>
                    The applicant confirms that all information and documents
                    submitted are true and accurate.
                  </li>
                  <li>
                    In case of any discrepancy, false information, or invalid
                    documents, the membership may be terminated without any
                    prior notice.
                  </li>
                  <li>
                    The organization reserves the right to verify submitted
                    documents at any time.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Submit Actions / Locked Info Banner */}
        {showSubmitSection ? (
          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading || !disclaimerConfirmed}
              className="w-full sm:w-auto bg-primary text-white border border-transparent hover:bg-white hover:text-primary hover:border-primary px-8 py-3.5 rounded-full font-medium shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {loading
                ? "Uploading & Submitting..."
                : isPartiallySubmitted
                  ? "Update Details"
                  : "Save Application Details"}
            </button>
            
            {message && (
              <div
                className={`mt-4 p-4 rounded-xl text-sm font-semibold border ${
                  message.includes("successfully") 
                    ? "bg-green-50 text-green-800 border-green-200" 
                    : "bg-red-50 text-red-800 border-red-200"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        ) : (
          <div className="pt-6 border-t border-gray-100">
            <div className="bg-emerald-50 text-emerald-800 border-emerald-100 border p-5 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-sm text-emerald-900">Application Submitted & Verified</p>
                <p className="text-xs text-emerald-700/95 mt-0.5 leading-relaxed">
                  Your profile details have been successfully uploaded and locked. Our administration team has verified your records. You are ready to subscribe or upgrade your memberships.
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
