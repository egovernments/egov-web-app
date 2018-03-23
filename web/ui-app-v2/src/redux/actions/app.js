import * as commonTypes from "../actionTypes/common";
import * as appTypes from "../actionTypes/app";
import {asyncPending,asyncComplete,asyncError} from "./common";
import {LOCALATION} from "../../utils/endPoints";
import { httpRequest } from "../../utils/api";


export const fetchLocalizationLabel = (locale) => {
  return async dispatch => {
    dispatch(asyncPending(commonTypes.ASYNC_PENDING,"localation"));
    try {
      const payload = await httpRequest(LOCALATION.GET.URL,LOCALATION.GET.ACTION,[{key:"module",value:"rainmaker-pgr"},{key:"locale",value:locale}]);
      // data transformation will be handled by a custom middleware
      dispatch({type:appTypes.ADD_LOCALIZATION,payload:payload.messages});
      dispatch(asyncComplete(commonTypes.ASYNC_COMPLETE,"localation"));
    } catch (error) {
      //handle the error
      dispatch(asyncError(commonTypes.ASYNC_ERROR,"localation",error));
    }
  };
};
