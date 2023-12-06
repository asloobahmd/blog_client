import axios from "axios";
import React, { createContext, FC, useEffect, useState } from "react";
import { loginformData } from "../types/types";

type userObj = {
  id: string;
  username: string;
  email: string;
};

export type AuthContextProps = {
  currentUser: userObj | null;
  setCurrentuser: (user: userObj | null) => void;
  login: (data: loginformData) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  setCurrentuser: () => {},
  login: () => {},
  logout: () => {},
});

const storedUserData = localStorage.getItem("user");
const storedUser: userObj | null = storedUserData
  ? (JSON.parse(storedUserData) as userObj)
  : null;

export const AuthContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentuser] = useState<userObj | null>(storedUser);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (userdata: loginformData) => {
    try {
      const res = await axios.post(
        "https://blogts-node-api.onrender.com/auth/login",
        userdata,
        {
          withCredentials: true,
        }
      );
      setCurrentuser(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "https://blogts-node-api.onrender.com/auth/logout",
        {},
        { withCredentials: true }
      );
      setCurrentuser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentuser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
