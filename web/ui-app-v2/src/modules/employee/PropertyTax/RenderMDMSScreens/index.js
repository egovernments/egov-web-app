import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Icon, AutoSuggest } from "components";
import { fetchSpecs } from "redux/mdms/actions";

class RenderMDMSScreens extends Component {
  componentDidMount = () => {
    const { fetchSpecs, match } = this.props;
    // fetchSpecs([], match.params.moduleName, match.params.masterName, true);
  };

  render() {
    return <div>HI</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecs: (queryObj, moduleName, masterName, customEndPoint) => dispatch(fetchSpecs(queryObj, moduleName, masterName, customEndPoint)),
  };
};

export default connect(null, mapDispatchToProps)(RenderMDMSScreens);
