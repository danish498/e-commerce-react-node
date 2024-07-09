"use client";

import { registerUserApi } from "@/lib/ApiClient";
import { LocalStorage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext({
  currentUser: null,
  isAuth: false,
  login: () => {},
  logout: () => {},
  registerUser: () => {},
});

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  // Function to simulate login (replace with actual API call)
  const login = async (email, password) => {};

  // Function to simulate logout (replace with logic to clear tokens or sessions)
  const logout = () => {};

  // Function to simulate registration (replace with actual API call)
  const registerUser = async (data) => {
    try {
      const response = await registerUserApi({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
      });

      if (response.status) {
        router.push("/home");
      }
      console.log("check the response over here", response);

      LocalStorage.set("userData", response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    // Check for existing authentication on component mount (optional)
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuth, login, logout, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
