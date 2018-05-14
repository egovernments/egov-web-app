import React from "react";
import { AppBar } from "components";
import Label from "utils/translationNode";
import "./index.css";

const styles = {
  titleStyle: { fontSize: "20px", fontWeight: 500 },
};

// handle listners
const EgovAppBar = ({ className, title, isHomeScreen, role, ...rest }) => {
  return (
    <AppBar
      className={isHomeScreen && role === "citizen" ? "home-screen-appbar" : className || "header-with-drawer"}
      title={<Label className="screenHeaderLabelStyle" label={title} />}
      titleStyle={styles.titleStyle}
      {...rest}
    />
  );
};

export default EgovAppBar;
