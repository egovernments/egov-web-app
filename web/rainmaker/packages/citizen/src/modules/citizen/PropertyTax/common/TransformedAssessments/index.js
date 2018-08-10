import React from "react";
import { getDateFromEpoch } from "egov-ui-kit/utils/commons";
import Label from "egov-ui-kit/utils/translationNode";
import get from "lodash/get";
import { getAddress } from "egov-ui-kit/utils/commons";
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
      const cityValue = get(curr, "address.city");
      const mohalla = get(curr, "address.locality.code");
      const propertyDetail =
        curr.propertyDetails &&
        curr.propertyDetails.map((item) => {
          return {
            primaryText: <Label label="INR 1300.00" fontSize="16px" color="#484848" bold={true} labelStyle={primaryTextLabelStyle} />,

            secondaryText: (
              <div style={{ height: "auto", marginTop: 0 }}>
                <Label
                  label={item && item.financialYear}
                  containerStyle={secondaryTextContainer}
                  labelStyle={secondaryTextLabelStyle}
                  color="#484848"
                />
                <Label
                  label={getAddress(cities, cityValue, mohalla)}
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

export const getTransactionsforIncompleteAssessments = (payments) => {
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

export const getPropertiesByIdTransactions = (propertiesById, transactions) => {
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
      propertyDetails:
        propertiesById &&
        propertiesById[propertyName]["propertyDetails"] &&
        propertiesById[propertyName]["propertyDetails"].filter((item) => ids.indexOf(item.assessmentNumber) !== -1),
    },
  };
};

export const mergeFinalData = (propertiesById, failedTransObj) => {
  console.log(failedTransObj);
  return (
    propertiesById &&
    Object.keys(propertiesById).reduce((result, current) => {
      result[current] = filterData(propertiesById, current, failedTransObj[current])[current];
      return result;
    }, {})
  );
};
