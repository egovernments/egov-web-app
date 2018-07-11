import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";
import { Icon } from "components";
import { split, orderBy, some } from "lodash";
import ActionMenuComp from "../ActionMenu/components";
import "./index.css";
//import { fetchActionItems } from "egov-ui-kit/redux/app/actions";
import actionList from "./actionList";

const styles = {
  menuStyle: {
    marginLeft: 15,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    flex: 1,
  },

  inputStyle: {
    color: "white !important",
    marginTop: "0px",
    marginLeft: "-10px",
  },
  fibreIconStyle: {
    height: "21px",
    width: "21px",
    margin: 0,
    position: "relative",
  },
  arrowIconStyle: {
    right: "-10px",
  },
  defaultMenuItemStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 0,
    padding: 0,
  },
};

// const

class ActionMenu extends Component {
  // componentDidMount = async () => {
  //   let userInfo = localStorage.getItem("user-info");
  //   let { fetchActionMenu, role } = this.props;
  //   await fetchActionMenu(
  //     {
  //       roleCodes: [role],
  //       tenantId: "pb",
  //       actionMaster: "actions-test",
  //       enabled: true,
  //     },
  //     {
  //       ts: 1531206285401,
  //     }
  //   );
  // };

  render() {
    // let { actionListArr, role } = this.props;
    let { role } = this.props;
    let actionListArr = actionList[role];

    return actionListArr && actionListArr.length > 0 ? <ActionMenuComp role={role} actionListArr={actionListArr} /> : null;
  }
}

const mapStateToProps = ({ app }) => {
  const actionListArr = app.menu || [];
  return { actionListArr };
};

const mapDispatchToProps = (dispatch) => ({
  handleToggle: (showMenu) => dispatch({ type: "MENU_TOGGLE", showMenu }),
  setRoute: (route) => dispatch({ type: "SET_ROUTE", route }),
  // fetchActionMenu: (role, ts) => dispatch(fetchActionItems(role, ts)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionMenu);
