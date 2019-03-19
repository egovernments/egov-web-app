import React, { Component } from "react";
import { connect } from "react-redux";
import Label from "egov-ui-kit/utils/translationNode";
import { Taskboard } from "../actionItems";
import InboxData from "../Table";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { httpRequest } from "egov-ui-kit/utils/api";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import _ from "lodash";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId, localStorageSet } from "egov-ui-kit/utils/localStorageUtils";
import "./index.css";

const getWFstatus = (status) => {
  switch (status) {
    case "INITIATED":
      return "Initiated";
    case "APPLIED":
      return "Pending for Document Verification";
    case "FIELDINSPECTION":
      return "Pending for Field Inspection";
    case "PENDINGPAYMENT":
      return "Pending for Payment";
    case "PENDINGAPPROVAL":
      return "Pending for Approval";
    case "APPROVED":
      return "Approved";
  }
};

const prepareInboxDataRows = (data) => {
  if (_.isEmpty(data)) return [];
  return data.map((item) => {
    var sla = item.businesssServiceSla && item.businesssServiceSla / (1000 * 60 * 60 * 24);
    return [
      { text: _.get(item, "moduleName", "--"), subtext: item.businessService },
      { text: item.businessId },
      {
        text: item.state ? (
          <Label label={`WF_${item.businessService.toUpperCase()}_${item.state.state}`} defaultLabel={getWFstatus(item.state.state)} />
        ) : (
          "NA"
        ),
      },
      { text: item.assigner ? item.assigner.name : "NA" },
      { text: item.assignee ? item.assignee.name : "NA" },
      { text: Math.round(sla), badge: true },
      { historyButton: true },
    ];
  });
};

class TableData extends Component {
  state = {
    value: 0,
    tabData: [],
    taskboardData: [],
    inboxData: [{ headers: [], rows: [] }],
    moduleName: "",
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  setBusinessServiceDataToLocalStorage = async (queryObject) => {
    const { toggleSnackbarAndSetText } = this.props;
    try {
      const payload = await httpRequest("egov-workflow-v2/egov-wf/businessservice/_search", "_search", queryObject);
      localStorageSet("businessServiceData", JSON.stringify(_.get(payload, "BusinessServices")));
    } catch (e) {
      toggleSnackbarAndSetText(
        true,
        {
          labelName: "Not authorized to access Business Service!",
          labelKey: "ERR_NOT_AUTHORISED_BUSINESS_SERVICE",
        },
        true
      );
    }
  };

  componentDidMount = async () => {
    const { toggleSnackbarAndSetText, prepareFinalObject } = this.props;
    const uuid = _.get(this.props, "userInfo.uuid");
    const tenantId = getTenantId();

    const taskboardData = [];
    const tabData = [];
    const inboxData = [{ headers: [], rows: [] }];

    try {
      const requestBody = [{ key: "tenantId", value: tenantId }];
      const responseData = await httpRequest("egov-workflow-v2/egov-wf/process/_search", "_search", requestBody);

      const assignedData = _.filter(responseData.ProcessInstances, (item) => _.get(item.assignee, "uuid") === uuid);
      const allData = _.get(responseData, "ProcessInstances", []);

      const assignedDataRows = prepareInboxDataRows(assignedData);
      const allDataRows = prepareInboxDataRows(allData);

      inboxData[0].headers = [
        "WF_INBOX_HEADER_MODULE_SERVICE",
        "WF_INBOX_HEADER_TASK_ID",
        "WF_INBOX_HEADER_STATUS",
        "WF_INBOX_HEADER_ASSIGNED_BY",
        "WF_INBOX_HEADER_ASSIGNED_TO",
        "WF_INBOX_HEADER_SLA_DAYS_REMAINING",
      ];
      inboxData[0].rows = assignedDataRows;

      const taskCount = allDataRows.length;
      const overSla = _.filter(responseData.ProcessInstances, (item) => item.businesssServiceSla < 0).length;

      taskboardData.push(
        { head: taskCount, body: "WF_TOTAL_TASK" },
        { head: "0", body: "WF_TOTAL_NEARING_SLA" },
        { head: overSla, body: "WF_TOTAL_OVER_SLA" }
      );

      tabData.push(`Assigned to me (${assignedDataRows.length})`);
      tabData.push(`All (${allDataRows.length})`);

      inboxData.push({
        headers: [
          "WF_INBOX_HEADER_MODULE_SERVICE",
          "WF_INBOX_HEADER_TASK_ID",
          "WF_INBOX_HEADER_STATUS",
          "WF_INBOX_HEADER_ASSIGNED_BY",
          "WF_INBOX_HEADER_ASSIGNED_TO",
          "WF_INBOX_HEADER_SLA_DAYS_REMAINING",
        ],
        rows: allDataRows,
      });
      this.setState({ inboxData, taskboardData, tabData });
    } catch (e) {
      //toggleSnackbarA(true, "Workflow search error !", "error");
      toggleSnackbarAndSetText(true, { labelName: "Workflow search error !", labelKey: "ERR_SEARCH_ERROR" }, true);
    }
    prepareFinalObject("InboxData", inboxData);

    this.setBusinessServiceDataToLocalStorage([{ key: "tenantId", value: getTenantId() }, { key: "businessService", value: "newTL" }]);
  };

  onModuleFilter = (event) => {
    this.setState({ moduleName: event.target.value }, () => {
      const { InboxData } = this.props;
      const { tabData } = this.state;
      const filteredData = InboxData.map((item, index) => {
        return {
          headers: item.headers,
          rows: item.rows.filter((eachRow) => {
            return eachRow[0].subtext === this.state.moduleName;
          }),
        };
      });
      tabData[0] = `Assigned to me (${filteredData[0].rows.length})`;
      tabData[1] = `All (${filteredData[1].rows.length})`;
      this.setState({
        inboxData: filteredData,
        tabData,
      });
    });
  };

  render() {
    const { value, taskboardData, tabData, inboxData, moduleName } = this.state;
    return (
      <div className="col-sm-12">
        <Label className="landingPageUser" label={"WF_MY_WORKLIST"} />
        <Taskboard data={taskboardData} />
        <div className="col-sm-12">
          <Tabs
            value={value}
            onChange={this.handleChange}
            className=""
            indicatorColor="primary"
            textColor="primary"
            style={{ borderBottom: "1px rgba(0, 0, 0, 0.11999999731779099) solid" }}
          >
            {tabData.map((item) => {
              return <Tab className="inbox-tab" label={item} />;
            })}

            <div style={{ position: "absolute", right: 0, top: "10px" }}>
              <Select value={this.state.moduleName} displayEmpty onChange={this.onModuleFilter}>
                <MenuItem value="" disabled>
                  Module All
                </MenuItem>
                <MenuItem value={"NewTL"}>NewTL</MenuItem>
                <MenuItem value={"PGR"}>PGR</MenuItem>
                <MenuItem value={"PT"}>PT</MenuItem>
              </Select>
            </div>
          </Tabs>
          <InboxData data={inboxData[value]} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { screenConfiguration, auth } = state;
  const { userInfo } = auth;
  const { preparedFinalObject } = screenConfiguration;
  const { InboxData } = preparedFinalObject;

  return { InboxData, userInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {
    prepareFinalObject: (jsonPath, value) => dispatch(prepareFinalObject(jsonPath, value)),
    toggleSnackbarAndSetText: (open, message, error) => dispatch(toggleSnackbarAndSetText(open, message, error)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableData);
