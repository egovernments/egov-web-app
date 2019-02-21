import React, { Component } from "react";
import { connect } from "react-redux";
import Label from "egov-ui-kit/utils/translationNode";
import { Taskboard, Boxboard } from "./components";
import InboxData from "./components";
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
import Icon from "egov-ui-kit/components/Icon";

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

const iconStyle = {
  width: "48px",
  height: "46.02px",
};

const boxes = [
  {
    head: <Icon action="action" name="announcement" style={iconStyle} />,
    body: <Label label="Complaints" fontSize="16px" color="rgba(0, 0, 0, 0.87)" />,
    route: process.env.NODE_ENV === "production" ? "/employee/all-complaints" : "/all-complaints",
  },
  {
    head: <Icon action="action" name="store" style={iconStyle} />,
    body: <Label label="Property tax" fontSize="16px" color="rgba(0, 0, 0, 0.87)" />,
    route: process.env.NODE_ENV === "production" ? "/employee/property-tax" : "/property-tax",
  },
  {
    head: <Icon action="places" name="business-center" style={iconStyle} />,
    body: <Label label="Trade license" fontSize="16px" color="rgba(0, 0, 0, 0.87)" />,
    route: process.env.NODE_ENV === "production" ? "/employee/tradelicence/search" : "/tradelicence/search",
  },
  {
    head: <Icon action="action" name="announcement" style={iconStyle} />,
    body: <Label label="Water and sewerage" fontSize="16px" color="rgba(0, 0, 0, 0.87)" />,
    route: process.env.NODE_ENV === "production" ? "/employee/dashboard/ws-financialindicators" : "/dashboard/ws-financialindicators",
  },
  {
    head: <Icon action="action" name="description" style={iconStyle} />,
    body: <Label label="Fire NOC" fontSize="16px" color="rgba(0, 0, 0, 0.87)" />,
    route: process.env.NODE_ENV === "production" ? "/employee/dashboard/ws-financialindicators" : "dashboard/ws-financialindicators",
  },
];

class Inbox extends Component {
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
      toggleSnackbarAndSetText(true, "Not authorized to access Business Service!", true);
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

      inboxData[0].headers = ["Module/Service", "Task ID", "Status", "Assigned By", "Assigned To", "SLA (Days Remaining)"];
      inboxData[0].rows = assignedDataRows;

      const taskCount = allDataRows.length;
      const overSla = _.filter(responseData.ProcessInstances, (item) => item.businesssServiceSla < 0).length;

      taskboardData.push({ head: taskCount, body: "Total Task" }, { head: "0", body: "Nearing SLA" }, { head: overSla, body: "Over SLA" });

      tabData.push(`Assigned to me (${assignedDataRows.length})`);
      tabData.push(`All (${allDataRows.length})`);

      inboxData.push({ headers: ["Module/Service", "Task ID", "Status", "Assigned By", "Assigned To", "SLA (Days Remaining)"], rows: allDataRows });
      this.setState({ inboxData, taskboardData, tabData });
    } catch (e) {
      //toggleSnackbarA(true, "Workflow search error !", "error");
      toggleSnackbarAndSetText(true, "Workflow search error !", true);
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
    const { name, classes } = this.props;
    const { value, taskboardData, tabData, inboxData } = this.state;
    return (
      <div>
        <div>
          <Label className="landingPageUser" label={` Welcome ${name}, `} containerStyle={{ paddingLeft: "15px" }} />
        </div>

        <Boxboard data={boxes} />

        <div className="col-sm-12">
          <Label className="landingPageUser" label={"My worklist"} />
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
                    Module-All
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  const { InboxData } = preparedFinalObject;
  const { userInfo } = auth;
  const name = auth && userInfo.name;

  return { name, InboxData };
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
)(Inbox);
