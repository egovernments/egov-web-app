import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Container } from "mihy-ui-framework/ui-atoms";
import {
  LabelContainer,
  TextFieldContainer
} from "mihy-ui-framework/ui-containers";
import { Dialog, DialogContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { UploadMultipleFiles } from "../../ui-molecules-local";
import { httpRequest } from "ui-utils/api";

const styles = theme => ({
  root: {
    marginTop: 24,
    width: "100%"
  }
});

const fieldConfig = {
  approverName: {
    label: {
      labelName: "Approver Name",
      labelKey: "TL_APPROVER_NAME_LABEL"
    },
    placeholder: {
      labelName: "Selet approver Name",
      labelKey: "TL_APROVER_NAME_PLACEHOLDER"
    }
  },
  comments: {
    label: {
      labelName: "Comments",
      labelKey: "CS_COMMON_COMMENTS"
    },
    placeholder: {
      labelName: "Enter Comments",
      labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
    }
  }
};

class ActionDialog extends React.Component {
  state = {
    employeeList: []
  };

  componentDidMount = async () => {
    const { dialogData } = this.props;
    const { roles } = dialogData;
    const tenantId = localStorage.getItem("tenant-id");
    const queryObj = [
      { key: "roleCodes", value: roles, key: "tenantId", value: tenantId }
    ];
    const payload = await httpRequest(
      "post",
      "/hr-employee-v2/employees/_search",
      "",
      queryObj
    );
    const employeeList =
      payload &&
      payload.Employee.map((item, index) => {
        return {
          value: item.name,
          label: item.code
        };
      });

    this.setState({
      employeeList: employeeList
    });
  };

  getButtonName = action => {
    switch (action) {
      case "FORWARD":
        return { labelName: "FORWARD", labelKey: "TL_FORWARD_BUTTON" };
      case "MARK":
        return { labelName: "MARK", labelKey: "TL_MARK_BUTTON" };
      case "APPROVE":
        return {
          labelName: "APPROVE",
          labelKey: "TL_APPROVER_TRADE_APP_BUTTON_APPROVE"
        };
      case "CANCEL":
        return {
          labelName: "CANCEL",
          labelKey: "TL_WORKFLOW_CANCEL_BUTTON_CANCEL"
        };
      default:
        return {
          labelName: "REJECT",
          labelKey: "TL_APPROVER_TRADE_APP_BUTTON_REJECT"
        };
    }
  };

  getEmployeeList = async roles => {};
  render() {
    const {
      open,
      onClose,
      action,
      handleFieldChange,
      onButtonClick,
      dialogData
    } = this.props;
    const { buttonLabel, showEmployeeList, dialogHeader } = dialogData;
    const { getEmployeeList, getHeaderName, getButtonName } = this;
    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <DialogContent
          children={
            <Container
              children={
                <Grid container="true" sm="12" marginTop={16}>
                  <Grid
                    style={{
                      alignItems: "center",
                      display: "flex"
                    }}
                    item
                    sm={10}
                  >
                    <Typography component="h2" variant="subheading">
                      <LabelContainer
                        // labelName={getHeaderName(buttonLabel).labelName}
                        // labelKey={getHeaderName(buttonLabel).labelKey}
                        {...dialogHeader}
                      />
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={2}
                    style={{ textAlign: "right", cursor: "pointer" }}
                    onClick={onClose}
                  >
                    <CloseIcon />
                  </Grid>
                  {showEmployeeList && (
                    <Grid
                      item
                      sm="12"
                      style={{
                        marginTop: 16
                      }}
                    >
                      <TextFieldContainer
                        select={true}
                        style={{ marginRight: "15px" }}
                        label={fieldConfig.approverName.label}
                        placeholder={fieldConfig.approverName.placeholder}
                        data={this.state.employeeList}
                        optionValue="value"
                        optionLabel="label"
                        onChange={e =>
                          handleFieldChange(
                            "Licenses[0].assignee",
                            e.target.value
                          )
                        }
                        jsonPath="Licenses[0].assignee"
                      />
                    </Grid>
                  )}
                  <Grid item sm="12">
                    <TextFieldContainer
                      InputLabelProps={{ shrink: true }}
                      label={fieldConfig.comments.label}
                      onChange={e =>
                        handleFieldChange("Licenses[0].comment", e.target.value)
                      }
                      jsonPath="Licenses[0].comment"
                      placeholder={fieldConfig.comments.placeholder}
                    />
                  </Grid>
                  <Grid item sm="12">
                    <Typography
                      component="h3"
                      variant="subheading"
                      style={{
                        color: "rgba(0, 0, 0, 0.8700000047683716)",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        marginBottom: "8px"
                      }}
                    >
                      <LabelContainer labelName="Supporting Documents" />
                    </Typography>
                    <div
                      style={{
                        color: "rgba(0, 0, 0, 0.60)",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px"
                      }}
                    >
                      <LabelContainer labelName="Only .jpg and .pdf files. 5MB max file size." />
                    </div>
                    <UploadMultipleFiles
                      maxFiles={4}
                      inputProps={{
                        accept: "image/*, .pdf, .png, .jpeg"
                      }}
                      buttonLabel={{ labelName: "UPLOAD FILES" }}
                      jsonPath=""
                      maxFileSize={5000}
                    />
                    <Grid sm={12} style={{ textAlign: "right" }}>
                      <Button
                        variant={"contained"}
                        color={"primary"}
                        style={{
                          minWidth: "200px",
                          height: "48px",
                          marginRight: "45px"
                        }}
                        onClick={() => onButtonClick(buttonLabel)}
                      >
                        <LabelContainer
                          labelName={getButtonName(buttonLabel).labelName}
                          labelKey={getButtonName(buttonLabel).labelKey}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              }
            />
          }
        />
      </Dialog>
    );
  }
}

export default withStyles(styles)(ActionDialog);
