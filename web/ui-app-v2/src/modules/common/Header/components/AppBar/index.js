import React from "react";
import { AppBar } from "components";
import Label from "utils/translationNode";

const styles = {
  titleStyle: { fontSize: "20px", fontWeight: 500 },
};

// handle listners
const EgovAppBar = ({ className, title, ...rest }) => {
  return (
    <AppBar
      className={className || "header-with-drawer"}
      title={<Label className="screenHeaderLabelStyle" label={title} />}
      titleStyle={styles.titleStyle}
      {...rest}
    />
  );
};

export default EgovAppBar;
