import axios from "axios";
import { prepareFormData, prepareForm, hyphenSeperatedDateTime, getRequestUrl, fetchFromLocalStorage, addQueryArg } from "./commons";

const authToken = fetchFromLocalStorage("token");
// const userInfo = JSON.parse(fetchFromLocalStorage("userRequest"));
const tenantId = fetchFromLocalStorage("tenantId");

const instance = axios.create({
  baseURL: window.location.origin,
  headers: {
    "Content-Type": "application/json",
  },
});

const loginInstance = axios.create({
      baseURL: window.location.origin,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": 'Basic ZWdvdi11c2VyLWNsaWVudDplZ292LXVzZXItc2VjcmV0',
      },
});

// file upload instance
const uploadInstance = axios.create({
  baseURL: window.location.origin,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const wrapRequestBody = (requestBody, action) => {
  const RequestInfo = {
    apiId: "Rainmaker",
    ver: ".01",
    ts: "",
    // hyphenSeperatedDateTime(new Date()),
    action: action,
    did: "1",
    key: "",
    msgId: "20170310130900|en_IN",
    requesterId: "",
    // userInfo,
    authToken
  };

  return Object.assign({}, { RequestInfo }, requestBody);
};

export const httpRequest = async (endPoint, action, queryObject = [], requestBody = {}, headers = []) => {
  let apiError = "Api Error";
  if (headers) instance.defaults = Object.assign(instance.defaults, { headers });

  queryObject.push({ key: "tenantId", value: tenantId });
  endPoint = addQueryArg(endPoint, queryObject);
  try {
    const response = await instance.post(endPoint, wrapRequestBody(requestBody, action));
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

// try to make a generic api call for this
export const uploadFile = async (endPoint, module, file) => {
  const requestParams = { tenantId, module, file };
  const requestBody = prepareForm(requestParams);

  try {
    const response = await uploadInstance.post(endPoint, requestBody);
    const responseStatus = parseInt(response.status, 10);
    let fileStoreIds = [];

    if (responseStatus === 201) {
      const responseData = response.data;
      const files = responseData.files || [];
      fileStoreIds = responseData.files.map((f) => f.fileStoreId);
      return fileStoreIds;
    }
  } catch (error) {
    throw new Error(error);
  }
};


export const loginRequest = async (username,password) => {
  let apiError = "Api Error";
  var params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  params.append('grant_type', 'password');
  params.append('scope', 'read');
  params.append('tenantId', tenantId);

  try {
    const response = await loginInstance.post('/user/oauth/token', params);
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
