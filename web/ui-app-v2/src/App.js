import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { route } = nextProps;

    if (route && window.location.pathname !== route) {
      this.props.history.push(route);
    }
  }

  componentDidMount() {}

  render() {
    const { moduleName, moduleAction } = this.props;
    const { specs } = this;
    return (
      <div className="container">
        <h1>Welcome to rainmaker</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  route: state.framework.route,
});

export default withRouter(connect(mapStateToProps, null)(App));
