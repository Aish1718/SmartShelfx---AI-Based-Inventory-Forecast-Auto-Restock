import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);

  // Save user & token in local storage
  const saveAuth = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwt);
  };

  const login = async (email, password) => {
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      saveAuth(data.user, data.token);

      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
  };

  // Authorized fetch helper
  const authFetch = async (url, options = {}) => {
    if (!token) throw new Error("Not authenticated");

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return {
    user,
    token,
    loading,
    login,
    logout,
    authFetch,
    isAuthenticated: !!token,
  };
}
