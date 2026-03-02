import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from "@/stores/authStore";

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve();
    }
  });

  failedQueue = [];
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const originalRequest = error.config as RetryRequestConfig;
  if (!originalRequest) return Promise.reject(error);

  if (
    originalRequest.url === "/auth/login" ||
    originalRequest.url === "/auth/signup"
  ) {
    return Promise.reject(error);
  }

  if (error.response?.status === 401 && originalRequest.url !== "/refresh") {
    if (!originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });

        return client(originalRequest);
      }

      isRefreshing = true;
      try {
        await client.get("auth/refresh");

        processQueue(null);

        return client(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  }

  // Global safety net: any 401 that wasn't fixed above means session is dead
  if (error.response?.status === 401) {
    useAuthStore.getState().logout();
    window.location.href = "/auth";
  }

  return Promise.reject(error);
};

const client = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

client.interceptors.response.use((response) => response, onResponseError);

export default client;
