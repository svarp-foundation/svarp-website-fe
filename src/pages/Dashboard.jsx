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
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen bg-muted py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-lg flex max-lg:flex-col max-lg:gap-4 lg:justify-between lg:items-center">
          <div>
            <h1 className="text-3xl max-lg:text-2xl font-bold text-primary flex items-center gap-3">
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
        <div className="bg-white rounded-3xl p-8 shadow-lg border-l-8 border-accent">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Membership Details
          </h2>

          <div className="grid md:grid-cols-3 gap-2 max-md:gap-4">
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
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-6">
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
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-primary mb-6">
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

        <div className="bg-white rounded-3xl p-8 shadow-lg flex max-lg:flex-col max-lg:gap-4 lg:justify-between lg:items-center">
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

  const disabledClass = "bg-gray-100 text-gray-500 cursor-not-allowed";

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
    <div className="bg-white rounded-3xl p-8 shadow-lg border-t-8 border-primary">
      <h2 className="text-2xl font-semibold text-primary mb-2">
        Profile Details
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Please complete all mandatory fields and upload required documents
        before applying for a membership plan.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Details Section */}
        <div className="bg-gray-50 p-6 rounded-2xl space-y-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
            Personal Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                disabled={isFullNameFilled}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border ${isFullNameFilled ? disabledClass : ""}`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={userData.email || ""}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm p-3 border text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number *
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                disabled={isPhoneFilled}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border ${isPhoneFilled ? disabledClass : ""}`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth *
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                disabled={isDobFilled}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border ${isDobFilled ? disabledClass : ""}`}
                required
              />
            </div>
          </div>
        </div>

        {/* Address Details Section */}
        <div className="bg-gray-50 p-6 rounded-2xl space-y-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
            Address Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={isAddressFilled}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border ${isAddressFilled ? disabledClass : ""}`}
                placeholder="Street address, apartment, building, etc."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={isCityFilled}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border ${isCityFilled ? disabledClass : ""}`}
                placeholder="Ex: Mumbai"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                disabled={isStateFilled}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border ${isStateFilled ? disabledClass : ""}`}
                placeholder="Ex: Maharashtra"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pincode *
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                disabled={isPincodeFilled}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border ${isPincodeFilled ? disabledClass : ""}`}
                placeholder="Ex: 400001"
                required
                maxLength={6}
              />
            </div>
          </div>
        </div>

        {/* Identity & Documents Section */}
        <div className="bg-gray-50 p-6 rounded-2xl space-y-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
            Identity & Documents
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Government ID Type *
              </label>
              <select
                name="government_id_type"
                value={formData.government_id_type}
                onChange={handleChange}
                disabled={isGovIdTypeFilled}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border ${isGovIdTypeFilled ? disabledClass : "bg-white"}`}
                required
              >
                <option value="">Select ID Type</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Aadhaar Card">Aadhaar Card</option>
                <option value="Passport">Passport</option>
              </select>
            </div>

            {formData.government_id_type && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {formData.government_id_type} Number *
                </label>
                <input
                  type="text"
                  name="government_id_number"
                  value={formData.government_id_number}
                  onChange={handleChange}
                  disabled={isGovIdNumFilled}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border ${isGovIdNumFilled ? disabledClass : ""}`}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Government ID{" "}
                {formData.government_id_path ? "(Uploaded)" : "*"}
              </label>
              <p className="text-xs text-gray-500 mb-1">
                PDF or image format, min 2MB
              </p>
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => handleFileChange(e, setGovIdFile)}
                disabled={isGovIdPathFilled}
                className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-accent hover:file:text-primary transition ${isGovIdPathFilled ? "opacity-50 cursor-not-allowed" : ""}`}
                required={!formData.government_id_path}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture / Photograph{" "}
                {formData.profile_picture_path ? "(Uploaded)" : "*"}
              </label>
              <p className="text-xs text-gray-500 mb-1">Image format only</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setProfilePicFile)}
                disabled={isProfilePicFilled}
                className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-accent hover:file:text-primary transition ${isProfilePicFilled ? "opacity-50 cursor-not-allowed" : ""}`}
                required={!formData.profile_picture_path}
              />
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="bg-gray-50 p-6 rounded-2xl space-y-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
            Additional Information
          </h3>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="is_student"
              checked={formData.is_student}
              onChange={handleChange}
              disabled={isStudentFilled}
              className={`h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded ${isStudentFilled ? "cursor-not-allowed" : ""}`}
              id="student_checkbox"
            />
            <label
              htmlFor="student_checkbox"
              className="ml-2 block text-sm text-gray-900"
            >
              Applying for Student Membership
            </label>
          </div>

          {formData.is_student && (
            <div className="grid md:grid-cols-2 gap-6 pl-6 border-l-2 border-primary">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Student ID{" "}
                  {formData.student_id_path ? "(Uploaded)" : "*"}
                </label>
                <p className="text-xs text-gray-500 mb-1">
                  PDF or image format, min 2MB
                </p>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) => handleFileChange(e, setStudentIdFile)}
                  disabled={isStudentIdPathFilled}
                  className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-accent hover:file:text-primary transition ${isStudentIdPathFilled ? "opacity-50 cursor-not-allowed" : ""}`}
                  required={formData.is_student && !formData.student_id_path}
                />
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                GST Number (if applicable)
              </label>
              <input
                type="text"
                name="gst_number"
                value={formData.gst_number}
                onChange={handleChange}
                disabled={isGstFilled}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border ${isGstFilled ? disabledClass : ""}`}
                placeholder="Ex: 22AAAAA0000A1Z5"
              />
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        {showSubmitSection && (
          <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
            <h3 className="text-lg font-medium text-yellow-800 mb-4">
              Mandatory Disclaimer *
            </h3>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="disclaimer"
                  name="disclaimer"
                  type="checkbox"
                  checked={disclaimerConfirmed}
                  onChange={(e) => setDisclaimerConfirmed(e.target.checked)}
                  className="focus:ring-yellow-500 h-5 w-5 text-yellow-600 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="disclaimer"
                  className="font-medium text-gray-700 cursor-pointer"
                >
                  I confirm the following Terms and Conditions:
                </label>
                <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
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

        {showSubmitSection && (
          <div className="pt-4 border-t">
            <button
              type="submit"
              disabled={loading || !disclaimerConfirmed}
              className="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
            >
              {loading
                ? "Submitting Application..."
                : isPartiallySubmitted
                  ? "Update Details"
                  : "Save Application Details"}
            </button>
            {message && (
              <div
                className={`mt-4 p-4 rounded-xl ${message.includes("success") ? "bg-green-50 text-green-800 border-green-200 border" : "bg-red-50 text-red-800 border-red-200 border"}`}
              >
                {message}
              </div>
            )}
          </div>
        )}
        {!showSubmitSection && (
          <div className="pt-4 border-t">
            <div className="bg-green-50 text-green-800 border-green-200 border mt-4 p-4 rounded-xl font-medium">
              Your application details are fully submitted and are under review.
              They cannot be modified.
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
