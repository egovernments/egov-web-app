import React from "react";
import { getDateFromEpoch } from "egov-ui-kit/utils/commons";
import Label from "egov-ui-kit/utils/translationNode";
import get from "lodash/get";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";
import { fail } from "assert";

const secondaryTextLabelStyle = {
  letterSpacing: 0.5,
};

const primaryTextLabelStyle = {
  letterSpacing: 0.6,
};

const secondaryTextContainer = {
  marginTop: 5,
};

export const getTransformedItems = (propertiesById, cities) => {
  return (
    propertiesById &&
    Object.values(propertiesById).reduce((acc, curr) => {
      const propertyDetail =
        curr &&
        curr.propertyDetails &&
        curr.propertyDetails.map((item) => {
          return {
            primaryText: (
              <Label label={`INR ${get(curr, "amountPaid")}`} fontSize="16px" color="#484848" bold={true} labelStyle={primaryTextLabelStyle} />
            ),

            secondaryText: (
              <div style={{ height: "auto", marginTop: 0 }}>
                <Label
                  label={item && item.financialYear}
                  containerStyle={secondaryTextContainer}
                  labelStyle={secondaryTextLabelStyle}
                  color="#484848"
                />
                <Label
                  label={getCommaSeperatedAddress(curr.address, cities)}
                  containerStyle={secondaryTextContainer}
                  labelStyle={secondaryTextLabelStyle}
                  color="#484848"
                />
                <Label
                  label={`Assessment No.: ${item.assessmentNumber}`}
                  containerStyle={secondaryTextContainer}
                  labelStyle={secondaryTextLabelStyle}
                  color="#484848"
                />
              </div>
            ),
            financialYear: item.financialYear,
            assessmentNo: item.assessmentNumber,
            propertyId: curr.propertyId,
            date: getDateFromEpoch(item.assessmentDate),
            status: "Paid",
            consumerCode: `${curr.propertyId}:${item.assessmentNumber}`,
            receipt: true,
          };
        });
      acc = [...acc, ...propertyDetail];
      return acc;
    }, [])
  );
};

const getTransactionsforIncompleteAssessments = (payments) => {
  const failedTransactionsConsumercode =
    payments &&
    Object.values(payments).map((transaction) => {
      return transaction.moduleId;
    });
  return (
    failedTransactionsConsumercode &&
    failedTransactionsConsumercode.reduce((result, current) => {
      if (!result[current.split(":")[0]]) result[current.split(":")[0]] = [];
      result[current.split(":")[0]].push(current.split(":")[1]);
      return result;
    }, {})
  );
};

export const getTransactionsforCompletedAssessments = (payments) => {
  const failedTransactionsConsumercode =
    payments &&
    Object.values(payments).map((transaction) => {
      return {
        consumerCode: transaction.moduleId,
        amountPaid: transaction.txnAmount,
      };
    });
  return (
    failedTransactionsConsumercode &&
    failedTransactionsConsumercode.reduce((result, current) => {
      if (!result[current.consumerCode.split(":")[0]]) result[current.consumerCode.split(":")[0]] = [];
      const resultValue = {
        assessmentNo: current.consumerCode.split(":")[1],
        amountPaid: current.amountPaid,
      };
      result[current.consumerCode.split(":")[0]].push(resultValue);
      return result;
    }, {})
  );
};

const getPropertiesByIdTransactions = (propertiesById, transactions) => {
  return (
    transactions &&
    Object.keys(transactions).reduce((result, moduleId) => {
      if (propertiesById[moduleId] && !result[moduleId]) result[moduleId] = [];
      if (propertiesById[moduleId]) {
        result[moduleId] = propertiesById[moduleId];
      }
      return result;
    }, {})
  );
};

const filterData = (propertiesById, propertyName, ids) => {
  return {
    [propertyName]: {
      ...propertiesById[propertyName],
      amountPaid: ids[0].amountPaid && ids[0].amountPaid,
      propertyDetails:
        propertiesById &&
        propertiesById[propertyName]["propertyDetails"] &&
        propertiesById[propertyName]["propertyDetails"].filter((item) => ids.indexOf(item.assessmentNumber) !== -1 || ids[0].assessmentNo),
    },
  };
};

const mergeFinalData = (propertiesById, failedTransObj) => {
  return (
    propertiesById &&
    Object.keys(propertiesById).reduce((result, current) => {
      result[current] = filterData(propertiesById, current, failedTransObj[current])[current];
      return result;
    }, {})
  );
};

export const getFinalAssessments = (failedPayments, propertiesById) => {
  let failedTransObj = failedPayments && getTransactionsforIncompleteAssessments(failedPayments);
  let failedProperties = failedTransObj && propertiesById && getPropertiesByIdTransactions(propertiesById, failedTransObj);
  return failedProperties && mergeFinalData(failedProperties, failedTransObj);
};
