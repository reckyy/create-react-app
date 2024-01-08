import { useState } from "react";
import { createContext } from "react";

export const isLoggedInContext = createContext();

export default function IsLoggedInProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <isLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </isLoggedInContext.Provider>
  );
}
