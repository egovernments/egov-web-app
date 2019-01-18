import React, { Component } from "react";
import { Snackbar } from "../../ui-atoms";
import { connect } from "react-redux";
import { toggleSnackbarAndSetText } from "../../ui-redux/app/actions";

class SnackbarContainer extends Component {
  handleClose = (event, reason) => {
    const { toggleSnackbarAndSetText } = this.props;
    toggleSnackbarAndSetText(false, "", "");
  };
  render() {
    const { open, variant, message } = this.props;
    return (
      <Snackbar
        onClose={this.handleClose}
        open={open}
        variant={variant}
        message={message}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSnackbarAndSetText: (open, message, variant) => {
      dispatch(toggleSnackbarAndSetText(open, message, variant));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SnackbarContainer);
