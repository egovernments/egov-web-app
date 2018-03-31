import * as authType from "./actionTypes";
import { httpRequest } from "utils/api";
import { AUTH } from "utils/endPoints";
import { setRoute } from "../app/actions";

export const authenticated = (userInfo) => {
  return { type: authType.AUTHENTICATED, userInfo };
};

export const logout = () => async (dispatch) => {
  var locale = localStorage.getItem("locale");
  var localization = localStorage.getItem("localization");
  try {
    const payload = await httpRequest(AUTH.LOGOUT.URL, AUTH.LOGOUT.ACTION, [{ key: "access_token", value: localStorage.getItem("token") }]);
    localStorage.clear();
    localStorage.setItem("locale", locale);
    localStorage.setItem("localization", localization);
    localStorage.setItem("tenantId", "pb");
    dispatch({ type: authType.LOGOUT });
  } catch (error) {}
};
