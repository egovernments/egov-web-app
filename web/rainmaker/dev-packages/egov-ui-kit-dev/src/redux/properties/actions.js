import * as actionTypes from "./actionTypes";
import { PROPERTY, DRAFT, PGService } from "egov-ui-kit/utils/endPoints";
import { httpRequest } from "egov-ui-kit/utils/api";

const propertyFetchPending = () => {
  return {
    type: actionTypes.PROPERTY_FETCH_PENDING,
  };
};

const draftFetchPending = () => {
  return {
    type: actionTypes.DRAFT_FETCH_PENDING,
  };
};

const propertyFetchComplete = (payload, overWrite) => {
  return {
    type: actionTypes.PROPERTY_FETCH_COMPLETE,
    payload,
  };
};

const draftFetchComplete = (payload) => {
  return {
    type: actionTypes.DRAFT_FETCH_COMPLETE,
    payload,
  };
};

const propertyFetchError = (error) => {
  return {
    type: actionTypes.PROPERTY_FETCH_ERROR,
    error,
  };
};
const draftFetchError = (error) => {
  return {
    type: actionTypes.DRAFT_FETCH_ERROR,
    error,
  };
};

const PGFetchError = (error) => {
  return {
    type: actionTypes.PG_FETCH_ERROR,
    error,
  };
};
const PGFetchComplete = (payload) => {
  return {
    type: actionTypes.PG_FETCH_COMPLETE,
    payload,
  };
};
const PGFetchPending = () => {
  return {
    type: actionTypes.PG_FETCH_PENDING,
  };
};

export const fetchProperties = (queryObjectproperty, queryObjectDraft, queryObjectFailedPayments) => {
  return async (dispatch) => {
    if (queryObjectDraft) {
      dispatch(draftFetchPending());
      try {
        const draftpayload = await httpRequest(DRAFT.GET.URL, DRAFT.GET.ACTION, queryObjectDraft);
        dispatch(draftFetchComplete(draftpayload));
      } catch (error) {
        dispatch(draftFetchError(error.message));
      }
    }

    if (queryObjectproperty) {
      dispatch(propertyFetchPending());
      try {
        const payloadProperty = await httpRequest(PROPERTY.GET.URL, PROPERTY.GET.ACTION, queryObjectproperty);
        dispatch(propertyFetchComplete(payloadProperty));
      } catch (error) {
        dispatch(propertyFetchError(error.message));
      }
    }

    if (queryObjectFailedPayments) {
      dispatch(PGFetchPending());
      try {
        const payloadFailedPayments = await httpRequest(PGService.GET.URL, PGService.GET.ACTION, queryObjectFailedPayments, {}, [], {}, true);
        dispatch(PGFetchComplete(payloadFailedPayments));
      } catch (error) {
        dispatch(PGFetchError(error.message));
      }
    }
  };
};
