import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import {
  getLocalization,
  getLocale
} from "egov-ui-kit/utils/localStorageUtils";
import { getLocaleLabels } from "egov-ui-framework/ui-utils/commons";

const localeLabels = JSON.parse(getLocalization(`localization_${getLocale()}`));

export const textToLocalMapping = {
  "Employee ID": getLocaleLabels(
    "Employee ID",
    "HR_COMMON_TABLE_COL_EMP_ID",
    localeLabels
  ),
  Name: getLocaleLabels("Name", "HR_COMMON_TABLE_COL_NAME", localeLabels),
  Role: getLocaleLabels("Role", "HR_COMMON_TABLE_COL_ROLE", localeLabels),
  Designation: getLocaleLabels(
    "Designation",
    "HR_COMMON_TABLE_COL_DESG",
    localeLabels
  ),
  Department: getLocaleLabels(
    "Department",
    "HR_COMMON_TABLE_COL_DEPT",
    localeLabels
  ),
  "Search Results for Employee": getLocaleLabels(
    "Search Results for Employee",
    "HR_HOME_SEARCH_RESULTS_TABLE_HEADING",
    localeLabels
  )
};

export const searchResults = {
  uiFramework: "custom-molecules-local",
  moduleName: "egov-hrms",
  componentPath: "Table",
  visible: false,
  props: {
    data: [],
    columns: {
      [get(textToLocalMapping, "Employee ID")]: {
        format: rowData => {
          return (
            <Link to={onRowClick(rowData)}>
              <span
                style={{
                  color: "#FE7A51"
                }}
              >
                {rowData[get(textToLocalMapping, "Employee ID")]}
              </span>
            </Link>
          );
        }
      },
      [get(textToLocalMapping, "Name")]: {},
      [get(textToLocalMapping, "Role")]: {},
      [get(textToLocalMapping, "Designation")]: {},
      [get(textToLocalMapping, "Department")]: {}
    },
    title: get(textToLocalMapping, "Search Results for Employee")
  }
};

const onRowClick = rowData => {
  let viewEmployeeUrl =
    process.env.REACT_APP_SELF_RUNNING === "true"
      ? "/egov-ui-framework/hrms/view"
      : "/hrms/view";
  return `${viewEmployeeUrl}?employeeID=${
    rowData[get(textToLocalMapping, "Employee ID")]
  }`;
};
