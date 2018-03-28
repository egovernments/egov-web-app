import * as actionTypes from "./actionTypes";
// import {httpRequest} from "utils/api";

export const asyncPending = (type, object) => {
  return { type, object };
};

export const asyncComplete = (type, object, payload) => {
  return { type, object };
};

export const asyncError = (type, object, error) => {
  return { type, object, payload: error };
};

export const setDropDownData = (key,payload) =>
{
  return {type:actionTypes.SET_DROPDOWN_DATA,key,payload};
}
