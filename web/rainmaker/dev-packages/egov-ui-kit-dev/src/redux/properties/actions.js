import * as actionTypes from "./actionTypes";
import { PROPERTY, DRAFT, PGService, RECEIPT } from "egov-ui-kit/utils/endPoints";
import { httpRequest } from "egov-ui-kit/utils/api";
import { transformById } from "egov-ui-kit/utils/commons";
import orderby from "lodash/orderBy";

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

const failedTransactionFetchError = (error) => {
  return {
    type: actionTypes.FAILED_TRANSACTION_FETCH_ERROR,
    error,
  };
};
const failedTransactionFetchComplete = (payload) => {
  return {
    type: actionTypes.FAILED_TRANSACTION_FETCH_COMPLETE,
    payload,
  };
};
const failedTransactionFetchPending = () => {
  return {
    type: actionTypes.FAILED_TRANSACTION_FETCH_PENDING,
  };
};
const successTransactionFetchError = (error) => {
  return {
    type: actionTypes.SUCCESS_TRANSACTION_FETCH_ERROR,
    error,
  };
};
const successTransactionFetchComplete = (payload) => {
  return {
    type: actionTypes.SUCCESS_TRANSACTION_FETCH_COMPLETE,
    payload,
  };
};
const successTransactionFetchPending = () => {
  return {
    type: actionTypes.SUCCESS_TRANSACTION_FETCH_PENDING,
  };
};

const ReceiptFetchError = (error) => {
  return {
    type: actionTypes.RECEIPT_FETCH_ERROR,
    error,
  };
};
const ReceiptFetchComplete = (payload) => {
  return {
    type: actionTypes.RECEIPT_FETCH_COMPLETE,
    payload,
  };
};
const ReceiptFetchPending = () => {
  return {
    type: actionTypes.RECEIPT_FETCH_PENDING,
  };
};

const AssessmentStatusFetchError = (error) => {
  return {
    type: actionTypes.ASSESSMENT_STATUS_ERROR,
    error,
  };
};
const AssessmentStatusFetchComplete = (payload) => {
  return {
    type: actionTypes.ASSESSMENT_STATUS_COMPLETE,
    payload,
  };
};
const AssessmentStatusFetchPending = () => {
  return {
    type: actionTypes.ASSESSMENT_STATUS_PENDING,
  };
};

const SingleAssessmentStatusFetchPending = () => {
  return {
    type: actionTypes.SINGLE_ASSESSMENT_STATUS_PENDING,
  };
};
const SingleAssessmentStatusFetchError = (error) => {
  return {
    type: actionTypes.SINGLE_ASSESSMENT_STATUS_ERROR,
    error,
  };
};
const SingleAssessmentStatusFetchComplete = (payload) => {
  return {
    type: actionTypes.SINGLE_ASSESSMENT_STATUS_COMPLETE,
    payload,
  };
};

export const fetchProperties = (queryObjectproperty, queryObjectDraft, queryObjectFailedPayments, queryObjectSuccessPayments) => {
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
      dispatch(failedTransactionFetchPending());
      try {
        const payloadFailedPayments = await httpRequest(PGService.GET.URL, PGService.GET.ACTION, queryObjectFailedPayments, {}, [], {}, true);
        dispatch(failedTransactionFetchComplete(payloadFailedPayments));
      } catch (error) {
        dispatch(failedTransactionFetchError(error.message));
      }
    }

    if (queryObjectSuccessPayments) {
      dispatch(successTransactionFetchPending());
      try {
        const payloadSuccessPayments = await httpRequest(PGService.GET.URL, PGService.GET.ACTION, queryObjectSuccessPayments, {}, [], {}, true);
        dispatch(successTransactionFetchComplete(payloadSuccessPayments));
      } catch (error) {
        dispatch(successTransactionFetchError(error.message));
      }
    }
  };
};

export const fetchReceipts = (queryObj) => {
  return async (dispatch) => {
    dispatch(ReceiptFetchPending());
    try {
      const payloadReceipts = await httpRequest(RECEIPT.GET.URL, RECEIPT.GET.ACTION, queryObj, {}, [], { ts: 0 });
      dispatch(ReceiptFetchComplete(payloadReceipts));
    } catch (error) {
      dispatch(ReceiptFetchError(error.message));
    }
  };
};

const getStatusAndAmount = (receiptArrayItem) => {
  const receiptTransformed = receiptArrayItem.reduce((result, current) => {
    if (!result.totalAmount) result.totalAmount = 0;
    result.totalAmount += current.amountPaid;
    result.totalAmountToPay = receiptArrayItem[receiptArrayItem.length - 1].totalAmount;
    return result;
  }, {});
  if (receiptTransformed.totalAmount === receiptTransformed.totalAmountToPay) {
    receiptTransformed["status"] = "Paid";
  } else {
    receiptTransformed["status"] = "Partially Paid";
  }
  return receiptTransformed;
};

const mergeReceiptsInProperty = (receiptsArray, propertyObj) => {
  const transformedPropertyObj = { ...propertyObj };
  Object.keys(receiptsArray).forEach((item) => {
    if (transformedPropertyObj.hasOwnProperty(item)) {
      transformedPropertyObj[item].receiptInfo = getStatusAndAmount(orderby(receiptsArray[item], "totalAmount", "asc"));
    }
  });
  const mergedReceiptsProperties = Object.values(transformedPropertyObj).filter((property) => {
    return property.receiptInfo;
  });
  return mergedReceiptsProperties;
};

export const getAssesmentsandStatus = (queryObjectproperty) => {
  return async (dispatch) => {
    dispatch(AssessmentStatusFetchPending());
    try {
      const payloadProperty = await httpRequest(PROPERTY.GET.URL, PROPERTY.GET.ACTION, queryObjectproperty);
      const propertybyId = transformById(payloadProperty["Properties"], "propertyId");
      const consumerCodes =
        propertybyId &&
        Object.values(propertybyId).reduce((result, curr) => {
          const propertyDetail =
            curr &&
            curr.propertyDetails &&
            curr.propertyDetails.reduce((consumerCodes, item) => {
              consumerCodes[`${curr.propertyId}:${item.assessmentNumber}`] = {
                ...item,
                propertyId: curr.propertyId,
                address: curr.address,
                tenantId: curr.tenantId,
                property: curr,
              };
              return consumerCodes;
            }, []);

          result.push(propertyDetail);
          return result;
        }, []);
      const finalcc =
        consumerCodes &&
        consumerCodes.reduce((acc, curr) => {
          Object.keys(curr).map((item) => {
            acc[item] = curr[item];
          });
          return acc;
        }, {});
      const commaSeperatedCC = Object.keys(finalcc).join(",");

      const payloadReceipts = await httpRequest(
        RECEIPT.GET.URL,
        RECEIPT.GET.ACTION,
        [{ key: "consumerCode", value: commaSeperatedCC }],
        {},
        [],
        {
          ts: 0,
        },
        true
      );
      const receiptbyId = transformById(payloadReceipts["Receipt"], "transactionId");
      const receiptDetails =
        receiptbyId &&
        Object.values(receiptbyId).reduce((acc, curr) => {
          if (!acc[curr.Bill[0].billDetails[0].consumerCode]) acc[curr.Bill[0].billDetails[0].consumerCode] = [];
          acc[curr.Bill[0].billDetails[0].consumerCode].push({
            amountPaid: curr.Bill[0].billDetails[0].amountPaid,
            consumerCode: curr.Bill[0].billDetails[0].consumerCode,
            totalAmount: curr.Bill[0].billDetails[0].totalAmount,
          });
          return acc;
        }, {});

      dispatch(AssessmentStatusFetchComplete(mergeReceiptsInProperty(receiptDetails, finalcc)));
    } catch (error) {
      dispatch(AssessmentStatusFetchError(error.message));
    }
  };
};

export const getSingleAssesmentandStatus = (queryObjectproperty) => {
  return async (dispatch) => {
    dispatch(SingleAssessmentStatusFetchPending());
    try {
      const consumerCodes =
        queryObjectproperty &&
        queryObjectproperty.propertyDetails &&
        queryObjectproperty.propertyDetails.reduce((acc, item) => {
          acc[`${queryObjectproperty.propertyId}:${item.assessmentNumber}`] = {
            ...item,
            propertyId: queryObjectproperty.propertyId,
            address: queryObjectproperty.address,
            tenantId: queryObjectproperty.tenantId,
            property: queryObjectproperty,
          };
          return acc;
        }, {});

      const finalcc = Object.keys(consumerCodes).join(",");
      const payloadReceipts = await httpRequest(
        RECEIPT.GET.URL,
        RECEIPT.GET.ACTION,
        [{ key: "consumerCode", value: finalcc }],
        {},
        [],
        {
          ts: 0,
        },
        true
      );
      const receiptbyId = transformById(payloadReceipts["Receipt"], "transactionId");
      const receiptDetails =
        receiptbyId &&
        Object.values(receiptbyId).reduce((acc, curr) => {
          if (!acc[curr.Bill[0].billDetails[0].consumerCode]) acc[curr.Bill[0].billDetails[0].consumerCode] = [];
          acc[curr.Bill[0].billDetails[0].consumerCode].push({
            amountPaid: curr.Bill[0].billDetails[0].amountPaid,
            consumerCode: curr.Bill[0].billDetails[0].consumerCode,
            totalAmount: curr.Bill[0].billDetails[0].totalAmount,
          });
          return acc;
        }, {});
      dispatch(SingleAssessmentStatusFetchComplete(mergeReceiptsInProperty(receiptDetails, consumerCodes)));
    } catch (error) {
      dispatch(SingleAssessmentStatusFetchError(error.message));
    }
  };
};
