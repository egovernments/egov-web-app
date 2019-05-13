import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { sortByEpoch, getEpochForDate } from "../../utils";
import { getLocalization } from "egov-ui-kit/utils/localStorageUtils";
import {generateReciept} from "../../utils/recieptPdf"

const getLocalTextFromCode = localCode => {
  return JSON.parse(getLocalization("localization_en_IN")).find(
    item => item.code === localCode
  );
};

export const textToLocalMapping = {
  "Receipt No.": get(
    getLocalTextFromCode("UC_COMMON_TABLE_COL_APP_NO"),
    "message",
    "Receipt No"
  ),
  "Payee Name": get(
    getLocalTextFromCode("UC_COMMON_TABLE_COL_APP_DATE"),
    "message",
    "Payee Name"
  ),
  "Service Type": get(
    getLocalTextFromCode("UC_COMMON_TABLE_COL_APP_DATE"),
    "message",
    "Service Type"
  ),
  "Date": get(
    getLocalTextFromCode("UC_COMMON_TABLE_COL_APP_DATE"),
    "message",
    "Date"
  ),
  "Amount[INR]": get(
    getLocalTextFromCode("UC_COMMON_TABLE_COL_APP_DATE"),
    "message",
    "Amount[INR]"
  ),

  "Status": get(
    getLocalTextFromCode("UC_COMMON_TABLE_COL_OWN_NAME"),
    "message",
    "Status"
  ),

  //Download button
};

export const searchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: false,
  props: {
    // data: [],
    columns: {
      [get(textToLocalMapping, "Receipt No.")]: {
        format: rowData => {
          return (
              <span
                style={{
                  color: "#FE7A51"
                }} onClick={() => generateReciept(rowData)}
              >
                {rowData[get(textToLocalMapping, "Receipt No.")]}
              </span>
          );
        }
      },
      [get(textToLocalMapping, "Payee Name")]: {},
      [get(textToLocalMapping, "Service Type")]: {},
      [get(textToLocalMapping, "Date")]: {},
      [get(textToLocalMapping, "Amount[INR]")]: {},
      [get(textToLocalMapping, "Status")]: {},
    },
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
    },
    customSortColumn: {
      column: "Date",
      sortingFn: (data, i, sortDateOrder) => {
        const epochDates = data.reduce((acc, curr) => {
          acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
          return acc;
        }, []);
        const order = sortDateOrder === "asc" ? true : false;
        const finalData = sortByEpoch(epochDates, !order).map(item => {
          item.pop();
          return item;
        });
        return { data: finalData, currentOrder: !order ? "asc" : "desc" };
      }
    }
  }
};

const onRowClick = rowData => {
  switch (rowData[get(textToLocalMapping, "")]) {
    default:
      return `/uc/search`;
  }
  }