import { apiClient } from "../utils/axiosInstance";
import config from "../config";

// To handle Error
// location.reload() is not added here because it is already on login page.
const errorHandling = (error) => {
  if (error && error.response && error.response.status + "" === "401") {
    localStorage.removeItem("token");
    throw error.response.data;
  } else if (error && error.response && error.response.data)
    throw error.response.data;
  else throw error;
};

// For Login
export const authenticateUser = async (userData) => {
  const URL = `${config.apiPath.login}`;
  let customHeaders = {};
  customHeaders["Authorization"] = `Basic ${window.btoa(
    `${userData.email}:${userData.password}`
  )}`;
  try {
    const response = await apiClient(false, customHeaders).get(URL);
    return response.data;
  } catch (error) {
    errorHandling(error);
  }
};
