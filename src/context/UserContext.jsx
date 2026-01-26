import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // 👈 NEW

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setAuthLoading(false); // 👈 done loading
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("userInfo", JSON.stringify(user));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, authLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
