import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TaskDialog from "egov-ui-framework/ui-molecules/TaskDialog";
import { addWflowFileUrl } from "egov-ui-framework/ui-utils/commons";
//import { setProcessInstances } from "egov-ui-framework/ui-redux/workflow/actions";
import { httpRequest } from "egov-ui-kit/utils/api";
import { connect } from "react-redux";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
import { Card } from "components";
import orderBy from "lodash/orderBy";
import React from "react";
import "./index.css";

class InboxData extends React.Component {
  state = {
    dialogOpen: false,
    workflowHistory: [],
  };

  getProcessIntanceData = async (pid) => {
    const tenantId = localStorage.getItem("tenant-id");
    const queryObject = [{ key: "businessIds", value: pid }, { key: "history", value: true }, { key: "tenantId", value: tenantId }];
    const payload = await httpRequest("egov-workflow-v2/egov-wf/process/_search?", "", queryObject);
    const processInstances =
      payload && payload.ProcessInstances.length > 0 && orderBy(payload.ProcessInstances, "auditDetails.lastModifiedTime", "asc");
    return processInstances;
  };

  onHistoryClick = async (moduleNumber) => {
    const { toggleSnackbarAndSetText } = this.props;
    const processInstances = await this.getProcessIntanceData(moduleNumber.text);
    if (processInstances && processInstances.length > 0) {
      addWflowFileUrl(processInstances);
      this.setState({
        dialogOpen: true,
      });
      // this.setState({
      //   workflowHistory: processInstances,
      // });
    } else {
      toggleSnackbarAndSetText(true, "API error");
    }
  };

  onDialogClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  getModuleLink = async (item, row, index) => {
    const status = row[2].text;
    const taskId = index === 1 && item.text;
    const tenantId = localStorage.getItem("tenant-id");
    const processInstances = await this.getProcessIntanceData(row[1].text);

    if (processInstances && processInstances.length > 0) {
      addWflowFileUrl(processInstances);
    }

    let baseUrl = process.env.NODE_ENV === "development" ? "https://egov-micro-dev.egovernments.org" : window.origin;
    //let baseUrl = "http://localhost:3000/";
    let contextPath = status === "INITIATED" ? "/employee/integration/tradelicense/apply" : "/employee/integration/tradelicense/search-preview";
    //let contextPath = status === "INITIATED" ? "egov-ui-framework/tradelicence/apply" : "egov-ui-framework/tradelicence/search-preview";
    let queryParams = `applicationNumber=${taskId}&tenantId=${tenantId}`;
    window.location.href = `${baseUrl}${contextPath}?${queryParams}`;
  };

  render() {
    const { data } = this.props;
    const { onHistoryClick, onDialogClose, getModuleLink } = this;
    const workflowHistory = JSON.parse(localStorage.getItem("ProcessInstances"));

    return (
      <Table>
        <TableHead>
          <TableRow>
            {data.headers.map((item) => {
              return <TableCell className="inbox-data-table-headcell">{item}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row, i) => {
            return (
              <TableRow key={i} className="inbox-data-table-bodyrow">
                {row.map((item, index) => {
                  if (item.subtext) {
                    return (
                      <TableCell className="inbox-data-table-bodycell">
                        <div className="inbox-cell-text">{item.text}</div>
                        <div className="inbox-cell-subtext">{item.subtext}</div>
                      </TableCell>
                    );
                  } else if (item.badge) {
                    return (
                      <TableCell className="inbox-data-table-bodycell">
                        <span class="inbox-cell-badge-primary ">{item.text}</span>
                      </TableCell>
                    );
                  } else if (item.historyButton) {
                    return (
                      <TableCell className="inbox-data-table-bodycell">
                        <div onClick={() => onHistoryClick(row[1])} style={{ cursor: "pointer" }}>
                          <i class="material-icons">history</i>
                        </div>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell className="inbox-data-table-bodycell">
                        <div onClick={() => getModuleLink(item, row, index)} style={{ cursor: "pointer" }}>
                          {index === 1 ? <a> {item.text} </a> : item.text}
                        </div>
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            );
          })}
          <TaskDialog open={this.state.dialogOpen} onClose={onDialogClose} history={workflowHistory} />
        </TableBody>
      </Table>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSnackbarAndSetText: (open, message) => dispatch(toggleSnackbarAndSetText(open, message)),
    // setProcessInstances: (payload) => dispatch(setProcessInstances(payload)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(InboxData);

export const Taskboard = ({ data }) => {
  return (
    <div>
      {data.map((item, i) => (
        <div className="col-sm-4">
          <Card
            className="inbox-card"
            key={i}
            textChildren={
              <div>
                <div className="head">{item.head}</div>
                <div className="body">{item.body}</div>
              </div>
            }
          />
        </div>
      ))}
    </div>
  );
};
