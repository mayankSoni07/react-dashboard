import axios from "axios";

export const apiClient = (addDefaultHeaders, customHeaders = {}) => {
  const config = {
    headers: {
      ...customHeaders,
    },
  };
  if (addDefaultHeaders) {
    Object.assign(config.headers, {
      Authorization: localStorage.getItem("token")
        ? "Bearer " + localStorage.getItem("token")
        : "",
    });
  }
  const instance = axios.create(config);
  return instance;
};
