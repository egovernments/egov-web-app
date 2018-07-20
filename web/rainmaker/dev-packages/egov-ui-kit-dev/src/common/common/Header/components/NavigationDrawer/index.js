import React from "react";
import { Image, Drawer, List } from "components";
import UserProfile from "./UserProfile";
// import LanguageSelection from "./LanguageSelection";
import menuItems from "./menuItems";
import logoMseva from "egov-ui-kit/assets/images/logo_black.png";

const styles = {
  listInnerDivStyle: {
    padding: "16px 0px 16px 60px",
  },
};

const defaultContainerStyle = {
  paddingBottom: 30,
  background: "#fff",
};

const NavigationDrawer = ({
  handleItemClick,
  role,
  toggleMenu,
  width,
  openSecondary,
  onUpdateMenuStatus,
  userInfo,
  cities,
  fetchLocalizationLabel,
  containerStyle,
  isCSR,
  isADMIN,
}) => {
  return (
    <Drawer
      containerStyle={{ ...defaultContainerStyle, ...containerStyle }}
      docked={false}
      width={width}
      openSecondary={openSecondary}
      open={toggleMenu}
      onRequestChange={(open) => onUpdateMenuStatus(open)}
    >
      <UserProfile role={role} cities={cities} userInfo={userInfo} />
      <div className="drawer-list-poweredBy-wrapper">
        <List
          onItemClick={handleItemClick}
          innerDivStyle={styles.listInnerDivStyle}
          className="drawer-list-style"
          items={menuItems(role, "one", isCSR, isADMIN)}
          listContainerStyle={{ background: "#ffffff" }}
          listItemStyle={{ borderBottom: "1px solid #e0e0e0" }}
        />
        {/* <LanguageSelection fetchLocalizationLabel={fetchLocalizationLabel} /> */}
        <List
          onItemClick={handleItemClick}
          innerDivStyle={styles.listInnerDivStyle}
          className="drawer-list-style"
          items={menuItems(role, "two", isCSR, isADMIN)}
          listContainerStyle={{ background: "#ffffff" }}
          listItemStyle={{ borderBottom: "1px solid #e0e0e0" }}
        />
        <div className="drawer-image-cont">
          <Image className="mseva-logo" source={logoMseva} />
        </div>
      </div>
    </Drawer>
  );
};

export default NavigationDrawer;
