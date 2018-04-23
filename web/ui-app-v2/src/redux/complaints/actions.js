import * as actionTypes from "./actionTypes";
import * as commonActions from "../common/actions";
import { COMPLAINT, CATEGORY } from "utils/endPoints";
import { httpRequest } from "utils/api";

//checking users there in aciton history
//need to refactor this code
const checkUsers = (dispatch, actionHistory, hasUsers) => {
  if (hasUsers) {
    let employeeIds = "",
      userIds = "";
    actionHistory.forEach((actions) => {
      actions.actions.forEach((action) => {
        let splitArray = [];
        if (action.by) {
          splitArray = action.by.split(":");
          if (splitArray[1].toLowerCase() === "citizen") {
            if (userIds.search(splitArray[0]) === -1) {
              userIds += `${splitArray[0]},`;
            }
          } else {
            if (employeeIds.search(splitArray[0]) === -1) {
              employeeIds += `${splitArray[0]},`;
            }
          }
        } else if (action.assignee) {
          splitArray = action.assignee.split(":");
          if (splitArray[1].toLowerCase() === "citizen") {
            if (userIds.search(splitArray[0]) === -1) {
              userIds += `${splitArray[0]},`;
            }
          } else {
            if (employeeIds.search(splitArray[0]) === -1) {
              employeeIds += `${splitArray[0]},`;
            }
          }
        }
      });
    });
    // why are we doing this?
    if (employeeIds) {
      dispatch(commonActions.fetchEmployees([{ key: "id", value: employeeIds }]));
    }
    if (userIds) {
      dispatch(commonActions.fetchCitizens({ tenantId: localStorage.getItem("tenant-id"), id: userIds.split(",") }));
    }
  }
};

// complaint categories success
const complaintCategoriesFetchSucess = (payload) => {
  return {
    type: actionTypes.COMPLAINTS_CATEGORIES_FETCH_SUCCESS,
    payload,
  };
};

const complaintCategoriesFetchError = (error) => {
  return {
    type: actionTypes.COMPLAINTS_CATEGORIES_FETCH_ERROR,
    error,
  };
};

// complaints actions
const complaintFetchPending = () => {
  return {
    type: actionTypes.COMPLAINTS_FETCH_PENDING,
  };
};

const complaintFetchComplete = (payload) => {
  return {
    type: actionTypes.COMPLAINTS_FETCH_COMPLETE,
    payload,
  };
};

const complaintFetchError = (error) => {
  return {
    type: actionTypes.COMPLAINTS_FETCH_ERROR,
    error,
  };
};

export const fetchComplaints = (queryObject, hasUsers = true) => {
  return async (dispatch) => {
    dispatch(complaintFetchPending());
    try {
      const payload = await httpRequest(COMPLAINT.GET.URL, COMPLAINT.GET.ACTION, queryObject);
      checkUsers(dispatch, payload.actionHistory, hasUsers);
      dispatch(complaintFetchComplete(payload));
    } catch (error) {
      dispatch(complaintFetchError(error.message));
    }
  };
};

export const fetchComplaintCategories = () => {
  //Fetching Complaint Categories from MDMS
  let requestBody = {
    MdmsCriteria: {
      tenantId: "pb",
      moduleDetails: [
        {
          moduleName: "RAINMAKER-PGR",
          masterDetails: [
            {
              name: "ServiceDefs",
            },
          ],
        },
      ],
    },
  };

  return async (dispatch) => {
    try {
      const payload = await httpRequest(CATEGORY.GET.URL, CATEGORY.GET.ACTION, [], requestBody);
      dispatch(complaintCategoriesFetchSucess(payload));
    } catch (error) {
      dispatch(complaintCategoriesFetchError(error.message));
    }
  };
};
