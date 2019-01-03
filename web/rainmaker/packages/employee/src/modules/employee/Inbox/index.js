import React, { Component } from "react";
import { connect } from "react-redux";
import Label from "egov-ui-kit/utils/translationNode";
import { Taskboard, InboxData } from "./components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./index.css";

const taskboardData = [{ head: "34", body: "Total Task" }, { head: "12", body: "Nearing SLA" }, { head: "05", body: "Over SLA" }];
const tabdata = ["Assigned to me (4)", "All (30)"];
const inboxData = {
  headers: ["Module/Service", "Task ID", "Status", "Assigned By", "Assigned To", "SLA (Days Remaining)"],
  rows: [
    [
      { text: "Property Tax", subtext: "New Assessment" },
      { text: "TL-252-2828" },
      { text: "Initiated" },
      { text: "Raminder Pal" },
      { text: "Surjeet Singh" },
      { text: "01", badge: true },
    ],
    [
      { text: "Module/Service", subtext: "New Assessment" },
      { text: "TL-252-2828" },
      { text: "Initiated" },
      { text: "Raminder Pal" },
      { text: "Surjeet Singh" },
      { text: "01", badge: true },
    ],
    [
      { text: "Module/Service", subtext: "New Assessment" },
      { text: "TL-252-2828" },
      { text: "Initiated" },
      { text: "Raminder Pal" },
      { text: "Surjeet Singh" },
      { text: "01", badge: true },
    ],
    [
      { text: "Module/Service", subtext: "New Assessment" },
      { text: "TL-252-2828" },
      { text: "Initiated" },
      { text: "Raminder Pal" },
      { text: "Surjeet Singh" },
      { text: "01", badge: true },
    ],
  ],
};

class Inbox extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { name } = this.props;
    const { value } = this.state;
    return (
      <div className="col-sm-12">
        <Label className="landingPageUser" label={` Welcome ${name}, `} />
        <Taskboard data={taskboardData} />
        <div className="col-sm-12">
          <Tabs value={value} onChange={this.handleChange} className="">
            {tabdata.map((item) => {
              return <Tab className="inbox-tab" label={item} />;
            })}
          </Tabs>
          {value === 0 && <InboxData data={inboxData} />}
          {value === 1 && <div>Item Two</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  const { userInfo } = auth;
  const name = auth && userInfo.name;

  return { name };
};

export default connect(
  mapStateToProps,
  null
)(Inbox);
