import React, { Component } from "react";
import HeaderWithDrawer from "./components/HeaderWithDrawer";
import Banner from "./components/Banner";
import NewAndOldComplaints from "./components/NewAndOldComplaints";
import Updates from "./components/Updates";
import Notifications from "./components/Notifications";
import Events from "./components/Events";
import BottomNavigation from "../../components/BottomNavigation";

import FontIcon from "material-ui/FontIcon";
import IconLocationOn from "material-ui/svg-icons/communication/location-on";
import "./index.css";

//Complaint Submitted
import ActionHome from "material-ui/svg-icons/action/home";
import Info from "material-ui/svg-icons/action/info";
import Complaint from "material-ui/svg-icons/alert/warning";
import Currency from "material-ui/svg-icons/action/euro-symbol";




const options = [
  {
    label: "Home",
    icon: <ActionHome />,
    route: "/",
  },
  {
    label: "Information",
    icon: <Info />,
    route: "/information",
  },
  {
    label: "Payments",
    icon: <Currency />,
    route: "/payments",
  },
  {
    label: "Complaints",
    icon: <Complaint />,
    route: "/complaints",
  },
];

class Home extends Component {
  state = {
    toggleMenu: false,
    tabIndex: 0,
  };

  _handleToggleMenu = () => {
    let { toggleMenu } = this.state;
    toggleMenu = !toggleMenu;
    this.setState({
      toggleMenu,
    });
  };

  _updateMenuState = status => {
    this.setState({
      toggleMenu: status,
    });
  };

  _onTabChange = tabIndex => {
    this.setState({
      tabIndex,
    });
  };

  render() {
    let { toggleMenu, banner, updates, events, tabIndex } = this.state;
    let { _handleToggleMenu, _updateMenuState, _onTabChange } = this;
    return (
      <div>
        <HeaderWithDrawer toggleMenu={toggleMenu} onHandleToggleMenu={_handleToggleMenu} onUpdateMenuStatus={_updateMenuState} />
        <Banner {...banner} />
        <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8 home-page-content">
          <NewAndOldComplaints />
          <Updates {...Updates} />
          <Notifications />
          <Events {...events} />
        </div>
        <BottomNavigation selectedIndex={tabIndex} options={options} handleChange={_onTabChange} />
      </div>
    );
  }
}

export default Home;
