import { sortByEpoch, getEpochForDate } from "../../utils";
import {
  getLocaleLabels,
  getTransformedLocalStorgaeLabels
} from "egov-ui-framework/ui-utils/commons";

export const getTextToLocalMapping = label => {
  const localisationLabels = getTransformedLocalStorgaeLabels();
  switch (label) {
    case "Application No":
      return getLocaleLabels(
        "Application No",
        "TL_COMMON_TABLE_COL_APP_NO",
        localisationLabels
      );

    case "License No":
      return getLocaleLabels(
        "License No",
        "TL_COMMON_TABLE_COL_LIC_NO",
        localisationLabels
      );

    case "Trade Name":
      return getLocaleLabels(
        "Trade Name",
        "TL_COMMON_TABLE_COL_TRD_NAME",
        localisationLabels
      );
    case "Owner Name":
      return getLocaleLabels(
        "Owner Name",
        "TL_COMMON_TABLE_COL_OWN_NAME",
        localisationLabels
      );

    case "Application Date":
      return getLocaleLabels(
        "Application Date",
        "TL_COMMON_TABLE_COL_APP_DATE",
        localisationLabels
      );

    case "Status":
      return getLocaleLabels(
        "Status",
        "TL_COMMON_TABLE_COL_STATUS",
        localisationLabels
      );

    case "INITIATED":
      return getLocaleLabels("Initiated,", "TL_INITIATED", localisationLabels);
    case "APPLIED":
      getLocaleLabels("Applied", "TL_APPLIED", localisationLabels);
    case "PAID":
      getLocaleLabels("Paid", "WF_NEWTL_PENDINGAPPROVAL", localisationLabels);

    case "APPROVED":
      return getLocaleLabels("Approved", "TL_APPROVED", localisationLabels);
    case "REJECTED":
      return getLocaleLabels("Rejected", "TL_REJECTED", localisationLabels);
    case "CANCELLED":
      return getLocaleLabels("Cancelled", "TL_CANCELLED", localisationLabels);
    case "PENDINGAPPROVAL ":
      return getLocaleLabels(
        "Pending for Approval",
        "WF_NEWTL_PENDINGAPPROVAL",
        localisationLabels
      );
    case "PENDINGPAYMENT":
      return getLocaleLabels(
        "Pending payment",
        "WF_NEWTL_PENDINGPAYMENT",
        localisationLabels
      );

    case "FIELDINSPECTION":
      return getLocaleLabels(
        "Pending for Field Inspection",
        "WF_NEWTL_FIELDINSPECTION",
        localisationLabels
      );

    case "Search Results for Trade License Applications":
      return getLocaleLabels(
        "",
        "TL_HOME_SEARCH_RESULTS_TABLE_HEADING",
        localisationLabels
      );
  }
};

export const searchResults = {
  uiFramework: "custom-molecules",
  // moduleName: "egov-tradelicence",
  componentPath: "Table",
  visible: false,
  props: {
    //data: [],
    // columns: {
    //   [getTextToLocalMapping(), "Application No")]: {
    //     format: rowData => {
    //       return (
    //         <Link to={onRowClick(rowData)}>
    //           <span
    //             style={{
    //               color: "#FE7A51"
    //             }}
    //           >
    //             {rowData[getTextToLocalMapping(), "Application No")]}
    //           </span>
    //         </Link>
    //       );
    //     }
    //   },
    //   [getTextToLocalMapping(), "License No")]: {},
    //   [getTextToLocalMapping(), "Trade Name")]: {},
    //   [getTextToLocalMapping(), "Owner Name")]: {},
    //   [getTextToLocalMapping(), "Application Date")]: {},
    //   [getTextToLocalMapping(), "Status")]: {}
    // },
    columns: [
      getTextToLocalMapping("Application No"),
      getTextToLocalMapping("License No"),
      getTextToLocalMapping("Trade Name"),
      getTextToLocalMapping("Owner Name"),
      getTextToLocalMapping("Application Date"),
      getTextToLocalMapping("Status"),
      {
        name: "tenantId",
        options: {
          display: false
        }
      }
    ],
    title: getTextToLocalMapping(
      "Search Results for Trade License Applications"
    ),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index) => {
        onRowClick(row);
      }
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
  // let appendUrl =
  //   process.env.REACT_APP_SELF_RUNNING === "true" ? `/egov-ui-framework` : ``;
  // let baseName = (window.basename =
  //   process.env.NODE_ENV === "production" ? "/employee" : "");

  switch (rowData[5]) {
    case "INITIATED":
      window.location.href = `apply?applicationNumber=${rowData[0]}&tenantId=${
        rowData[6]
      }`;
      break;
    default:
      window.location.href = `search-preview?applicationNumber=${
        rowData[0]
      }&tenantId=${rowData[6]}`;
      break;
  }
};
