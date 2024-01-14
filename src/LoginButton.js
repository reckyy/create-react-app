import { useLoggedInValue } from "./LoggedInContext";

export default function LoginButton() {
  const { loggedIn, setLoggedIn } = useLoggedInValue();

  function handleLogin() {
    setLoggedIn(!loggedIn);
  }

  return (
    <div class="loginbutton">
      <button onClick={handleLogin}>{loggedIn ? "logout" : "login"}</button>
    </div>
  );
}
