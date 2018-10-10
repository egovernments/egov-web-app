import React from "react";
import { Link } from "react-router-dom";

export const searchResults = {
  uiFramework: "custom-molecules-local",
  componentPath: "Table",
  visible: false,
  props: {
    data: [],
    columns: {
      "Application No": {
        format: rowData => {
          return (
            <Link to={onRowClick(rowData)}>{rowData["Application No"]}</Link>
          );
        }
      },
      "License No": {},
      "Trade Name": {},
      "Owner Name": {},
      "Application Date": {},
      Status: {
        format: rowData => {
          let value = rowData["Status"];
          let color = "";
          if (value.toLowerCase().indexOf("approved") !== -1) {
            color = "green";
          } else {
            color = "red";
          }
          return (
            <span
              style={{
                color: color,
                fontSize: "14px",
                fontWeight: 400
              }}
            >
              {value}
            </span>
          );
        }
      }
    },
    title: "Search Results for Trade License Applications",
    options: {
      filter: false,
      download:false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions:[10,20,40],
    }
  }
};

const onRowClick = rowData => {
  switch (rowData["Status"]) {
    case "APPLIED":
      return `/mihy-ui-framework/tradelicence/search-preview?status=pending_payment&role=approver&applicationNumber=${
        rowData["Application No"]
      }`;
    case "APPROVED":
      return `/mihy-ui-framework/tradelicence/search-preview?status=approved&role=approver&applicationNumber=${
        rowData["Application No"]
      }`;

    case "PAID":
      return `/mihy-ui-framework/tradelicence/search-preview?status=pending_approval&role=approver&applicationNumber=${
        rowData["Application No"]
      }`;
    case "CANCELLED":
      return `/mihy-ui-framework/tradelicence/search-preview?status=cancelled&role=approver&applicationNumber=${
        rowData["Application No"]
      }`;
    case "INITIATED":
      return `/mihy-ui-framework/tradelicence/apply?applicationNumber=${
        rowData["Application No"]
        }`;
    case "REJECTED":
      return `/mihy-ui-framework/tradelicence/search-preview?status=rejected&role=approver&applicationNumber=${
        rowData["Application No"]
        }`;
    default:
      return `/mihy-ui-framework/tradelicence/search`;
  }
};
