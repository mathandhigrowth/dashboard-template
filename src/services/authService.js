import api from "./api";

const baseURL = `/auth`;

export const login = (credentials) => {
  return api.post(`${baseURL}/login`, credentials);
};

export const register = (credentials) => {
  return api.post(`${baseURL}/register`, credentials);
};

export const logout = () => {
  return api.post(`${baseURL}/logout`);
};

export const getMe = () => {
  return api.get(`${baseURL}/me`);
};