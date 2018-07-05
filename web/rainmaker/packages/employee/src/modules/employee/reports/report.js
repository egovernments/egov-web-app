import React, { Component } from "react";
import { connect } from "react-redux";
import { commonApiPost } from "egov-ui-kit/utils/api";
import SearchForm from "./searchForm";
import ReportResult from "./reportResult";
import { getMetaDataUrl, getReportName, options } from "./commons/url";

class Report extends Component {
  state = {
    tabLabel: "",
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.reportName !== this.props.match.params.reportName) {
      this.initData(nextProps.match.params.moduleName, nextProps.match.params.reportName);
    }
  }

  componentDidMount() {
    // localStorage.setItem("searchCriteria", "{}");
    this.initData(this.props.match.params.moduleName, this.props.match.params.reportName);
    this.hasReturnUrl();
  }

  hasReturnUrl() {
    if (localStorage.getItem("returnUrl")) {
      window.localStorage.setItem("returnUrl", "");
    }
  }

  initData = (moduleName, reportName) => {
    var _this = this;
    let { setMetaData, setFlag, showTable, setForm, setReportResult } = this.props;

    var tenantId = localStorage.getItem("tenant-id") ? localStorage.getItem("tenant-id") : "";

    // setFlag(1);
    // showTable(false);
    // setReportResult({});
    // setMetaData(mockData);
    let urlBase = getMetaDataUrl(moduleName);

    //commonApiPost("/report/" + moduleName + "/metadata/_get", {}, { tenantId: tenantId, reportName: "SourceWiseReport" }).then(
    urlBase &&
      commonApiPost(urlBase, {}, { tenantId: tenantId, reportName: getReportName(moduleName, reportName) }).then(
        function(response) {
          if (response && response.reportDetails) response.reportDetails.reportName = reportName; //temp soln for custom report name
          setFlag(1);
          showTable(false);
          setReportResult({});
          setMetaData(response);
        },
        function(err) {
          alert("Try again later");
        }
      );
  };
  updateTabLabel = (tabLabel) => {
    this.setState({
      tabLabel,
    });
  };

  render() {
    let { match } = this.props;
    let needDefaultSearch = options[this.props.match.params.moduleName] ? options[this.props.match.params.moduleName][0].needDefaultSearch : false;
    return (
      <div>
        <SearchForm match={match} needDefaultSearch={needDefaultSearch} updateTabLabel={this.updateTabLabel} />

        <ReportResult match={match} tabLabel={this.state.tabLabel} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setMetaData: (metaData) => {
    dispatch({ type: "SET_META_DATA", metaData });
  },
  setFlag: (flag) => {
    dispatch({ type: "SET_FLAG", flag });
  },
  showTable: (state) => {
    dispatch({ type: "SHOW_TABLE", state });
  },
  setReportResult: (reportResult) => {
    dispatch({ type: "SHOW_TABLE", reportResult });
  },
  setLoadingStatus: (loadingStatus) => {
    dispatch({ type: "SET_LOADING_STATUS", loadingStatus });
  },
  toggleDailogAndSetText: (dailogState, msg) => {
    dispatch({ type: "TOGGLE_DAILOG_AND_SET_TEXT", dailogState, msg });
  },
  setForm: (required = [], pattern = []) => {
    dispatch({
      type: "SET_FORM",
      form: {},
      fieldErrors: {},
      isFormValid: false,
      validationData: {
        required: {
          current: [],
          required: required,
        },
        pattern: {
          current: [],
          required: pattern,
        },
      },
    });
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);
