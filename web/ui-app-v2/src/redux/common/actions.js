import * as actionTypes from "./actionTypes";
// import {httpRequest} from "utils/api";

export const setDropDownData = (key, payload) => {
  return { type: actionTypes.SET_DROPDOWN_DATA, key, payload };
};
