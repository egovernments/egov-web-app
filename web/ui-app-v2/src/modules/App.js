import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Toast } from "components";
import { addBodyClass } from "utils/commons";
import { fetchCurrentLocation, fetchLocalizationLabel, toggleSnackbarAndSetText, setRoute } from "redux/app/actions";
import { fetchMDMSData } from "redux/common/actions";
import Router from "./Router";
import commonConfig from "config/common";

class App extends Component {
  constructor(props) {
    super(props);
    const { pathname: currentPath } = props.location;

    props.history.listen((location, action) => {
      const { pathname: nextPath } = location;
      addBodyClass(nextPath);
      props.toggleSnackbarAndSetText(false, "");
    });

    addBodyClass(currentPath);
  }

  componentDidMount() {
    const { fetchLocalizationLabel, fetchCurrentLocation, fetchMDMSData } = this.props;
    let requestBody = {
      MdmsCriteria: {
        tenantId: commonConfig.tenantId,
        moduleDetails: [
          {
            moduleName: "common-masters",
            masterDetails: [
              {
                name: "Department",
              },
              {
                name: "Designation",
              },
            ],
          },
          {
            moduleName: "tenant",
            masterDetails: [
              {
                name: "tenants",
              },
            ],
          },
        ],
      },
    };
    // can be combined into one mdms call
    fetchLocalizationLabel(localStorage.getItem("locale") || "en_IN");
    // current location
    fetchCurrentLocation();
    fetchMDMSData(requestBody);
  }

  componentWillReceiveProps(nextProps) {
    const { route: nextRoute } = nextProps;
    const { route: currentRoute, history, setRoute } = this.props;
    if (nextRoute && currentRoute !== nextRoute) {
      history.push(nextRoute);
      setRoute("");
    }
  }

  render() {
    const { toast } = this.props;
    return (
      <div>
        <Router />
        {toast && toast.open && toast.message.length && <Toast open={toast.open} message={toast.message} error={toast.error} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { route, toast } = state.app;
  const props = {};
  if (route && route.length) {
    props.route = route;
  }
  if (toast && toast.open && toast.message && toast.message.length) {
    props.toast = toast;
  }
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLocalizationLabel: (locale) => dispatch(fetchLocalizationLabel(locale)),
    toggleSnackbarAndSetText: (open, message, error) => dispatch(toggleSnackbarAndSetText(open, message, error)),
    fetchMDMSData: (criteria) => dispatch(fetchMDMSData(criteria)),
    fetchCurrentLocation: () => dispatch(fetchCurrentLocation()),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
