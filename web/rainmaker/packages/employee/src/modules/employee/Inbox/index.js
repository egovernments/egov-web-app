import React, { Component } from "react";
import { connect } from "react-redux";
import TableData from "./components/TableData";
import Label from "egov-ui-kit/utils/translationNode";
import Icon from "egov-ui-kit/components/Icon";
import { Boxboard } from "./components/actionItems";

const iconStyle = {
  width: "48px",
  height: "46.02px",
};

const boxes = {
  Complaints: {
    head: <Icon action="action" name="announcement" style={iconStyle} />,
    route: process.env.NODE_ENV === "production" ? "/employee/all-complaints" : "/all-complaints",
  },
  "Property Tax": {
    head: <Icon action="action" name="store" style={iconStyle} />,
    route: process.env.NODE_ENV === "production" ? "/employee/property-tax" : "/property-tax",
  },
  TradeLicense: {
    head: <Icon action="places" name="business-center" style={iconStyle} />,
    route: process.env.NODE_ENV === "production" ? "/employee/tradelicence/search" : "/tradelicence/search",
  },
  Waterandsewerage: {
    head: <Icon action="action" name="announcement" style={iconStyle} />,
    route: process.env.NODE_ENV === "production" ? "/employee/dashboard/ws-financialindicators" : "/dashboard/ws-financialindicators",
  },
  FireNOC: {
    head: <Icon action="action" name="description" style={iconStyle} />,
    route: process.env.NODE_ENV === "production" ? "/employee/dashboard/ws-financialindicators" : "dashboard/ws-financialindicators",
  },
};

class Inbox extends Component {
  state = {
    actionList: [],
    hasWorkflow: false,
  };
  componentWillReceiveProps(nextProps) {
    const { menu } = nextProps;
    const workflowList = menu && menu.filter((item) => item.name === "rainmaker-common-workflow");
    const list = menu && menu.filter((item) => item.url === "url");
    const finalList =
      list &&
      list.reduce((result, item) => {
        const body = item.path.split(".")[0];
        if (!result.some((obj) => obj.body === body) && boxes.hasOwnProperty(body)) {
          result.push({
            head: boxes[body].head,
            body: body,
            route: boxes[body].route,
          });
        }
        return result;
      }, []);
    this.setState({
      actionList: finalList,
    });
  }
  render() {
    const { name } = this.props;
    const { actionList } = this.state;
    return (
      <div>
        <div>
          <Label className="landingPageUser" label={` Welcome ${name}, `} containerStyle={{ paddingLeft: "15px" }} />
        </div>

        {actionList && <Boxboard data={actionList} />}
        <TableData />
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
