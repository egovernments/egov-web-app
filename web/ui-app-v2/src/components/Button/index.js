import React from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";

const Button = (props) => {
  let { label, icon, className, onClick, backgroundColor, labelColor, fullWidth, disabled, primary = false, style = {}, id, ...rest } = props;
  return (
    <RaisedButton
      icon={
        icon && (
          <i style={icon.style} className="material-icons">
            {icon.name}
          </i>
        )
      }
      {...props}
    />
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  style: PropTypes.object,
};

export default Button;
