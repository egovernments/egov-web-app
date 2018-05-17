import React, { Component } from "react";
import { connect } from "react-redux";
import { BottomNavigation, Icon } from "components";
import { navigationItems } from "./navigationItems";
import { setBottomNavigationIndex } from "redux/app/actions";
import Label from "utils/translationNode";
import "./index.css";

class Footer extends Component {
  state = {
    selectedIndex: 0,
  };

  _onTabChange = (tabIndex) => {
    const route = navigationItems[tabIndex].route;
    this.props.setBottomNavigationIndex(tabIndex);
    if (route.length) this.props.history.push(route);
  };

  _bottomNavigationOptions = () => {
    return navigationItems.map((item) => {
      const { label, icon } = item;
      const { action, name } = icon;
      return {
        ...item,
        label: <Label className="citizen-footer-text" fontSize="12px" label={label} color="#969696" />,
        icon: <Icon action={action} name={name} />,
      };
    });
  };

  render() {
    const { bottomNavigationIndex } = this.props;
    const { _onTabChange, _bottomNavigationOptions } = this;
    const options = _bottomNavigationOptions();
    return <BottomNavigation selectedIndex={bottomNavigationIndex} options={options} handleChange={_onTabChange} />;
  }
}

const mapStateToProps = (state) => {
  const { bottomNavigationIndex } = state.app;
  return { bottomNavigationIndex };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBottomNavigationIndex: (index) => dispatch(setBottomNavigationIndex(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
