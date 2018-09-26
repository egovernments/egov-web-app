import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";

function SimpleTooltips(props) {
  const { val, ...rest } = props;
  return (
    <div {...rest}>
      <Tooltip title={val}>
        <Icon style={{ color: "rgba(0, 0, 0, 0.3799999952316284)" }}>
          info_circle
        </Icon>
      </Tooltip>
    </div>
  );
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default SimpleTooltips;
