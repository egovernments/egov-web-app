import * as actionTypes from "./actionTypes";
import { transformById } from "egov-ui-kit/utils/commons";

const initialState = {
  loading: false,
  propertiesById: {},
  draftsById: {},
  error: false,
  errorMessage: "",
};

const propertyReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case actionTypes.PROPERTY_FETCH_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",
      };
    case actionTypes.PROPERTY_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
      };
    case actionTypes.RECEIPT_FETCH_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",
      };
    case actionTypes.RECEIPT_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
      };
    case actionTypes.DRAFT_FETCH_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",
      };
    case actionTypes.DRAFT_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
      };
    case actionTypes.PG_FETCH_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: "",
      };
    case actionTypes.PG_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
      };
    case actionTypes.PROPERTY_FETCH_COMPLETE:
      const propertiesById = transformById(action.payload["Properties"], "propertyId");
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: "",
        propertiesById,
      };
    case actionTypes.DRAFT_FETCH_COMPLETE:
      const draftsById = transformById(action.payload["drafts"], "id");
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: "",
        draftsById,
      };
    case actionTypes.PG_FETCH_COMPLETE:
      const failedPayments = transformById(action.payload["Transaction"], "txnId");
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: "",
        failedPayments,
      };
    case actionTypes.RECEIPT_FETCH_COMPLETE:
      const receipts = action.payload["Receipt"];
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: "",
        receipts,
      };
    default:
      return state;
  }
};

export default propertyReducer;
