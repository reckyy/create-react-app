import { useContext } from "react";
import { isLoggedInContext } from "./IsLoggedInContext";

export default function LoginButton() {
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);

  function handleLogin() {
    setIsLoggedIn(isLoggedIn === true ? false : true);
  }

  return (
    <div class="loginbutton">
      <button onClick={handleLogin}>{isLoggedIn ? "logout" : "login"}</button>
    </div>
  );
}
