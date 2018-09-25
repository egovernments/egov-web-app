import React, { Component } from "react";
import { UploadFile } from "ui-atoms-local";
import { withStyles } from "@material-ui/core/styles";

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
  handleFileUpload = event => {
    console.log(event);
  };
  render() {
    return (
      <UploadFile
        buttonProps={{ variant: "outlined", color: "primary" }}
        handleFileUpload={this.handleFileUpload}
        inputProps={{ multiple: true }}
        classes={this.props.classes}
      />
    );
  }
}

export default withStyles(styles)(UploadMultipleFiles);
