import { IAuthData } from "../../src/types/main";
import { httpClient } from "../client";
import { urls } from "../urls";

export async function login(data: IAuthData) {
  const response = await httpClient().post(urls.auth.login, data);
  console.log(response.data);
  return response.data;
}

export async function signup(data: IAuthData) {
  const response = await httpClient().post(urls.auth.signup, data);
  return response.data;
}
