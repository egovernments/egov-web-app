import React from 'react';
import PropTypes from 'prop-types';
import { BottomNavigation as MaterialUiBottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

const BottomNavigation = ({ style, options, handleChange, selectedIndex }) => {
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

  return <MaterialUiBottomNavigation selectedIndex={selectedIndex}>{renderNavigationOptions()}</MaterialUiBottomNavigation>;
};

BottomNavigation.propTypes = {
  style: PropTypes.object,
  selectedIndex: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.any,
      route: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleChange: PropTypes.func,
};

export default BottomNavigation;
