import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async (authToken) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/token`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Login failed");
    }

    const data = await response.json();
    const accessToken = data.access_token;
    localStorage.setItem("token", accessToken);
    setToken(accessToken);
    // User will be fetched by useEffect
  };

  const register = async (email, password, role = "consumer") => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Registration failed");
    }

    // Auto login after register
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
