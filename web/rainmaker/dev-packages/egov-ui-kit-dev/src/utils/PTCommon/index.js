import get from "lodash/get";
import queryString from "query-string";

export const resetFormWizard = (form, removeForm) => {
  const formKeys = form && Object.keys(form);
  const formToReset = [
    "basicInformation",
    "propertyAddress",
    "plotDetails",
    "ownershipType",
    "institutionAuthority",
    "institutionDetails",
    "cashInfo",
    "paymentModes",
    "receiptInfo",
    "additionalRebate",
  ];
  formKeys.forEach((formKey) => {
    if (
      formToReset.includes(formKey) ||
      formKey.startsWith("ownerInfo") ||
      formKey.startsWith("customSelect_") ||
      formKey.startsWith("floorDetails_")
    ) {
      removeForm(formKey);
    }
  });
};

export const getLatestPropertyDetails = (propertyDetailsArray) => {
  if (propertyDetailsArray) {
    if (propertyDetailsArray.length > 1) {
      return propertyDetailsArray.reduce((acc, curr) => {
        return acc.assessmentDate > curr.assessmentDate ? acc : curr;
      });
    } else {
      return propertyDetailsArray[0];
    }
  } else {
    return;
  }
};

export const getQueryValue = (query, key) => get(queryString.parse(query), key, undefined);

export const findCorrectDateObj = (financialYear, category) => {
  category.sort((a, b) => {
    let yearOne = a.fromFY && a.fromFY.slice(0, 4);
    let yearTwo = b.fromFY && b.fromFY.slice(0, 4);
    if (yearOne < yearTwo) {
      return 1;
    } else return -1;
  });
  let assessYear = financialYear && financialYear.slice(0, 4);
  let chosenDateObj = {};
  let categoryYear = category.reduce((categoryYear, item) => {
    const year = item.fromFY && item.fromFY.slice(0, 4);
    categoryYear.push(year);
    return categoryYear;
  }, []);
  const index = categoryYear.indexOf(assessYear);
  if (index > -1) {
    chosenDateObj = category[index];
  } else {
    for (let i = 0; i < categoryYear.length; i++) {
      if (assessYear > categoryYear[i]) {
        chosenDateObj = category[i];
        break;
      }
    }
  }
  let month = null;
  if (chosenDateObj.startingDay) {
    month = getMonth(chosenDateObj.startingDay);
    if (month === 1 || month === 2 || month === 3) {
      chosenDateObj.startingDay = chosenDateObj.startingDay + `/${++assessYear}`;
    } else {
      chosenDateObj.startingDay = chosenDateObj.startingDay + `/${assessYear}`;
    }
  } else if (chosenDateObj.endingDay) {
    month = getMonth(chosenDateObj.endingDay);
    if (month === 1 || month === 2 || month === 3) {
      chosenDateObj.endingDay = chosenDateObj.endingDay + `/${++assessYear}`;
    } else {
      chosenDateObj.endingDay = chosenDateObj.endingDay + `/${assessYear}`;
    }
  }
  return chosenDateObj;
};

const getMonth = (date) => {
  return parseInt(date.split("/")[1]);
};

export const sortDropdown = (data, sortBy, isAscending) => {
  const sortedData = data.slice().sort((a, b) => {
    var textA = a[sortBy].toUpperCase();
    var textB = b[sortBy].toUpperCase();
    return isAscending ? (textA < textB ? -1 : textA > textB ? 1 : 0) : textA < textB ? 1 : textA > textB ? -1 : 0;
  });
  return sortedData;
};
