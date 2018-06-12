import React from "react";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Info";
import Icon from "@material-ui/core/Icon";
import info from "egov-ui-kit/assets/info.svg";
import "./index.css";

const defaultStyle = {
  backgroundColor: "transparent",
};

const PopperProps = {
  className: "tooltip-popper",
  fontSize: 48,
  style: {
    color: "#ffffff",
  },
};

const ToolTipUi = ({ placement, show, title, id }) => {
  return (
    <Tooltip id={id} title={title} placement={placement || "right"} PopperProps={PopperProps}>
      <Icon color="disabled" style={{ fontSize: 50 }}>
        <DeleteIcon />
      </Icon>
    </Tooltip>
  );
};

ToolTipUi.propTypes = {
  title: PropTypes.string,
  placement: PropTypes.string,
};

export default ToolTipUi;
