import * as actionTypes from "./actionTypes";
import { httpRequest } from "utils/api";
import { TENANT } from "utils/endPoints";

export const setDropDownData = (key, payload) => {
  return { type: actionTypes.SET_DROPDOWN_DATA, key, payload };
};
const setCities = (cities) => {
  return { type: actionTypes.SET_CITIES, cities };
};

// make this to be a generic mdms call
export const fetchCities = () => {
  return async (dispatch) => {
    try {
      const payload = await httpRequest(TENANT.GET.URL, TENANT.GET.ACTION, [
        { key: "moduleName", value: "tenant" },
        { key: "masterName", value: "tenants" },
      ]);
      const cities = payload.MdmsRes["tenant"]["tenants"].map((item) => {
        return {
          key: item.code,
          text: item.city.name,
        };
      });
      dispatch(setCities(cities));
    } catch (error) {}
  };
};
