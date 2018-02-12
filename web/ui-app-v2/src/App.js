import React, { Component } from "react";
import { connect } from "react-redux";
import { setSpecs, setModuleName, setActionName } from "./actions/framework";
import Screen from "./screen/index.js";
import PropTypes from "prop-types";

class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { actionName, moduleName } = this.props.match.params;
    const { setSpecs, setActionName, setModuleName } = this.props;
    const specs = require(`./specs/${moduleName}`).default;
    setSpecs(specs);
    setActionName(actionName);
    setModuleName(moduleName);
  }

  render() {
    const { specs, moduleName, actionName } = this.props;
    return (
      <div className="container">
        <Screen specs={specs} moduleName={moduleName} actionName={actionName} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  specs: state.framework.specs,
  actionName: state.framework.actionName,
  moduleName: state.framework.moduleName
});

const mapDispatchToProps = dispatch => ({
  setSpecs: specs => dispatch(setSpecs(specs)),
  setActionName: actionName => dispatch(setActionName(actionName)),
  setModuleName: moduleName => dispatch(setModuleName(moduleName))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
