import React, { Component } from "react";
import { connect } from "react-redux";
import Label from "egov-ui-kit/utils/translationNode";
import { Taskboard, InboxData } from "./components";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./index.css";

const data = [{ head: "34", body: "Total Task" }, { head: "12", body: "Nearing SLA" }, { head: "05", body: "Over SLA" }];
const tabdata = ["Assigned to me (4)", "All (30)"];
const inboxdata1 = [{ head: "34", body: "Total Task" }, { head: "12", body: "Nearing SLA" }, { head: "05", body: "Over SLA" }];

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
        <Taskboard data={data} />
        <div className="col-sm-12">
          <Tabs value={value} onChange={this.handleChange} className="">
            {tabdata.map((item) => {
              return <Tab className="inbox-tab" label={item} />;
            })}
          </Tabs>
          {value === 0 && <InboxData data={inboxdata1} />}
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
