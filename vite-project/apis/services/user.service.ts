import { httpClient } from "../client";
import { urls } from "../urls";
import { IGetUser } from "../../src/types/main";

export async function getUser(): Promise<IGetUser> {
  const response = await httpClient().get<IGetUser>(urls.user);
  return response.data;
}

export async function deleteUser(): Promise<IGetUser> {
  const response = await httpClient().delete<IGetUser>(urls.user);
  return response.data;
}
