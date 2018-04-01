import * as authType from "./actionTypes";
import { httpRequest } from "utils/api";
import { AUTH } from "utils/endPoints";
import { setRoute } from "../app/actions";

export const authenticated = (payload) => {
  const userInfo = payload["UserRequest"];
  const accessToken = payload.access_token;
  const refreshToken = payload.refresh_token;
  const expiresIn = payload.expires_in;
  const lastLoginTime = new Date().getTime();

  localStorage.setItem("user-info", JSON.stringify(userInfo));
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refresh-token", refreshToken);
  localStorage.setItem("expires-in", expiresIn);
  localStorage.setItem("tenant-id", userInfo.tenantId);
  localStorage.setItem("last-login-time", lastLoginTime);

  return { type: authType.AUTHENTICATED, userInfo, accessToken };
};

export const logout = () => async (dispatch) => {
  var locale = localStorage.getItem("locale");
  var localization = localStorage.getItem("localization");
  try {
    const payload = await httpRequest(AUTH.LOGOUT.URL, AUTH.LOGOUT.ACTION, [{ key: "access_token", value: localStorage.getItem("token") }]);
    localStorage.clear();
    localStorage.setItem("locale", locale);
    localStorage.setItem("localization", localization);
    localStorage.setItem("tenant-id", "pb");
    dispatch({ type: authType.LOGOUT });
  } catch (error) {}
};
