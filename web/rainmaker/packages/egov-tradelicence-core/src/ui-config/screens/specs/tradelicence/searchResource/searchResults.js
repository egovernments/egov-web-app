import { setRoute } from "mihy-ui-framework/ui-redux/app/actions";
import store from "ui-redux/store";
import React from "react";

export const searchResults = {
    uiFramework: "custom-molecules-local",
    componentPath: "Table",
    visible: false,
    props: {
        data: [],
        columns: {
            "Application No": {},
            "License No": {},
            "Trade Name": {},
            "Owner Name": {},
            "Application Date": {},
            Status: {
                format: value => {
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
            filterType: "dropdown",
            responsive: "stacked",
            selectableRows: false,
            hover: true,
            onRowClick: (rowData, rowMetadata) => {
                switch (rowData[5].props.children) {
                    case "APPLIED":
                        store.dispatch(
                            setRoute(
                                `/landing/mihy-ui-framework/tradelicence/search-preview?status=pending_payment&role=approver&applicationNumber=${
                                rowData[0]
                                }`
                            )
                        );
                        break;
                    case "APPROVED":
                        store.dispatch(
                            setRoute(
                                `/landing/mihy-ui-framework/tradelicence/search-preview?status=approved&role=approver&applicationNumber=${
                                rowData[0]
                                }`
                            )
                        );
                        break;

                    case "PAID":
                        store.dispatch(
                            setRoute(
                                `/landing/mihy-ui-framework/tradelicence/search-preview?status=pending_approval&role=approver&applicationNumber=${
                                rowData[0]
                                }`
                            )
                        );
                    case "CANCELED":
                        store.dispatch(
                            setRoute(
                                `/landing/mihy-ui-framework/tradelicence/search-preview?status=cancelled&role=approver&applicationNumber=${
                                rowData[0]
                                }`
                            )
                        );
                        break;
                    case "INITIATED":
                        store.dispatch(
                            setRoute(
                                `/landing/mihy-ui-framework/tradelicence/apply?applicationNumber=${
                                rowData[0]
                                }`
                            )
                        );
                        break;
                    default:
                        break;
                }
            }
        }
    }
};
