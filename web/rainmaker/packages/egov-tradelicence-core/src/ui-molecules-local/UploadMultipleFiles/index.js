import React, { Component } from "react";
import { UploadFile, UploadedDocument } from "ui-atoms-local";
import { withStyles } from "@material-ui/core/styles";
import { getImageUrlByFile } from "ui-utils/commons";
import { connect } from "react-redux";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { uploadFile } from "ui-utils/api";

const S3_BUCKET = {
  endPoint: "filestore/v1/files"
};
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    padding: "8px 38px"
  },
  input: {
    display: "none"
  }
});
class UploadMultipleFiles extends Component {
  state = {
    documents: []
  };

  handleDocument = (file, fileStoreId) => {
    let { documents } = this.state;
    const { maxFiles, prepareFinalObject } = this.props;

    if (documents.length + 1 > maxFiles) {
      alert(`Can only upload ${maxFiles} files`);
    } else {
      documents.push({ fileName: file.name, fileStoreId });
      documents.slice(0, maxFiles);
      prepareFinalObject("tradeLicene[0].approveFiles", documents);
      this.setState({ documents });
    }
  };

  removeDocument = index => {
    let { documents } = this.state;
    const { prepareFinalObject } = this.props;
    documents.splice(index, 1);
    prepareFinalObject("tradeLicene[0].approveFiles", documents);
    this.setState({ documents });
  };

  handleFileUpload = event => {
    const input = event.target;
    const { maxFiles } = this.props;
    if (input.files && input.files.length > 0) {
      const files = input.files;
      Object.keys(files)
        .slice(0, maxFiles)
        .forEach(async (key, index) => {
          const file = files[key];
          if (file.type.match(/^image\//)) {
            const imageUri = await getImageUrlByFile(file);
            const fileStoreId = await uploadFile(
              S3_BUCKET.endPoint,
              "rainmaker-pgr",
              file,
              "pb"
            );
            console.log(fileStoreId);
            this.handleDocument(file, fileStoreId);
          } else {
            const fileStoreId = await uploadFile(
              S3_BUCKET.endPoint,
              "RAINMAKER-PGR",
              file,
              "pb"
            );
            this.handleDocument(file, fileStoreId);
          }
        });
    }
  };
  render() {
    const { documents } = this.state;
    return (
      <div>
        {documents &&
          documents.map((document, index) => {
            return (
              <div
                style={
                  index === documents.length - 1 ? {} : { marginBottom: 5 }
                }
                key={index}
              >
                <UploadedDocument
                  document={document}
                  removeDocument={() => this.removeDocument(index)}
                />
              </div>
            );
          })}
        <UploadFile
          buttonProps={{
            variant: "outlined",
            color: "primary",
            style: { marginLeft: 0 }
          }}
          handleFileUpload={this.handleFileUpload}
          inputProps={{ multiple: true, ...this.props.inputProps }}
          classes={this.props.classes}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    prepareFinalObject: (jsonPath, value) =>
      dispatch(prepareFinalObject(jsonPath, value))
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(UploadMultipleFiles)
);
