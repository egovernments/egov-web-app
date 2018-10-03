import React from "react";
import { AppBar } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import UserSettings from "../UserSettings";
import Toolbar from "material-ui/Toolbar";
import digitLogo from "egov-ui-kit/assets/images/Digit_logo.png";
import pbLogo from "egov-ui-kit/assets/images/pblogo.png";

import "./index.css";

const styles = {
  titleStyle: { fontSize: "20px", fontWeight: 500 },
};

// handle listners
const EgovAppBar = ({
  className,
  defaultTitle,
  ulbLogo,
  title,
  titleAddon,
  isHomeScreen,
  role,
  fetchLocalizationLabel,
  userInfo = {},
  onToolBarIconClick,
  ...rest
}) => {
  return (
    <div>
      <AppBar
        // className={isHomeScreen && role === "citizen" ? "home-screen-appbar" : className || "header-with-drawer"}
        className={className || "header-with-drawer"}
        title={
          <div className="citizen-header-logo-label">
            <div className="citizen-header-logo">
              <img
                src={role && role.toLowerCase() === "citizen" ? pbLogo : ulbLogo ? ulbLogo : pbLogo}
                onError={(event) => event.target.setAttribute("src", pbLogo)}
              />
            </div>
            <Label containerStyle={{ marginLeft: "0px" }} className="screenHeaderLabelStyle appbar-title-label" label={title} />
            {titleAddon && (
              <Label
                containerStyle={{ display: "inline-block", marginLeft: 5 }}
                className="screenHeaderLabelStyle appbar-title-label"
                label={titleAddon}
              />
            )}
            <Label
              containerStyle={{ marginLeft: "10px" }}
              className="screenHeaderLabelStyle appbar-municipal-label"
              label={
                role && role.toLowerCase() === "citizen"
                  ? "PUNJAB MUNICIPAL CORPORATION"
                  : defaultTitle
                    ? defaultTitle
                    : "PUNJAB MUNICIPAL CORPORATION"
              }
            />
          </div>
        }
        titleStyle={styles.titleStyle}
        {...rest}
      >
        <Toolbar className="app-toolbar" style={{ padding: "0px", height: "64px", background: "#ffffff" }}>
          <UserSettings onIconClick={onToolBarIconClick} userInfo={userInfo} />
        </Toolbar>
        <div className="appbar-right-logo">
          <img src={digitLogo} />
        </div>
      </AppBar>
    </div>
  );
};

export default EgovAppBar;
