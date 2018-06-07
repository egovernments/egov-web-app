import React from "react";
import { Image, Drawer, List } from "components";
import UserProfile from "./UserProfile";
import LanguageSelection from "./LanguageSelection";
import menuItems from "./menuItems";
import logoMseva from "egov-ui-kit/assets/images/logo_black.png";

const styles = {
  listInnerDivStyle: {
    padding: "16px 0px 16px 60px",
  },
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
}) => {
  return (
    <Drawer
      containerStyle={containerStyle}
      docked={true}
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
          items={menuItems(role, "one")}
          listContainerStyle={{ background: "#ffffff" }}
          listItemStyle={{ borderBottom: "1px solid #e0e0e0" }}
        />
        <LanguageSelection fetchLocalizationLabel={fetchLocalizationLabel} />
        <List
          onItemClick={handleItemClick}
          innerDivStyle={styles.listInnerDivStyle}
          className="drawer-list-style"
          items={menuItems(role, "two")}
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
