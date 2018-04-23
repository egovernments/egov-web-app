import React, { Component } from "react";
import { BottomNavigation, Icon } from "components";
import { navigationItems } from "./navigationItems";
import Label from "utils/translationNode";

export default class Footer extends Component {
  state = {
    selectedIndex: 0,
  };

  _onTabChange = (tabIndex) => {
    const route = navigationItems[tabIndex].route;
    if (route.length) this.props.history.push(route);
    this.setState({
      selectedIndex: tabIndex,
    });
  };

  _bottomNavigationOptions = () => {
    return navigationItems.map((item) => {
      const { label, icon } = item;
      const { action, name } = icon;
      return { ...item, label: <Label fontSize="12px" label={label} color="#969696" />, icon: <Icon action={action} name={name} /> };
    });
  };

  render() {
    const { selectedIndex } = this.state;
    const { _onTabChange, _bottomNavigationOptions } = this;
    const options = _bottomNavigationOptions();
    return <BottomNavigation selectedIndex={selectedIndex} options={options} handleChange={_onTabChange} />;
  }
}
