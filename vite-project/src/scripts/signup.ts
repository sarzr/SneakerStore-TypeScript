import { signup } from "../../apis/services/auth.service";
import { errorHandler } from "../libs/error-handler";
import { setSessionToken } from "../libs/session-manager";
import { toast } from "../libs/toast";
import { IErrorHandler, IFormData } from "../types/main";

const signupForm = document.getElementById("signup-form") as HTMLFormElement;
const inputPassword = document.getElementById(
  "inputPassword"
) as HTMLInputElement;
const inputUsername = document.getElementById(
  "inputUsername"
) as HTMLInputElement;

signupForm.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();
  const usernameValue: string = inputUsername.value;
  const passwordValue: string = inputPassword.value;

  try {
    const response: IFormData = await signup({
      username: usernameValue,
      password: passwordValue,
    });
    console.log(response);

    toast("Signed in", "success");
    setSessionToken(response.token);
    setTimeout(() => {
      window.location.href = "/home";
    }, 3000);
  } catch (error) {
    errorHandler(error as IErrorHandler);
  }
});
