import { useState } from "react";
import { createContext } from "react";

export const loggedInContext = createContext();

export default function LoggedInProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <loggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </loggedInContext.Provider>
  );
}
