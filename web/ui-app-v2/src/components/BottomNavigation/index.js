import React from "react";
import PropTypes from "prop-types";
import { BottomNavigation as MaterialUiBottomNavigation, BottomNavigationItem } from "material-ui/BottomNavigation";
import "./index.css";

const BottomNavigation = ({ style = {}, options, handleChange, selectedIndex }) => {
  const renderNavigationOptions = () => {
    return options.map((option, index) => (
      <BottomNavigationItem
        key={index}
        label={option.label}
        icon={option.icon}
        onClick={() => {
          handleChange(index, option.route);
        }}
      />
    ));
  };

  return (
    <MaterialUiBottomNavigation className="bottom-navigation" style={style} selectedIndex={selectedIndex}>
      {renderNavigationOptions()}
    </MaterialUiBottomNavigation>
  );
};

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
