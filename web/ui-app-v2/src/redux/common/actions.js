import {CORE} from "utils/endPoints";

export const asyncPending = (type, object) => {
  return { type, object };
};

export const asyncComplete = (type, object, payload) => {
  return { type, object };
};

export const asyncError = (type, object, error) => {
  return { type, object, payload: error };
};

export const fetchDropDownData = key => dispatch =>
{

}
