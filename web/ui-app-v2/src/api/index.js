import axios from "axios";
import { prepareFormData, getRequestUrl, fetchFromLocalStorage } from "../utils";

const authToken = fetchFromLocalStorage("token");
const userInfo = JSON.parse(fetchFromLocalStorage("userRequest"));
const tenantId = fetchFromLocalStorage("tenantId");

const instance = axios.create({
  baseURL: window.location.origin,
  headers: {
    "Content-Type": "application/json",
  },
});

const wrapRequestBody = (requestBody) => {
  const RequestInfo = {
    apiId: "emp",
    ver: "1.0",
    ts: "27-06-2017 10:30:12",
    action: "create",
    did: "1",
    key: "abcdkey",
    msgId: "20170310130900",
    requesterId: "rajesh",
    userInfo,
    authToken,
  };

  return Object.assign({}, { RequestInfo: RequestInfo }, requestBody);
};

export const httpRequest = async (endPoint, requestBody, headers) => {
  let apiError = "Api Error";
  try {
    const response = await instance.post(endPoint, wrapRequestBody(requestBody));
    const responseStatus = parseInt(response.status, 10);
    if (responseStatus === 200 || responseStatus === 201) {
      return response.data;
    } else {
      apiError = response.hasOwnProperty("Errors") && response.Errors.length ? response.Errors[0].message : apiError;
    }
  } catch (error) {
    apiError = error;
  }
  throw new Error(apiError);
};
