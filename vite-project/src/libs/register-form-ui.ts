const iconLock: HTMLElement = document.querySelector(".fa-lock") as HTMLElement;
const iconEnvelope: HTMLElement = document.querySelector(
  ".fa-envelope"
) as HTMLElement;
const iconEyeSlash: HTMLElement = document.querySelector(
  ".fa-eye-slash"
) as HTMLElement;
const inputUsername: HTMLInputElement = document.getElementById(
  "inputUsername"
) as HTMLInputElement;
const inputPassword: HTMLInputElement = document.getElementById(
  "inputPassword"
) as HTMLInputElement;
const Submit: HTMLButtonElement = document.getElementById(
  "Submit"
) as HTMLButtonElement;

inputUsername.addEventListener(
  "click",
  () => (iconEnvelope.style.color = "#000")
);
inputPassword.addEventListener("click", () => (iconLock.style.color = "#000"));
inputPassword.addEventListener(
  "click",
  () => (iconEyeSlash.style.color = "#000")
);

iconEyeSlash.addEventListener("click", () => {
  if (inputPassword.type === "password") {
    inputPassword.type = "text";
    iconEyeSlash.classList.remove("fa-eye-slash");
    iconEyeSlash.classList.add("fa-eye");
  } else {
    inputPassword.type = "password";
    iconEyeSlash.classList.remove("fa-eye");
    iconEyeSlash.classList.add("fa-eye-slash");
  }
});

function checkInputs(): void {
  const username: string = inputUsername.value;
  const password: string = inputPassword.value;

  if (username && password) {
    Submit.style.backgroundColor = "#212529";
  } else {
    Submit.style.backgroundColor = "#6E7174";
  }
}

inputUsername.addEventListener("input", checkInputs);
inputPassword.addEventListener("input", checkInputs);
