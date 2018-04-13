import * as authType from "./actionTypes";
import { toggleSnackbarAndSetText } from "redux/app/actions";
import { httpRequest, loginRequest } from "utils/api";
import { AUTH, USER, OTP } from "utils/endPoints";
import { prepareFormData } from "utils/commons";

export const userProfileUpdated = (payload) => {
  const user = payload.user[0];
  window.localStorage.setItem("user-info", JSON.stringify(user));
  return { type: authType.USER_PROFILE_UPDATED, user };
};

export const userProfileUpdateError = (error) => {
  return { type: authType.USER_PROFILE_UPDATE_ERROR, error };
};

//user search success/failure
export const searchUserSuccess = (user) => {
  user = user.user[0];
  window.localStorage.setItem("user-info", JSON.stringify(user));
  return { type: authType.USER_SEARCH_SUCCESS, user };
};

export const searchUserError = (error) => {
  return { type: authType.USER_SEARCH_ERROR, error };
};

export const authenticating = () => {
  return { type: authType.AUTHENTICATING };
};

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

export const authenticationFailed = () => {
  return { type: authType.AUTHENTICATION_FAILED };
};

// sending otp
export const sendOtpStarted = () => {
  return { type: authType.SEND_OTP_STARTED };
};

export const sendOtpCompleted = () => {
  return { type: authType.SEND_OTP_COMPLETED };
};

export const searchUser = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const { userName, tenantId } = state.auth.userInfo || {};
    try {
      const user = await httpRequest(USER.SEARCH.URL, USER.SEARCH.ACTION, [], { userName, tenantId });
      delete user.responseInfo;
      dispatch(searchUserSuccess(user));
    } catch (error) {
      dispatch(searchUserError(error.message));
    }
  };
};

export const refreshTokenRequest = () => {
  return async (dispatch) => {
    const refreshToken = window.localStorage.getItem("refresh-token");
    const grantType = "refresh_token";
    try {
      const response = await loginRequest(null, null, refreshToken, grantType);
      delete response.ResponseInfo;
      dispatch(authenticated(response));
    } catch (error) {
      dispatch(logout());
    }
  };
};

// in future if you want to keep a track the number of times otp is sent
export const sendOTP = (intent) => {
  return async (dispatch, getState) => {
    const state = getState();
    const form = state.form[intent];
    const formData = prepareFormData(form);
    dispatch(sendOtpStarted());
    try {
      const formResponse = await httpRequest(OTP.RESEND.URL, OTP.RESEND.ACTION, [], formData);
    } catch (error) {}
    dispatch(sendOtpCompleted());
    dispatch(toggleSnackbarAndSetText(true, "OTP has been Resent"));
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await httpRequest(AUTH.LOGOUT.URL, AUTH.LOGOUT.ACTION, [{ key: "access_token", value: authToken }]);
    } catch (error) {}
    // whatever happens the client should clear the user details
    const locale = localStorage.getItem("locale") || "en_IN";
    const localizationCacheKey = `localization_${locale}`;
    const localization = localStorage.getItem(localizationCacheKey);
    localStorage.clear();
    localStorage.setItem("locale", locale);
    localStorage.setItem(localizationCacheKey, localization);
    dispatch({ type: authType.LOGOUT });
  };
};
