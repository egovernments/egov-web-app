import React from "react";
import PropTypes from "prop-types";
import { BottomNavigation as MaterialUiBottomNavigation, BottomNavigationItem } from "material-ui/BottomNavigation";
import "./index.css";

const BottomNavigation = ({ className, style = {}, options, handleChange, selectedIndex }) => (
  <MaterialUiBottomNavigation className={`${className} bottom-navigation`} style={style} selectedIndex={selectedIndex}>
    {options.map((item, index) => (
      <BottomNavigationItem
        key={index}
        label={item.label}
        icon={item.icon}
        onClick={() => {
          handleChange(index, item.route);
        }}
      />
    ))}
  </MaterialUiBottomNavigation>
);

BottomNavigation.propTypes = {
  style: PropTypes.object,
  selectedIndex: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      route: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleChange: PropTypes.func,
};

export default BottomNavigation;
