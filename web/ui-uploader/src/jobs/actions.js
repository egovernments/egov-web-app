import * as actionTypes from "../constants/actionTypes";
import { Api } from "../api";

// filters related actions
export const updateUserJobFilters = filter => {
  return { type: actionTypes.UPDATE_FILTERS, filter };
};

export const applyUserJobFilters = filter => {
  console.log("filter", filter);
  const startDate = filter.startDate && filter.startDate.getTime();
  const endDate = filter.endDate && filter.endDate.getTime();
  console.log("dates", startDate, endDate);
  return async (dispatch, getState) => {
    dispatch(
      fetchUserJobs(
        filter.codes,
        filter.statuses,
        filter.requesterNames,
        filter.fileNames,
        startDate,
        endDate
      )
    );
  };
  // return { type: actionTypes.APPLY_FILTERS };
};

export const resetUserJobFilters = () => {
  return { type: actionTypes.RESET_FILTERS };
};

// job fetch related actions
export const initiateUserJobsFetch = () => {
  return { type: actionTypes.INITIATE_USER_JOBS_FETCH };
};

export const fetchUserJobsSuccess = (userJobs = []) => {
  return { type: actionTypes.FETCH_USER_JOBS_SUCCESS, userJobs };
};

export const fetchUserJobsFailure = error => {
  return { type: actionTypes.FETCH_USER_JOBS_FAILURE, error };
};

export const fetchUserJobs = (
  codes,
  statuses,
  requesterNames,
  fileNames,
  startDate,
  endDate
) => {
  return async (dispatch, getState) => {
    console.log("in fetch", codes, statuses, startDate, endDate);
    dispatch(initiateUserJobsFetch());
    try {
      const userJobs = await Api().fetchUserJobs(
        codes,
        statuses,
        requesterNames,
        fileNames,
        startDate,
        endDate
      );
      dispatch(fetchUserJobsSuccess(userJobs));
    } catch (error) {
      dispatch(fetchUserJobsFailure(error));
    }
  };
};
