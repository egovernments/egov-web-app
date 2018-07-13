import * as actionTypes from "./actionTypes";
import { LOCALATION } from "egov-ui-kit/utils/endPoints";
import { httpRequest } from "egov-ui-kit/utils/api";
import { getCurrentAddress } from "egov-ui-kit/utils/commons";
import commonConfig from "config/common";

export const setRoute = (route) => {
  return { type: actionTypes.SET_ROUTE, route };
};

export const setBottomNavigationIndex = (bottomNavigationIndex) => {
  return { type: actionTypes.CHANGE_BOTTOM_NAVIGATION_INDEX, bottomNavigationIndex };
};

const setLocalizationLabels = (locale, localizationLabels) => {
  window.localStorage.setItem(`localization_${locale}`, JSON.stringify(localizationLabels));
  window.localStorage.setItem("locale", locale);
  return { type: actionTypes.ADD_LOCALIZATION, locale, localizationLabels };
};

export const toggleSnackbarAndSetText = (open, message, error) => {
  return {
    type: actionTypes.SHOW_TOAST,
    open,
    message,
    error,
  };
};

export const fetchLocalizationLabel = (locale) => {
  return async (dispatch) => {
    try {
      //let payload = { messages: JSON.parse(window.localStorage.getItem(`localization_${locale}`)) || [] };
      //if (!payload.messages.length) {
      const payload = await httpRequest(LOCALATION.GET.URL, LOCALATION.GET.ACTION, [
        { key: "module", value: "rainmaker-pgr" },
        { key: "locale", value: locale },
        { key: "tenantId", value: commonConfig.tenantId },
      ]);
      //}
      dispatch(setLocalizationLabels(locale, payload.messages));
    } catch (error) {}
  };
};

const setCurrentLocation = (currentLocation) => {
  return {
    type: actionTypes.SET_USER_CURRENT_LOCATION,
    currentLocation,
  };
};

export const addBreadCrumbs = (url) => {
  return { type: actionTypes.ADD_BREADCRUM_ITEM, url };
};

export const removeBreadcrumbs = (url, mode = "single") => {
  return { type: actionTypes.REMOVE_BREADCRUM_ITEM, mode, url };
};

export const fetchCurrentLocation = () => {
  return async (dispatch) => {
    const currAddress = await getCurrentAddress();
    dispatch(setCurrentLocation(currAddress));
  };
};
