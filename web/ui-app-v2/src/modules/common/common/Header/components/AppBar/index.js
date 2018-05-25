import React from "react";
import { AppBar } from "components";
import Label from "utils/translationNode";
import UserSettings from "../UserSettings";
import Toolbar from "material-ui/Toolbar";
import "./index.css";

const styles = {
  titleStyle: { fontSize: "20px", fontWeight: 500 },
};
const style = {
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
  },
  iconStyle: {
    marginRight: "30px",
  },
};

// handle listners
const EgovAppBar = ({ className, title, isHomeScreen, role, ...rest }) => {
  return (
    <AppBar
      className={isHomeScreen && role === "citizen" ? "home-screen-appbar" : className || "header-with-drawer"}
      title={<Label className="screenHeaderLabelStyle" label={title} />}
      titleStyle={styles.titleStyle}
      {...rest}
    >
      <Toolbar className="app-toolbar" style={{ padding: "0px", height: "65px", background: "#ffffff" }}>
        <UserSettings style={style} />
      </Toolbar>
    </AppBar>
  );
};

export default EgovAppBar;
