import React, { Component } from "react";
import { UploadFile, UploadedDocument } from "ui-atoms-local";
import { withStyles } from "@material-ui/core/styles";
import { getImageUrlByFile } from "ui-utils/commons";

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

  handleDocument = file => {
    let { documents } = this.state;
    const { maxFiles } = this.props;
    if (documents.length + 1 > maxFiles) {
      alert(`Can only upload ${maxFiles} files`);
    } else {
      documents.push({ fileName: file.name });
      documents.slice(0, maxFiles);
      this.setState({ documents });
    }
  };

  removeDocument = index => {
    let { documents } = this.state;
    documents.splice(index, 1);
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
            this.handleDocument(file);
          } else {
            this.handleDocument(file);
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
              >
                <UploadedDocument
                  key={index}
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

export default withStyles(styles)(UploadMultipleFiles);
