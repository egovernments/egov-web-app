import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { addBodyClass, removeBodyClass } from "utils/commons";
import { fetchLocalizationLabel, toggleSnackbarAndSetText } from "redux/app/actions";
import { fetchCities } from "redux/common/actions";
import Snackbar from "material-ui/Snackbar";
import Router from "./Router";

class App extends Component {
  constructor(props) {
    super(props);
    const { pathname: currentPath } = props.location;

    props.history.listen((location, action) => {
      const { pathname: nextPath } = location;
      removeBodyClass(currentPath);
      addBodyClass(nextPath);
      // clear any toasters
    });

    addBodyClass(currentPath);
  }

  componentDidMount() {
    const { fetchLocalizationLabel, fetchCities, locale } = this.props;
    fetchLocalizationLabel(localStorage.getItem("locale") || "en_IN");
    fetchCities();
  }

  componentWillReceiveProps(nextProps) {
    const { route: nextRoute } = nextProps;
    const { route: currentRoute, history } = this.props;
    if (nextRoute && currentRoute !== nextRoute) {
      history.push(nextRoute);
    }
  }

  render() {
    const { toast, toggleSnackbarAndSetText } = this.props;

    return (
      <div>
        <Router />
        {toast &&
          toast.msg && (
            <Snackbar
              open={toast.status}
              message={toast.msg}
              style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
              bodyStyle={{
                pointerEvents: "initial",
                maxWidth: "none",
                backgroundColor: toast.isSuccess ? "#3ca23c" : toast.isError ? "#e83e36" : "rgb(95, 92, 98)",
                textAlign: "center",
              }}
              autoHideDuration={6000}
              onRequestClose={() => toggleSnackbarAndSetText(false, "", false, false)}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { route, toast } = state.app;
  return { route, toast };
};

const dispatchToProps = (dispatch) => {
  return {
    fetchLocalizationLabel: (locale) => dispatch(fetchLocalizationLabel(locale)),
    toggleSnackbarAndSetText: (status, msg, isSuccess, isError) => dispatch(fetchLocalizationLabel(status, msg, isSuccess, isError)),
    fetchCities: () => dispatch(fetchCities()),
  };
};

export default withRouter(connect(mapStateToProps, dispatchToProps)(App));
