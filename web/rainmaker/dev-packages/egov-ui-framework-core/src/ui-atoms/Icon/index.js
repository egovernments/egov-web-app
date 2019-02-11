import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";

const MihyIcon = props => {
  const { iconName, color, size = "50px", ...rest } = props;
  return (
    <Icon color={color} style={{ fontSize: size }} {...rest}>
      <i class="material-icons" style={{ fontSize: size }}>
        {iconName}
      </i>
    </Icon>
  );
};

MihyIcon.propTypes = {
  iconName: PropTypes.string
};

export default MihyIcon;
