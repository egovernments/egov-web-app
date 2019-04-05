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
    //Temporary. To be removed and added to the main menu.
    const nocCard ={
      displayName: "Fire-NOC",
      enabled: true,
      id: 1779,
      leftIcon: "action:description",
      name:"rainmaker-common-firenoc",
      navigationURL: "fire-noc/search",
      url: "card",
      moduleTitle: "NOC_COMMON_NOC",
      button1: "NOC_COMMON_NOC",
      // borderLeftColor: { borderLeft: "4px solid #add8e6" },
      // iconAction: "Action",
      // iconName: "description",
      route: "fire-noc/search",
     // iconStyle: { width: "50px", height: "50px", marginBottom: "10px", fill: "rgba(0, 0, 0, 0.60)" },
    } 

    const list = menu && menu.filter((item) => item.url === "card");
    console.log("Here is the list",list);
    list.push(nocCard);
  console.log(nocCard);
    this.setState({
      actionList: list,
    });
  }
  render() {
    const { name } = this.props;
    const { actionList, hasWorkflow } = this.state;
    return (
      <div>
        <div className="rainmaker-topHeader">
          <Label className="landingPageUser" label={"CS_LANDING_PAGE_WELCOME_TEXT"} />
          <Label className="landingPageUser" label={name} />
        </div>

        {actionList && <Boxboard data={actionList} />}
        {hasWorkflow && <TableData />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, app } = state;
  const menu = app && app.menu || [];
  const { userInfo } = auth;
  const name = auth && userInfo.name;

  return { name, menu };
};

export default connect(
  mapStateToProps,
  null
)(Inbox);
