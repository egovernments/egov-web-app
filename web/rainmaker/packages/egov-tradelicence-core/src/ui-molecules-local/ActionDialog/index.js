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

const getHeaderName = action => {
  switch (action) {
    case "FORWARD":
      return {
        labelName: "Forward Application",
        labelKey: "TL_FORWARD_APPLICATION"
      };
    case "APPROVE":
      return {
        labelName: "Approve Application",
        labelKey: "TL_APPROVAL_CHECKLIST_BUTTON_APPRV_APPL"
      };
    default:
      return {
        labelName: "Reject Application",
        labelKey: "TL_REJECTION_CHECKLIST_BUTTON_REJ_APPL"
      };
  }
};

const getButtonName = action => {
  switch (action) {
    case "FORWARD":
      return { labelName: "FORWARD", labelKey: "TL_FORWARD_BUTTON" };
    case "APPROVE":
      return {
        labelName: "APPROVE",
        labelKey: "TL_APPROVER_TRADE_APP_BUTTON_APPROVE"
      };
    default:
      return {
        labelName: "REJECT",
        labelKey: "TL_APPROVER_TRADE_APP_BUTTON_REJECT"
      };
  }
};

// const getEmployeeList = async roles => {
//   console.log("roles is.....", roles);
//const tenantId = localStorage.getItem("tenant-id");
//   const queryObj = [
//     { key: "roleCodes", value: roles, key: "tenantId", value: tenantId }
//   ];
//   const payload = await httpRequest(
//     "get",
//     "/hr-employee-v2/employees/_search",
//     "",
//     queryObj
//   );
//   console("payload is.....", payload);
// };
const employeeList = ["ShivaG", "Shreya"];

const ActionDialog = props => {
  const {
    open,
    onClose,
    action,
    handleFieldChange,
    onButtonClick,
    getEmployeeRoles
  } = props;
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
                    <LabelContainer {...getHeaderName(action)} />
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
                {action === "RESOLVE" && (
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
                      dropdownData={employeeList}
                      // onChange={e =>
                      //   handleFieldChange(
                      //     "WorkFlow.TradeLicense.approve.comment",
                      //     e.target.value
                      //   )
                      // }
                    />
                  </Grid>
                )}
                <Grid item sm="12">
                  <TextFieldContainer
                    InputLabelProps={{ shrink: true }}
                    label={fieldConfig.comments.label}
                    onChange={e =>
                      handleFieldChange(
                        "WorkFlowObject.TradeLicense.approve.comment",
                        e.target.value
                      )
                    }
                    jsonPath="WorkFlowObject.TradeLicense.approve.comment"
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
                    jsonPath="WorkFlowObject.TradeLicense.approve.document"
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
                      onClick={() => onButtonClick()}
                    >
                      <LabelContainer labelName={getButtonName(action)} />
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
};

export default withStyles(styles)(ActionDialog);
