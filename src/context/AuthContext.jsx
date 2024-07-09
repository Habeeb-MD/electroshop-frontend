import { createContext, useEffect, useState } from "react";
import { getUser, logout } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const userData = await getUser();
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout: logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
