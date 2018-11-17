import React, { Component } from "react";
import { DocumentList } from "ui-molecules-local";
import { connect } from "react-redux";
import get from "lodash/get";

class DocumentListContainer extends Component {
  render() {
    const { uploadedDocuments, ...rest } = this.props;
    return <DocumentList uploadedDocsInRedux={uploadedDocuments} {...rest} />;
  }
}

const mapStateToProps = state => {
  const { screenConfiguration } = state;
  const documents = get(
    screenConfiguration.preparedFinalObject,
    "LicensesTemp[0].applicationDocuments",
    []
  );
  const uploadedDocuments = get(
    screenConfiguration.preparedFinalObject,
    "LicensesTemp[0].uploadedDocsInRedux",
    []
  );
  const tenantId = get(
    screenConfiguration.preparedFinalObject,
    "Licenses[0].tenantId",
    ""
  );
  return { documents, tenantId, uploadedDocuments };
};

export default connect(
  mapStateToProps,
  null
)(DocumentListContainer);
