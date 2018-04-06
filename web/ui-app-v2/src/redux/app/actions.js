import * as actionTypes from "./actionTypes";
import { LOCALATION } from "utils/endPoints";
import { httpRequest } from "utils/api";

export const setRoute = (route) => {
  return { type: actionTypes.SET_ROUTE, route };
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
      const payload = await httpRequest(LOCALATION.GET.URL, LOCALATION.GET.ACTION, [
        { key: "module", value: "rainmaker-pgr" },
        { key: "locale", value: locale },
        { key: "tenantId", value: "default" },
      ]);

      dispatch(setLocalizationLabels(locale, payload.messages));
    } catch (error) {}
  };
};
