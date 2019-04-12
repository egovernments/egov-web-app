import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { sortByEpoch, getEpochForDate } from "../../utils";
import { getLocaleLabels } from "egov-ui-framework/ui-utils/commons";
import {
  getLocalization,
  getLocale
} from "egov-ui-kit/utils/localStorageUtils";

const localeLabels = JSON.parse(getLocalization(`localization_${getLocale()}`));

export const textToLocalMapping = {
  "Application No": getLocaleLabels(
    "Application No",
    "TL_COMMON_TABLE_COL_APP_NO",
    localeLabels
  ),

  "License No": getLocaleLabels(
    "License No",
    "TL_COMMON_TABLE_COL_LIC_NO",
    localeLabels
  ),

  "Trade Name": getLocaleLabels(
    "Trade Name",
    "TL_COMMON_TABLE_COL_TRD_NAME",
    localeLabels
  ),
  "Owner Name": getLocaleLabels(
    "Owner Name",
    "TL_COMMON_TABLE_COL_OWN_NAME",
    localeLabels
  ),

  "Application Date": getLocaleLabels(
    "Application Date",
    "TL_COMMON_TABLE_COL_APP_DATE",
    localeLabels
  ),

  Status: getLocaleLabels("Status", "TL_COMMON_TABLE_COL_STATUS", localeLabels),

  INITIATED: getLocaleLabels("Initiated,", "TL_INITIATED", localeLabels),
  APPLIED: getLocaleLabels("Applied", "TL_APPLIED", localeLabels),
  PAID: getLocaleLabels("Paid", "WF_NEWTL_PENDINGAPPROVAL", localeLabels),

  APPROVED: getLocaleLabels("Approved", "TL_APPROVED", localeLabels),
  REJECTED: getLocaleLabels("Rejected", "TL_REJECTED", localeLabels),
  CANCELLED: getLocaleLabels("Cancelled", "TL_CANCELLED", localeLabels),
  PENDINGAPPROVAL: getLocaleLabels(
    "Pending for Approval",
    "WF_NEWTL_PENDINGAPPROVAL",
    localeLabels
  ),
  PENDINGPAYMENT: getLocaleLabels(
    "Pending payment",
    "WF_NEWTL_PENDINGPAYMENT",
    localeLabels
  ),

  FIELDINSPECTION: getLocaleLabels(
    "Pending for Field Inspection",
    "WF_NEWTL_FIELDINSPECTION",
    localeLabels
  ),

  "Search Results for Trade License Applications": getLocaleLabels(
    "",
    "TL_HOME_SEARCH_RESULTS_TABLE_HEADING",
    localeLabels
  )
};

export const searchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: false,
  props: {
    // data: [],
    columns: {
      [get(textToLocalMapping, "Application No")]: {
        format: rowData => {
          return (
            <Link to={onRowClick(rowData)}>
              <span
                style={{
                  color: "#FE7A51"
                }}
              >
                {rowData[get(textToLocalMapping, "Application No")]}
              </span>
            </Link>
          );
        }
      },
      [get(textToLocalMapping, "License No")]: {},
      [get(textToLocalMapping, "Trade Name")]: {},
      [get(textToLocalMapping, "Owner Name")]: {},
      [get(textToLocalMapping, "Application Date")]: {},
      [get(textToLocalMapping, "Status")]: {}
    },
    title: get(
      textToLocalMapping,
      "Search Results for Trade License Applications"
    ),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
    },
    customSortColumn: {
      column: "Application Date",
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
  switch (rowData[get(textToLocalMapping, "Status")]) {
    case get(textToLocalMapping, "APPLIED"):
    case get(textToLocalMapping, "PENDINGPAYMENT"):
      return `/tradelicence/search-preview?status=pending_payment&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    case get(textToLocalMapping, "APPROVED"):
      return `/tradelicence/search-preview?status=approved&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;

    case get(textToLocalMapping, "PAID"):
    case get(textToLocalMapping, "PENDINGAPPROVAL"):
    case get(textToLocalMapping, "FIELDINSPECTION"):
      return `/tradelicence/search-preview?status=pending_approval&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    case get(textToLocalMapping, "CANCELLED"):
      return `/tradelicence/search-preview?status=cancelled&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    case get(textToLocalMapping, "INITIATED"):
      return `/tradelicence/apply?applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    case get(textToLocalMapping, "REJECTED"):
      return `/tradelicence/search-preview?status=rejected&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    default:
      return `/tradelicence/search`;
  }
};
