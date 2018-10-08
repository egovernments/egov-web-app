import React, { Component } from "react";
import { MultiDownloadCard } from "mihy-ui-framework/ui-molecules";
import { connect } from "react-redux";
import get from "lodash/get";

class DownloadFileContainer extends Component {
  render() {
    return <MultiDownloadCard data={this.props.data} />;
  }
}

const mapStateToProps = state => {
  const { screenConfiguration } = state;
  const data = get(
    screenConfiguration.preparedFinalObject,
    "LicensesTemp[0].reviewDocData",
    []
  );
  return { data };
};

export default connect(
  mapStateToProps,
  null
)(DownloadFileContainer);
