import React from "react";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";

const ButtonGroup = ({ items, onClick, selected, defaultStyle = {}, BGColor, defaultBGColor, labelStyle = {}, defaultLabelStyle = {} }) => {
  return items.map((item, index) => {
    // TODO: to be changed later
    defaultStyle = Object.assign({}, defaultStyle, { backgroundColor: item.value === selected ? BGColor : defaultBGColor });
    return (
      <FlatButton
        key={index}
        label={item.label}
        style={defaultStyle}
        hoverColor="none"
        onClick={() => {
          onClick(item.value);
        }}
        labelStyle={item.value === selected ? labelStyle : defaultLabelStyle}
      />
    );
  });
};

export default ButtonGroup;
