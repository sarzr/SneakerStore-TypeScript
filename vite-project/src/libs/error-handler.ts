import { removeSessionToken } from "./session-manager";
import { toast } from "./toast";

export const errorHandler = (error: IErrorHandler): void => {
  const message: string[] = error.response?.data?.message;

  if (typeof message === "string") {
    toast(message);
  } else if (Array.isArray(message)) {
    for (const msg of message) {
      toast(msg);
    }
  }
  const statusCode: number = Number(error.response?.data?.statusCode || 0);
  if (statusCode === 403) {
    removeSessionToken();
    toast("login again...");
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  }
};
