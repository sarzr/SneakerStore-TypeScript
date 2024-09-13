import { httpClient } from "../client";
import { urls } from "../urls";
import { IAuthData, IFormData } from "../../src/types/main";

export async function login(data: IAuthData): Promise<IFormData> {
  const response = await httpClient().post<IFormData>(urls.auth.login, data);
  console.log(response.data);
  return response.data;
}

export async function signup(data: IAuthData): Promise<IFormData> {
  const response = await httpClient().post<IFormData>(urls.auth.signup, data);
  return response.data;
}
