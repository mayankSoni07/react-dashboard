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

// Fetch Service data
export const getServiceData = async (reqData) => {
  // URL prepration according to limit, page and filters
  let URL = `${config.apiPath.customer}/${reqData.customerId}${config.apiPath.service}`;
  // if (reqData && reqData.limit) URL = URL + "/" + reqData.limit;
  // else URL = URL + "/0";
  // if (reqData && reqData.page >= 0) URL = URL + "/" + reqData.page;
  // else URL = URL + "/0";
  if (reqData && reqData.filter) URL = URL + "?q=" + reqData.filter;
  // Mock
  // let URL = `${config.apiPath.serviceMock}`;

  try {
    const response = await apiClient(true).get(URL);
    return response.data;
  } catch (error) {
    errorHandling(error);
  }
};

// Add Service
export const addService = async (reqData, customerId) => {
  // customerId : Customer ID
  // reqData: Request Data
  let URL = `${config.apiPath.customer}/${customerId}${config.apiPath.service}`;
  try {
    const response = await apiClient(true).post(URL, reqData);
    return response.data;
  } catch (error) {
    errorHandling(error);
  }
};

// Edit Service
export const editService = async (reqData, customerId, serviceId) => {
  // customerId : Customer ID
  // serviceId : Service ID
  // reqData: Request Data
  let URL = `${config.apiPath.customer}/${customerId}${config.apiPath.service}/${serviceId}`;
  try {
    const response = await apiClient(true).put(URL, reqData);
    return response.data;
  } catch (error) {
    errorHandling(error);
  }
};

// Delete Service
export const deleteService = async (customerId, serviceId) => {
  let URL = `${config.apiPath.customer}/${customerId}${config.apiPath.service}/${serviceId}`;
  try {
    const response = await apiClient(true).delete(URL);
    return response.data;
  } catch (error) {
    errorHandling(error);
  }
};
