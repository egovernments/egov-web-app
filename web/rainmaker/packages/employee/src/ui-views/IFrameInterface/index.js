import React from "react";
import CommonView from "mihy-ui-framework/ui-molecules/CommonView";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import themeObject from "../../ui-config/themes";
import "./index.css";
import get from "lodash/get";
import { connect } from "react-redux";
import { fetchUiCommonConstants } from "egov-ui-kit/redux/app/actions";
const theme = createMuiTheme(themeObject);

class IFrameInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = { num: 0 };
  }
  componentDidMount() {
    this.buildURL(this.props);
  }

  buildURL = (props) => {
    const { match } = props;
    const { params } = match;
    const { moduleName, pageName } = params;
    // const routesData = {
    //   tradelicense: {
    //     routes: {
    //       search: {
    //         routePath: "/employee-tradelicence/mihy-ui-framework/tradelicence/search",
    //         isOrigin: false,
    //         domain: "https://egov-micro-dev.egovernments.org",
    //       },
    //     },
    //   },
    // };
    let { uiCommonConstants, fetchUiCommonConstants } = props;
    console.log("uiCommonConstants", uiCommonConstants);
    if (!uiCommonConstants) fetchUiCommonConstants();
    const isOrign = get(uiCommonConstants, `${moduleName}.iframe-routes.${pageName}.isOrigin`, false);
    const domain = isOrign
      ? process.env.NODE_ENV === "development"
        ? "https://egov-micro-dev.egovernments.org"
        : window.origin
      : get(uiCommonConstants, `${moduleName}.iframe-routes.${pageName}.domain`, "");

    const contextPath = get(uiCommonConstants, `${moduleName}.iframe-routes.${pageName}.routePath`, "");
    let url = `${domain}${contextPath}`;
    console.log("url", url);
    this.setState({ url });
  };

  componentWillReceiveProps(nextProps) {
    const { match: nextMatch } = nextProps;
    const { match: currentMatch } = this.props;
    const { params: nextParams } = nextMatch;
    const { params: currentParams } = currentMatch;
    const { moduleName: nextmoduleName, pageName: nextpageName } = nextParams;
    const { moduleName: currentmoduleName, pageName: currentpageName } = currentParams;
    const { uiCommonConstants: nextUiCommonConstants } = nextProps;
    const { uiCommonConstants: currentUiCommonConstants } = this.props;
    this.buildURL(nextProps);

    // if (nextmoduleName !== currentmoduleName || nextpageName !== currentpageName || nextRoutesData !== currentRoutesData) {
    // }
  }

  render() {
    const { url } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app-container-iframe">
          <iframe src={url} className="app-container-iframe" />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUiCommonConstants: () => dispatch(fetchUiCommonConstants()),
  };
};

const mapStateToProps = (state) => {
  const { app } = state;
  const { uiCommonConstants } = app;
  return { uiCommonConstants };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IFrameInterface);
