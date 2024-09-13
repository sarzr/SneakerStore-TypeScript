import { login } from "../../apis/services/auth.service";
import { errorHandler } from "../libs/error-handler";
import { setSessionToken } from "../libs/session-manager";
import { toast } from "../libs/toast";

const loginForm = document.getElementById("login-form") as HTMLFormElement;
const inputPassword = document.getElementById(
  "inputPassword"
) as HTMLInputElement;
const inputUsername = document.getElementById(
  "inputUsername"
) as HTMLInputElement;

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const usernameValue: string = inputUsername.value;
  const passwordValue: string = inputPassword.value;

  try {
    const response: IFormData = await login({
      username: usernameValue,
      password: passwordValue,
    });
    toast("Logged in", "success");
    setSessionToken(response.token);
    setTimeout(() => {
      window.location.href = "/home";
    }, 3000);
  } catch (error) {
    errorHandler(error);
  }
});
