import React, { Component } from "react";

import { DropDown, Icon, Image,List } from "components";
import emptyFace from "egov-ui-kit/assets/images/download.png";
import {CommonMenuItems} from "../NavigationDrawer/commonMenuItems";

import "./index.css";

class UserSettings extends Component {
  state = {
    languageSelected: localStorage.getItem("locale"),
    displayAccInfo:false
  };
  items = [
    {
      label: "ENGLISH",
      value: "en_IN",
    },
    {
      label: "हिंदी",
      value: "hi_IN",
    },
    {
      label: "ਪੰਜਾਬੀ",
      value: "pn_IN",
    },
  ];
  style = {
    baseStyle: {
      background: "#ffffff",
      height: "65px",
      marginRight: "30px",
      width: "98px",
      marginBottom: "24px",
    },
    label: {
      color: "#5F5C57",
      fontSize: "12px",
      paddingRight: "0px",
    },
    arrowIconStyle: {
      marginTop: "7px",
      marginLeft: "10px",
    },
    iconStyle: {
      marginRight: "30px",
    },
    listStyle: {
      display: "block",
    },
    listInnerDivStyle: {
      padding: "10px",
      display:"flex",
      alignItems:"center",
    },
  };

  onChange = (event, index, value) => {
    this.setState({ languageSelected: value });
    this.props.fetchLocalizationLabel(value);
  };

  toggleAccInfo(){
    this.setState({
      displayAccInfo: !this.state.displayAccInfo
    })
  }

  render() {
    const { languageSelected,displayAccInfo } = this.state;
    const { items, style } = this;
    const { onIconClick, userInfo,handleItemClick } = this.props;
    return (
      <div className="userSettingsContainer">
        {/* <DropDown
          onChange={this.onChange}
          listStyle={style.listStyle}
          style={style.baseStyle}
          labelStyle={style.label}
          dropDownData={items}
          value={languageSelected}
        /> */}
        {/* <Icon action="social" name="notifications" color="#767676" style={style.iconStyle} /> */}
        <div onClick={()=>{this.toggleAccInfo()}} className="userSettingsInnerContainer">
          <Image width={"33px"} circular={true} source={userInfo.photo || emptyFace} />
          <Icon action="navigation" name="arrow-drop-down" color="#767676" style={style.arrowIconStyle} />
         
        <div  className="user-acc-info">
        { displayAccInfo ? <List
          onItemClick={(item)=>{handleItemClick(item,false)}}
          innerDivStyle={style.listInnerDivStyle}
          className="drawer-list-style"
          items={CommonMenuItems}
          listContainerStyle={{ background: "#ffffff" }}
          listItemStyle={{ borderBottom: "1px solid #e0e0e0" }}
        /> : "" }
        </div>
        </div>
      </div>
    );
  }
}

export default UserSettings;
