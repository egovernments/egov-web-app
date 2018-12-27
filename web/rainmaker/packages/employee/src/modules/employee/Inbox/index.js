import React, { Component } from "react";
import { connect } from "react-redux";
import Label from "egov-ui-kit/utils/translationNode";
import Taskboard from "./taskboard";

const data = [{ head: "34", body: "Total Task" }, { head: "12", body: "Nearing SLA" }, { head: "05", body: "Over SLA" }];

class Inbox extends Component {
  render() {
    const { name } = this.props;
    return (
      <div className="col-sm-12 landing-page-main-container">
        <Label className="landingPageUser" label={` Welcome ${name}, `} />
        <Taskboard data={data} />
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
