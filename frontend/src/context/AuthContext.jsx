import React, { createContext } from "react";

export const authDataContext = createContext();

function AuthContext({ children }) {
  let serverUrl = "https://ai-career-backend-3sbg.vercel.app";

  let value = {
    serverUrl,
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
