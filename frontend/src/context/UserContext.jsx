import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  let [userData, setUserData] = useState("");
  let { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
  if (!serverUrl) return; // Logic check: serverUrl na ho toh request mat bhejo

  try {
    let result = await axios.get(`${serverUrl}/api/auth/profile`, {
      withCredentials: true,
    });
    setUserData(result.data);
  } catch (error) {
    // Agar status 401 hai toh user logged in nahi hai, ye expected hai
    if (error.response && error.response.status === 401) {
      console.log("ℹ️ User not authenticated (Logged out state)");
    } else {
      console.log("❌ Actual fetching error:", error);
    }
    setUserData(null);
  }
};

  useEffect(() => {
    getCurrentUser();
  }, [serverUrl]);

  let value = {
    userData,
    setUserData,
    getCurrentUser,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;