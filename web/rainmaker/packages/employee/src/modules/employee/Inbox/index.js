import React, { Component } from "react";
import { connect } from "react-redux";
import TableData from "./components/TableData";
import Label from "egov-ui-kit/utils/translationNode";
import { Boxboard } from "./components/actionItems";

const iconStyle = {
  width: "48px",
  height: "46.02px",
};

class Inbox extends Component {
  state = {
    actionList: [],
    hasWorkflow: false,
  };
  componentWillReceiveProps(nextProps) {
    const { menu } = nextProps;
    const workflowList = menu && menu.filter((item) => item.name === "rainmaker-common-workflow");
    if (workflowList && workflowList.length > 0) {
      this.setState({
        hasWorkflow: true,
      });
    } else {
      this.setState({
        hasWorkflow: false,
      });
    }

    const list = menu && menu.filter((item) => item.url === "card");
    this.setState({
      actionList: list,
    });
  }
  render() {
    const { name } = this.props;
    const { actionList, hasWorkflow } = this.state;
    return (
      <div>
        <div>
          <Label className="landingPageUser" label={` Welcome ${name}, `} containerStyle={{ paddingLeft: "15px" }} />
        </div>

        {actionList && <Boxboard data={actionList} />}
        {hasWorkflow && <TableData />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, app } = state;
  const { menu } = app;
  const { userInfo } = auth;
  const name = auth && userInfo.name;

  return { name, menu };
};

export default connect(
  mapStateToProps,
  null
)(Inbox);
