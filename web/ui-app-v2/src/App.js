import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  setSpecs,
  setModuleName,
  setActionName,
  setMasterName
} from "./actions/framework";
import Screen from "./screen/index.js";
import PropTypes from "prop-types";

class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { route } = nextProps;
    const nextAction = nextProps.match.params.actionName;
    const currentAction = this.props.match.params.actionName;

    if (nextAction !== currentAction) {
      this.props.setActionName(nextAction);
    }

    if (route && window.location.pathname !== route) {
      this.props.history.push(route);
    }
  }

  componentDidMount() {
    const { actionName, moduleName, master } = this.props.match.params;
    const {
      setSpecs,
      setActionName,
      setMasterName,
      setModuleName
    } = this.props;
    const specs = require(`./specs/${moduleName}`).default;
    setSpecs(specs);
    setMasterName(master);
    setActionName(actionName);
    setModuleName(moduleName);
  }

  render() {
    const { moduleName, moduleAction } = this.props;
    return (
      <div className="container">
        <Screen moduleName={moduleName} moduleAction={moduleAction} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  route: state.framework.route,
  moduleAction: state.framework.moduleAction,
  moduleName: state.framework.moduleName
});

const mapDispatchToProps = dispatch => ({
  setSpecs: specs => dispatch(setSpecs(specs)),
  setMasterName: masterName => dispatch(setMasterName(masterName)),
  setActionName: actionName => dispatch(setActionName(actionName)),
  setModuleName: moduleName => dispatch(setModuleName(moduleName))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
