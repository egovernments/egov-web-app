import React from "react";
import CommonView from "mihy-ui-framework/ui-molecules/CommonView";
import LabelContainer from "mihy-ui-framework/ui-containers/LabelContainer";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import themeObject from "../../ui-config/themes";
// import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";
import get from "lodash/get";
import { connect } from "react-redux";
import { fetchUiCommonConstants } from "egov-ui-kit/redux/app/actions";
const theme = createMuiTheme(themeObject);

const headerStyle = {
  color: "rgb(72, 72, 72)",
  fontWeight: 500,
  fontSize: "20px",
  margin: "16px",
};

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
    if (!uiCommonConstants) fetchUiCommonConstants();
    const isOrign = get(uiCommonConstants, `${moduleName}.iframe-routes.${pageName}.isOrigin`, false);
    const domain = isOrign
      ? process.env.NODE_ENV === "development"
        ? "https://egov-micro-dev.egovernments.org"
        : window.origin
      : get(uiCommonConstants, `${moduleName}.iframe-routes.${pageName}.domain`, "");

    const contextPath = get(uiCommonConstants, `${moduleName}.iframe-routes.${pageName}.routePath`, "");
    const title = get(uiCommonConstants, `${moduleName}.iframe-routes.${pageName}.title`, "");

    const queryParams = props.location.search;

    let url = `${domain}${contextPath}${queryParams}`;
    this.setState({ url, title });
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
    const { url, title } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        {title && (
          <div className="row">
            <div className="col-sm-12">
              <LabelContainer style={headerStyle} labelKey={title} />
            </div>
          </div>
        )}
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
