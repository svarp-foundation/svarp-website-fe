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
        <div className="bg-white rounded-3xl p-8 shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Hello, {userData.full_name}!
            </h1>
            <p className="text-gray-500 mt-1">Welcome to your dashboard.</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-50 text-red-600 px-5 py-2 rounded-full font-medium hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>

        {/* Membership Status Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-l-8 border-accent">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Membership Details
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
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
            <div className="mt-8">
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
      </div>
    </div>
  );
}

function ProfileForm({ userData, token }) {
  const [formData, setFormData] = useState({
    full_name: userData.full_name || "",
    phone_number: userData.phone_number || "",
    pan_card: userData.pan_card || "",
    adhaar_card: userData.adhaar_card || "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        setMessage("Profile updated successfully!");
        // Optional: Trigger a refresh of user data or context update
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.detail || "Update failed"}`);
      }
    } catch (error) {
      console.error("Update error", error);
      setMessage("Update failed due to network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-primary mb-6">
        Profile Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              PAN Card
            </label>
            <input
              type="text"
              name="pan_card"
              value={formData.pan_card}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Adhaar Card
            </label>
            <input
              type="text"
              name="adhaar_card"
              value={formData.adhaar_card}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
          {message && (
            <p
              className={`mt-2 text-sm ${
                message.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
