import axios, { AxiosInstance } from "axios";
import { getSessionToken } from "../src/libs/session-manager";

export const httpClient = (): AxiosInstance => {
  const token: string | null = getSessionToken();
  return axios.create({
    baseURL: "http://localhost:3000",
    timeout: 2000,
    headers: { Authorization: `Bearer ${token}` },
  });
};
