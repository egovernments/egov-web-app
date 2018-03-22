import * as actionTypes from "../actionTypes/comments";
import { httpRequest } from "../../api";

const fetchCommentsPending = () => {
  return { type: actionTypes.COMMENTS_FETCH_PENDING };
};

const fetchCommentsComplete = (payload) => {
  return { type: actionTypes.COMMENTS_FETCH_COMPLETE, payload };
};
const fetchCommentsError = (error) => {
  return { type: actionTypes.COMMENTS_FETCH_ERROR, payload: error, error: true };
};

export const fetchComments = (complaintId) => {
  return async (dispatch, getState) => {
    dispatch(fetchCommentsPending());
    try {
      const comments = await httpRequest(complaintId);
      // data transformation will be handled by a custom middleware
      dispatch(fetchCommentsComplete(comments));
    } catch (error) {
      //handle the error
      dispatch(fetchCommentsError(error));
    }
  };
};
