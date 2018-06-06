import React from "react";
import { Drawer,Icon } from "components";
import { connect } from "react-redux";
import { compose } from "redux";
import withData from "./withData";
import { Header } from "modules/common";
import { Footer } from "modules/common";
import ActionMenu from "modules/citizen/ActionMenu";

const actionList = [
  {
    id: 1535,
    name: "PropertyType",
    url: "url",
    displayName: "Home",
    orderNumber: 1,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "Home",
    navigationURL: "mdms/PropertyTax/PropertyType",
    leftIcon:<Icon action= "action" name= "home"/>,
    rightIcon:""
  },
  {
    id: 1536,
    name: "PropertySubType",
    url: "url",
    displayName: "Information",
    orderNumber: 2,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "Information",
    navigationURL: "mdms/PropertyTax/PropertySubType",
    leftIcon:<Icon action= "action" name= "info"/>,
    rightIcon:""
  },
  {
    id: 1537,
    name: "ConstructionType",
    url: "url",
    displayName: "Payments",
    orderNumber: 3,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "Payments",
    navigationURL: "mdms/PropertyTax/ConstructionType",
    leftIcon:<Icon action= "custom" name= "rupee"/>,
    rightIcon:""
  },
  {
    id: 1538,
    name: "ConstructionSubType",
    url: "url",
    displayName: "Apply",
    orderNumber: 4,
    enabled: true,
    serviceCode: "PT",
    code: "null",
    path: "Apply",
    navigationURL: "mdms/PropertyTax/ConstructionSubType",
    leftIcon:<Icon action= "content" name= "send"/>,
    rightIcon:""
  },
]

const withAuthorization = (options = {}) => (Component) => {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      if (typeof androidAppProxy !== "undefined" && window.androidAppProxy.smsReceiverRunning()) {
        window.androidAppProxy.stopSMSReceiver();
      }
    }

    componentWillMount() {
      const { authenticated } = this.props;
      const { redirectionUrl } = options;
      if (!authenticated) {
        this.props.history.replace(redirectionUrl || "/citizen/user/login");
      }
    }

    getUserRole = (userInfo) => {
      return (userInfo && userInfo.roles && userInfo.roles.length && userInfo.roles[0].code.toLowerCase()) || null;
    };

    render() {
      const { hideHeader, hideFooter, title, isHomeScreen } = options;
      const { history, authenticated, userInfo } = this.props;
      const role = this.getUserRole(userInfo);

      return (
        <div style={{ position: "relative" }}>
          {!hideHeader && authenticated ? (
            <Header title={title} userInfo={userInfo} role={role} options={options} history={history} className="rainmaker-header" />
          ) : null}




          <div className = "row">

            <div className = "col-xs-2 citizen-drawer">
              <Drawer  width={230} containerClassName="drawer-backGround" open={true}>
                <div className="drawerContent">{actionList && actionList.length > 0 && <ActionMenu actionList={actionList} />}</div>
              </Drawer>
            </div>
           <div className = "col-xs-10">{authenticated ? <Component {...this.props} /> : null}</div>
         </div>
          {!hideFooter && authenticated ? (
            <div className="hidden-md">
              <Footer history={history} role={role} />
            </div>
          ) : null}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    const { authenticated, userInfo } = state.auth;
    return { authenticated, userInfo };
  };
  return compose(withData, connect(mapStateToProps))(Wrapper);
};

export default withAuthorization;
