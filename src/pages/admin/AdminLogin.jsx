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
    <div className="min-h-dvh flex items-center justify-center bg-muted font-sans p-4">
      <div className="w-full max-w-sm bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="text-center mb-5 flex flex-col items-center">
          <img
            src="/company/svarp-logo.webp"
            alt="SVARP Global Logo"
            className="h-14 w-auto object-contain mb-2.5"
          />
          <h1 className="text-base font-bold text-primary mb-0.5">
            Admin Portal
          </h1>
          <p className="text-slate-500 text-[10px]">
            Sign in to manage SVARP Global
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-primary">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-primary outline-none focus:border-accent transition-all"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-primary">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-primary outline-none focus:border-accent transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-[10px] p-2 rounded border border-red-100 font-bold">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white font-bold py-2 rounded-lg text-xs hover:bg-slate-900 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-center"
          >
            {isLoading ? "Signing in..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
