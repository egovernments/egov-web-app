import React from "react";
import { Label } from "mihy-ui-framework/ui-atoms";
import { LabelContainer } from "mihy-ui-framework/ui-containers";
import { withStyles } from "@material-ui/core/styles";
import get from "lodash/get";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    marginBottom: 8
  },
  container: {
    paddingBottom: 8
  }
});

const getMultiItem = (billingslabData, classes, style) => {
  return billingslabData.map((item, index) => {
    return (
      <Grid sm={12} className={classes.container} container={true}>
        <Grid sm={10}>
          <LabelContainer
            labelKey={`TL_${item.category}`}
            style={{
              color: "rgba(0, 0, 0, 0.6000000238418579)",
              fontSize: "14px",
              fontWeigt: 400,
              lineSpacing: "17px"
            }}
          />
        </Grid>
        <Grid sm={2}>
          <Label
            label={item.rate}
            style={{
              color: "rgba(0, 0, 0, 0.8700000047683716)",
              fontSize: "14px",
              fontWeigt: 400,
              lineSpacing: "17px"
            }}
          />
        </Grid>
      </Grid>
    );
  });
};

class ViewBreakupContainer extends React.Component {
  state = {
    style: {
      color: "rgba(0, 0, 0, 0.8700000047683716)",
      fontSize: "20px",
      fontWeigt: 500,
      lineSpacing: "28px",
      marginTop: 25
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getGridItem = (total, classes, style) => {
    return (
      <Grid sm={12} className={classes.container} container={true}>
        <Grid sm={10}>
          <LabelContainer
            labelName={"Total"}
            style={
              style
                ? style
                : {
                    color: "rgba(0, 0, 0, 0.8700000047683716)",
                    fontSize: "14px",
                    fontWeigt: 400,
                    lineSpacing: "17px"
                  }
            }
          />
        </Grid>
        <Grid sm={2}>
          <Label
            label={total}
            style={
              style
                ? style
                : {
                    color: "rgba(0, 0, 0, 0.8700000047683716)",
                    fontSize: "14px",
                    fontWeigt: 400,
                    lineSpacing: "17px"
                  }
            }
          />
        </Grid>
      </Grid>
    );
  };

  render() {
    const {
      open,
      tradeUnitData,
      accessoriesUnitData,
      tradeTotal,
      accessoriesTotal,
      classes
    } = this.props;
    const { style } = this.state;
    const { getGridItem } = this;
    const totalBill = tradeTotal + accessoriesTotal;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        onEscapeKeyDown={this.handleClose}
        onBackdropClick={this.handleClose}
        fullWidth={true}
        children={
          accessoriesTotal > 0 || tradeTotal > 0 ? (
            <div style={{ padding: "16px" }}>
              <div style={{ paddingBottom: "16px" }}>
                <Label
                  label="Calculation Breakup"
                  style={{
                    color: "rgba(0, 0, 0, 0.8700000047683716)",
                    fontSize: "20px",
                    fontWeigt: 500,
                    lineSpacing: "28px"
                  }}
                />
              </div>
              {tradeUnitData && tradeUnitData.length > 0 && (
                <div style={{ paddingBottom: "12px" }}>
                  <Label
                    label={"Trade Unit"}
                    style={{
                      color: "rgba(0, 0, 0, 0.8700000047683716)",
                      fontSize: "16px",
                      fontWeigt: 400,
                      lineSpacing: "19px"
                    }}
                  />
                </div>
              )}
              {tradeUnitData &&
                tradeUnitData.length > 0 &&
                getMultiItem(tradeUnitData, classes)}
              <Divider className={classes.root} />
              {tradeUnitData &&
                tradeUnitData.length > 0 &&
                getGridItem(tradeTotal, classes)}
              {accessoriesUnitData && accessoriesUnitData.length > 0 && (
                <div style={{ paddingBottom: "12px", marginTop: 20 }}>
                  <Label
                    label={"Accessory Unit"}
                    style={{
                      color: "rgba(0, 0, 0, 0.8700000047683716)",
                      fontSize: "16px",
                      fontWeigt: 400,
                      lineSpacing: "19px"
                    }}
                  />
                </div>
              )}
              {accessoriesUnitData &&
                accessoriesUnitData.length > 0 &&
                getMultiItem(accessoriesUnitData, classes)}
              <Divider className={classes.root} />
              {accessoriesUnitData &&
                accessoriesUnitData.length > 0 &&
                getGridItem(accessoriesTotal, classes)}
              {getGridItem(totalBill, classes, style)}
            </div>
          ) : (
            <div style={{ padding: "16px", width: "500px" }}>
              <div style={{ paddingBottom: "16px" }}>
                <Label
                  label="Calculation Breakup"
                  style={{
                    color: "rgba(0, 0, 0, 0.8700000047683716)",
                    fontSize: "20px",
                    fontWeigt: 500,
                    lineSpacing: "28px"
                  }}
                />
              </div>
              {getGridItem(totalBill, classes, style)}
            </div>
          )
        }
      />
    );
  }
}

const mapStateToProps = state => {
  const { screenConfiguration } = state;
  const { screenConfig, preparedFinalObject } = screenConfiguration;
  const accessoriesUnitData = get(
    preparedFinalObject,
    "LicensesTemp[0].billingSlabData.accessoriesUnitData"
  );
  const tradeUnitData = get(
    preparedFinalObject,
    "LicensesTemp[0].billingSlabData.tradeUnitData"
  );
  const tradeTotal = get(
    preparedFinalObject,
    "LicensesTemp[0].billingSlabData.tradeTotal"
  );
  const accessoriesTotal = get(
    preparedFinalObject,
    "LicensesTemp[0].billingSlabData.accessoriesTotal"
  );

  const open = get(
    screenConfig,
    "search-preview.components.breakUpDialog.props.open"
  );

  return {
    open,
    tradeUnitData,
    accessoriesUnitData,
    tradeTotal,
    accessoriesTotal
  };
};

export default withStyles(styles)(
  connect(mapStateToProps)(ViewBreakupContainer)
);
