import React from "react";
import PropTypes from "prop-types";
import {
  BottomNavigation as MaterialUiBottomNavigation,
  BottomNavigationItem
} from "material-ui/BottomNavigation";

const BottomNavigation = ({ options, handleChange, selectedIndex }) => {
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
    <MaterialUiBottomNavigation selectedIndex={selectedIndex}>
      {renderNavigationOptions()}
    </MaterialUiBottomNavigation>
  );
};

BottomNavigation.propTypes = {
  selectedIndex: PropTypes.number,
  options: PropTypes.array,
  handleChange: PropTypes.func
};

export default BottomNavigation;
