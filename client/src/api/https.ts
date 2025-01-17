import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken, removeToken } from "@/store/authStore";

const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 30000;

const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken() ? getToken() : "",
    },
    withCredentials: true,
    ...config,
  });

  // Authorization
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 & 에러 처리
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // 로그인 예외 처리
      if (error.response.status === 401 || error.response.status === 400) {
        removeToken();
        window.location.href = "/login";
        return;
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();

// 공통 요청
type TRequestMethod = "get" | "post" | "patch" | "delete";

export const requestHandler = async <T>(
  method: TRequestMethod,
  url: string,
  payload?: T
) => {
  let response: AxiosResponse<T>;

  switch (method) {
    case "post":
      response = await httpClient.post(url, payload);
      break;
    case "get":
      response = await httpClient.get(url);
      break;
    case "patch":
      response = await httpClient.patch(url, payload);
      break;
    case "delete":
      response = await httpClient.delete(url);
      break;
    default:
      throw new Error(`${method} methods that are not supported`);
  }
  return response.data;
};
