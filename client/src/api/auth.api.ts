import { IJoinInfo } from "../pages/Join";
import { httpClient } from "./https";

export const signUp = async (userData: IJoinInfo) => {
  const response = await httpClient.post("/users/join", userData);

  return response.data;
};

export const resetRequest = async (userData: IJoinInfo) => {
  const response = await httpClient.post("/users/reset", userData);

  return response.data;
};

export const resetPassword = async (userData: IJoinInfo) => {
  const response = await httpClient.patch("/users/reset", userData);

  return response.data;
};

interface ILoginResponse {
  token: string;
}

export const login = async (userData: IJoinInfo) => {
  const response = await httpClient.post<ILoginResponse>(
    "/users/login",
    userData
  );

  return response.data;
};
