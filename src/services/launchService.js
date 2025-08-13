import api from "./api";

const baseURL = `/launch`;

export const getLaunchStatus = () => {
  return api.get(baseURL);
};

export const updateLaunchStatus = (data) => {
  return api.post(baseURL, data);
};
