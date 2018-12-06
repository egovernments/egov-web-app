import React from "react";
import CommonView from "mihy-ui-framework/ui-molecules/CommonView";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import themeObject from "../../ui-config/themes";
import "./index.css";
import get from "lodash/get";
import { connect } from "react-redux";
import { fetchExternalUrls } from "egov-ui-kit/redux/app/actions";
const theme = createMuiTheme(themeObject);

class IFrameInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: null };
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
    let { routesData, fetchExternalUrls } = props;
    if (!routesData) fetchExternalUrls();
    const isOrign = get(routesData, `${moduleName}.routes.${pageName}.isOrigin`, false);
    const domain = isOrign
      ? process.env.NODE_ENV === "development"
        ? "https://egov-micro-dev.egovernments.org"
        : window.origin
      : get(routesData, `${moduleName}.routes.${pageName}.domain`, "");

    const contextPath = get(routesData, `${moduleName}.routes.${pageName}.routePath`, "");
    let url = `${domain}${contextPath}`;
    this.setState({ url });
  };

  componentWillReceiveProps(nextProps) {
    const { match: nextMatch } = nextProps;
    const { match: currentMatch } = this.props;
    const { params: nextParams } = nextMatch;
    const { params: currentParams } = currentMatch;
    const { moduleName: nextmoduleName, pageName: nextpageName } = nextParams;
    const { moduleName: currentmoduleName, pageName: currentpageName } = currentParams;
    const { routesData: nextRoutesData } = nextProps;
    const { routesData: currentRoutesData } = this.props;
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
    fetchExternalUrls: () => dispatch(fetchExternalUrls()),
  };
};

const mapStateToProps = (state) => {
  const { app } = state;
  const { routesData } = app;
  return { routesData };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IFrameInterface);
