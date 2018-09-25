import React from "react";
import { UploadFile } from "ui-atoms-local";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    padding: "8px 38px"
  },
  input: {
    display: "none"
  }
});
class UploadSingleFile extends Component {
  handleFileUpload = event => {
    console.log(event);
  };
  render() {
    return (
      <UploadFile
        buttonProps={{ variant: "outlined", color: "primary" }}
        handleFileUpload={this.handleFileUpload}
        inputProps={{ multiple: false }}
        classes={this.props.classes}
      />
    );
  }
}

export default withStyles(styles)(UploadSingleFile);
