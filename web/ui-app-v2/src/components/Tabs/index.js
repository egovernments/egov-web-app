import React from "react";
import PropTypes from "prop-types";
import { Tabs as MaterialUiTabs, Tab } from "material-ui/Tabs";

const Tabs = ({ tabs = [], handleActive }) => {
  const renderTabs = () => {
    return tabs.map((tab, index) => {
      const { route, label } = tab;
      return (
        <Tab
          key={index}
          onActive={handleActive}
          data-route={route}
          label={label}
        />
      );
    });
  };

  return <MaterialUiTabs>{renderTabs()}</MaterialUiTabs>;
};

Tabs.propTypes = {
  tabs: PropTypes.array,
  onActive: PropTypes.func
};
export default Tabs;
