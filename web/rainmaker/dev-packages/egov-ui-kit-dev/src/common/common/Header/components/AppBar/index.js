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
const EgovAppBar = ({ className, title, isHomeScreen, role, fetchLocalizationLabel, ...rest }) => {
  return (
    <AppBar
      className={isHomeScreen && role === "citizen" ? "home-screen-appbar" : className || "header-with-drawer"}
      title={
        <div className="citizen-header-logo-label">
          <div className="citizen-header-logo">
            <img src={pbLogo} />
          </div>
          <Label containerStyle={{ marginLeft: "10px" }} className="screenHeaderLabelStyle" label={title} />
        </div>
      }
      titleStyle={styles.titleStyle}
      {...rest}
    >
      <Toolbar className="app-toolbar" style={{ padding: "0px", height: "64px", background: "#ffffff" }}>
        <UserSettings fetchLocalizationLabel={fetchLocalizationLabel} onIconClick={rest.onLeftIconButtonClick} />
      </Toolbar>
      <div className="appbar-right-logo">
        <img src={digitLogo} />
      </div>
    </AppBar>
  );
};

export default EgovAppBar;
