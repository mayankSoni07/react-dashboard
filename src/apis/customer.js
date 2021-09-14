import { apiClient } from "../utils/axiosInstance";
import config from "../config";

// To handle Error
const errorHandling = (error) => {
  if (error && error.response && error.response.status + "" === "401") {
    localStorage.removeItem("token");
    location.reload();
    throw error.response.data;
  } else if (error && error.response && error.response.data)
    throw error.response.data;
  else throw error;
};

// Fetch Customer data
export const getCustomerData = async (reqData) => {
  // URL prepration according to limit, page and filters
  let URL = config.apiPath.customer;
  if (reqData && reqData.limit) URL = URL + "/" + reqData.limit;
  else URL = URL + "/0";
  if (reqData && reqData.page >= 0) URL = URL + "/" + reqData.page;
  else URL = URL + "/0";
  if (reqData && reqData.filter) URL = URL + "?q=" + reqData.filter;

  try {
    const response = await apiClient(true).get(URL);
    return response.data;
  } catch (error) {
    errorHandling(error);
  }
};

// Add Customer
export const addCustomer = async (reqData) => {
  const URL = `${config.apiPath.customer}`;
  try {
    const response = await apiClient(true).post(URL, reqData);
    return response.data;
  } catch (error) {
    errorHandling(error);
  }
};

// Edit Customer
export const editCustomer = async (reqData, id) => {
  const URL = `${config.apiPath.customer}/${id}`;
  try {
    const response = await apiClient(true).put(URL, reqData);
    return response.data;
  } catch (error) {
    errorHandling(error);
  }
};

// Delete Customer
export const deleteCustomer = async (id) => {
  const URL = `${config.apiPath.customer}/${id}`;
  try {
    const response = await apiClient(true).delete(URL);
    return response.data;
  } catch (error) {
    errorHandling(error);
  }
};
