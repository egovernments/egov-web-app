import React, { Component } from "react";
import HeaderWithDrawer from "./components/HeaderWithDrawer";
import Banner from "./components/Banner";
import NewAndOldComplaints from "./components/NewAndOldComplaints";
import Updates from "./components/Updates";
import Notifications from "./components/Notifications";
import Events from "./components/Events";
import BottomNavigation from "../../components/BottomNavigation";

import FontIcon from 'material-ui/FontIcon';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

const options = [
  {
    label: 'Recents',
    icon: recentsIcon,
    route: '/recents',
  },
  {
    label: 'Favourites',
    icon: favoritesIcon,
    route: '/favourites',
  },
  {
    label: 'Nearby',
    icon: nearbyIcon,
    route: '/nearby',
  },
];

class Home extends Component {
  state = {
    toggleMenu: false,
    tabIndex:0
  };


  _handleToggleMenu=()=>
  {
    let {toggleMenu}=this.state;
    toggleMenu=!toggleMenu;
    this.setState({
      toggleMenu
    })
  }

  _updateMenuState=(status)=>
  {
    this.setState({
      toggleMenu:status
    })
  }

  _onTabChange=(tabIndex)=>{
    this.setState({
      tabIndex
    })
  }


  render() {
    let { toggleMenu,banner,updates,events,tabIndex} = this.state;
    let {_handleToggleMenu,_updateMenuState,_onTabChange} =this;
    return (
      <div>
        <HeaderWithDrawer toggleMenu={toggleMenu} onHandleToggleMenu={_handleToggleMenu} onUpdateMenuStatus={_updateMenuState}/>
        <Banner {...banner}/>
        <NewAndOldComplaints />
        <Updates {...Updates}/>
        <Notifications />
        <Events {...events}/>
        <BottomNavigation selectedIndex={tabIndex} options={options} handleChange={_onTabChange} />
      </div>
    );
  }
}

export default Home;
