/* eslint-disable no-param-reassign */
import { authStorage } from "@/storage/authStorage";
import { message } from "antd";
import axios, { AxiosInstance } from "axios";

const requestApi = (configuration: any = {}): AxiosInstance => {
  const tokenUser = authStorage.getUserProfile()
    ? JSON.parse(authStorage.getUserProfile() || "").token
    : undefined;

  let headers = {
    "Content-Type": "application/json",
    ...configuration.headers,
  };
  let baseURL = process.env.NEXT_PUBLIC_API_URL;

  let initAxios = {
    baseURL,
    timeout: 10000,
    headers,
    ...configuration,
  };

  const axiosInstance = axios.create(initAxios);

  axiosInstance.interceptors.request.use(
    async (config) => {
      if (tokenUser) {
        config.headers.Authorization = `Bearer ${tokenUser}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 503) {
        message.error(
          "Hệ thống đang bảo trì, bạn vui lòng chờ trong giây lát!",
        );
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export default requestApi;
