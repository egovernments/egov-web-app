import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Label from "../../ui-containers/LabelContainer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import get from "lodash/get";
import { withStyles } from "@material-ui/core/styles";
import "./index.css";

const styles = {
  card: {
    marginLeft: 8,
    marginRight: 8,
    borderRadius: "inherit"
  }
};

class SingleApplication extends React.Component {
  onCardClick = item => {
    const { moduleName } = this.props;
    if (moduleName === "TL") {
      switch (item.status) {
        case "INITIATED":
          return `/tradelicense-citizen/apply?applicationNumber=${
            item.applicationNumber
          }&tenantId=${item.tenantId}`;
        default:
          return `/tradelicence/search-preview?applicationNumber=${
            item.applicationNumber
          }&tenantId=${item.tenantId}`;
      }
    } else if (moduleName === "FIRENOC") {
      switch (item.fireNOCDetails.status) {
        case "INITIATED":
          return `/fire-noc/apply?applicationNumber=${
            item.fireNOCDetails.applicationNumber
          }&tenantId=${item.tenantId}`;
        default:
          return `/tradelicence/search-preview?applicationNumber=${
            item.fireNOCDetails.applicationNumber
          }&tenantId=${item.tenantId}`;
      }
    }
  };

  render() {
    const {
      searchResults,
      onActionClick,
      classes,
      applicationName,
      applicationNumber,
      ownerName,
      moduleNumber,
      status,
      moduleName
    } = this.props;
    return (
      <div className="application-card">
        {searchResults &&
          searchResults.map(item => {
            return (
              <Card className={classes.card}>
                <CardContent>
                  <div>
                    <Grid container style={{ marginBottom: 12 }}>
                      <Grid item xs={6}>
                        <Label
                          label={applicationName.label}
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Label
                          labelKey={get(item, applicationName.jsonPath)}
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container style={{ marginBottom: 12 }}>
                      <Grid item xs={6}>
                        <Label
                          labelKey={applicationNumber.label}
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Label
                          labelKey={get(item, applicationNumber.jsonPath)}
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container style={{ marginBottom: 12 }}>
                      <Grid item xs={6}>
                        <Label
                          labelKey={ownerName.label}
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Label
                          labelKey={get(item, ownerName.jsonPath)}
                          fontSize={14}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                        />
                      </Grid>
                    </Grid>
                    {get(item, moduleNumber.jsonPath) && (
                      <Grid container style={{ marginBottom: 12 }}>
                        <Grid item xs={6}>
                          <Label
                            labelKey={moduleNumber.label}
                            fontSize={14}
                            style={{
                              fontSize: 14,
                              color: "rgba(0, 0, 0, 0.60"
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Label
                            labelKey={get(item, moduleNumber.jsonPath)}
                            style={{
                              fontSize: 14,
                              color: "rgba(0, 0, 0, 0.87"
                            }}
                          />
                        </Grid>
                      </Grid>
                    )}
                    <Grid container style={{ marginBottom: 12 }}>
                      <Grid item xs={6}>
                        <Label
                          labelKey={status.label}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Label
                          labelKey={get(item, status.jsonPath)}
                          style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                        />
                      </Grid>
                    </Grid>
                    <Link to={this.onCardClick(item)}>
                      <div>
                        <Label
                          labelKey={"TL_VIEW_DETAILS"}
                          textTransform={"uppercase"}
                          style={{
                            color: "#fe7a51",
                            fontSize: 14,
                            textTransform: "uppercase"
                          }}
                        />
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const searchResults = get(
    state.screenConfiguration.preparedFinalObject,
    "searchResults",
    []
  );
  return { searchResults };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null
  )(SingleApplication)
);
