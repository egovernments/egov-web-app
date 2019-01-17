import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TaskDialog from "mihy-ui-framework/ui-molecules/TaskDialog";
import { httpRequest } from "egov-ui-kit/utils/api";
import { connect } from "react-redux";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
import { Card } from "components";
import React from "react";
import "./index.css";

class InboxData extends React.Component {
  state = {
    dialogOpen: false,
    workflowHistory: [],
  };

  onHistoryClick = async (moduleNumber) => {
    const { toggleSnackbarAndSetText } = this.props;
    this.setState({
      dialogOpen: true,
    });
    const queryObject = [{ key: "businessIds", value: moduleNumber.text }, { key: "history", value: true }, { key: "tenantId", value: "pb" }];
    const payload = await httpRequest("egov-workflow-v2/egov-wf/process/_search?", "", queryObject);
    this.setState({
      workflowHistory: payload.ProcessInstances,
    });
    if (!payload || payload.ProcessInstances.length < 1) toggleSnackbarAndSetText(true, "OTP has been Resent");
  };

  onDialogClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  getModuleLink = (item, index) => {
    const status = index === 2 && item.text;
    const taskId = index === 1 && item.text;
    const tenantId = localStorage.getItem("tenant-id");
    let baseUrl = "http://localhost:3000/";
    let contextPath = status === "INITIATED" ? "integration/tradelicense/apply" : "integration/tradelicense/search-preview";
    let queryParams = `applicationNumber=${taskId}&tenantId=${tenantId}`;
    return `${baseUrl}${contextPath}?${queryParams}`;
  };

  render() {
    const { data } = this.props;
    const { onHistoryClick, onDialogClose, getModuleLink } = this;
    // let baseUrl = process.env.NODE_ENV === "development" ? "https://egov-micro-dev.egovernments.org/" : window.origin;

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
                        {index === 1 ? <a href={getModuleLink(item, index)}> {item.text} </a> : item.text}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            );
          })}
          <TaskDialog open={this.state.dialogOpen} onClose={onDialogClose} history={this.state.workflowHistory} />
        </TableBody>
      </Table>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSnackbarAndSetText: (open, message) => dispatch(toggleSnackbarAndSetText(open, message)),
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
