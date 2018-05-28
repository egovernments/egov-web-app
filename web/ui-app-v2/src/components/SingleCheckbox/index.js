import React from "react";
import PropTypes from "prop-types";
import Checkbox from "material-ui/Checkbox";
import "./index.css";

const defaultLabelStyle = {
  fontFamily: "Roboto, sans-serif",
};

const defaultStyle = {
  marginBottom: "21px",
};

const selectedLabelStyle = {
  color: "#00bcd1",
};
const SingleCheckboxUi = ({
  defaultValue,
  value,
  label,
  labelStyle,
  onCheck,
  style = {},
  checkedIcon,
  iconStyle,
  containerClassName,
  selected,
  id,
}) => {
  const renderCheckbox = () => {
    return (
      <Checkbox
        id={id}
        value={value}
        defaultValue={defaultValue}
        label={label}
        onCheck={onCheck}
        style={{ ...defaultStyle, ...style }}
        iconStyle={iconStyle}
        checkedIcon={checkedIcon}
        labelStyle={{ ...defaultLabelStyle, ...labelStyle, ...selectedLabelStyle }}
      />
    );
  };

  return <div className={`${containerClassName} checkbox-container`}>{renderCheckbox()}</div>;
};

SingleCheckboxUi.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  defaultValue: PropTypes.string,
  onCheck: PropTypes.func,
  style: PropTypes.object,
};

export default SingleCheckboxUi;
