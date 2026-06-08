import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await login(email, password);
      console.log("Logged in user:", user);

      if (user && user.role === "admin") {
        navigate("/admin");
      } else if (user) {
        setError("Access denied: You are not authorized as an admin.");
      } else {
        setError("Invalid credentials or access denied");
      }
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-muted font-sans p-5">
      <div className="w-full max-w-md bg-white rounded-3xl p-10 border border-slate-200 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold mb-2 text-accent">
            Admin Portal
          </h1>
          <p className="text-slate-500 text-sm">
            Sign in to manage SVARP Global
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-primary">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-primary">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-primary outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent text-primary font-bold py-4 rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
