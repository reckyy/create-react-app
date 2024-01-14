import { useContext } from "react";
import { loggedInContext } from "./LoggedInContext";

export default function LoginButton() {
  const { loggedIn, setLoggedIn } = useContext(loggedInContext);

  function handleLogin() {
    setLoggedIn(!loggedIn);
  }

  return (
    <div class="loginbutton">
      <button onClick={handleLogin}>{loggedIn ? "logout" : "login"}</button>
    </div>
  );
}
