import axios from "axios";
import i18n from "../locale/i18n";
import { store } from "../features/store";

interface contentStructure {
  id: number;
  username: string;
  email: string;
  image?: string;
}

axios.interceptors.request.use((request) => {
  request.headers!["Accept-Language"] = i18n.language;
  const headerValue = store.getState().registration.header;
  if (headerValue) {
    request.headers!["Authorization"] = headerValue;
  }
  return request;
});

export const signUp = (body: any) => {
  return axios.post("/api/1.0/users/", body);
};

export const activate = (token: string) => {
  return axios.post(`/api/1.0/users/token/${token}`);
};

export const loadUsers = (page: number) => {
  return axios.get("/api/1.0/users/", { params: { page, size: 3 } });
};

export const getUserById = (id: string) => {
  return axios.get<contentStructure>(`/api/1.0/users/${id}`);
};

interface loginProps {
  email: string;
  password: string;
}

export const login = (body: loginProps) => {
  return axios.post("/api/1.0/auth/", body);
};

export const updateUser = (id: string, body: { username: string }) => {
  return axios.put(`/api/1.0/users/${id}`, body);
};

export const logout = () => {
  return axios.post("/api/1.0/logout");
};

export const deleteUser = (id: string) => {
  return axios.delete(`/api/1.0/users/${id}`);
};