import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { setSpecs, setModuleName, setActionName } from "./actions/framework";
import Screen from "./screen/index.js";
import PropTypes from "prop-types";

class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { route } = nextProps;

    if (route && window.location.pathname !== route) {
      this.props.history.push(route);
    }
  }

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
  route: state.framework.route,
  specs: state.framework.specs,
  actionName: state.framework.actionName,
  moduleName: state.framework.moduleName
});

const mapDispatchToProps = dispatch => ({
  setSpecs: specs => dispatch(setSpecs(specs)),
  setActionName: actionName => dispatch(setActionName(actionName)),
  setModuleName: moduleName => dispatch(setModuleName(moduleName))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
