import React, { Component } from "react";
import { MultiDownloadCard } from "mihy-ui-framework/ui-molecules";
import { connect } from "react-redux";
import get from "lodash/get";
import "./index.css";

class DownloadFileContainer extends Component {
  render() {
    const { data, ...rest } = this.props;
    console.log(this.props.className);
    return <MultiDownloadCard data={data} {...rest} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { screenConfiguration } = state;
  const data = get(
    screenConfiguration.preparedFinalObject,
    ownProps.sourceJsonPath,
    []
  );
  return { data };
};

export default connect(
  mapStateToProps,
  null
)(DownloadFileContainer);
