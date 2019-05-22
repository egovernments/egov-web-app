import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  handleFileUpload,
  getFileUrlFromAPI
} from "egov-ui-framework/ui-utils/commons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { UploadSingleFile } from "../../ui-molecules-local";
import get from "lodash/get";

const themeStyles = theme => ({
  documentContainer: {
    backgroundColor: "#F2F2F2",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "16px"
  },
  documentCard: {
    backgroundColor: "#F2F2F2",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "16px"
  },
  documentSubCard: {
    backgroundColor: "#F2F2F2",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "10px",
    border: "#d6d6d6",
    borderStyle: "solid",
    borderWidth: "1px"
  },
  documentIcon: {
    backgroundColor: "#FFFFFF",
    borderRadius: "100%",
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.8700000047683716)",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: 400,
    letterSpacing: "0.83px",
    lineHeight: "24px"
  },
  documentSuccess: {
    borderRadius: "100%",
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39CB74",
    color: "white"
  },
  button: {
    margin: theme.spacing.unit,
    padding: "8px 38px"
  },
  input: {
    display: "none"
  },
  iconDiv: {
    display: "flex",
    alignItems: "center"
  },
  descriptionDiv: {
    display: "flex",
    alignItems: "center"
  },
  formControl: {
    minWidth: 250,
    padding: "0px"
  },
  fileUploadDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: "5px"
  }
});

const styles = {
  documentTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "0.67px",
    lineHeight: "19px",
    paddingBottom: "5px"
  },
  documentName: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 400,
    letterSpacing: "0.67px",
    lineHeight: "19px"
  },
  dropdownLabel: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "12px"
  }
};

const requiredIcon = (
  <sup style={{ color: "#E54D42", paddingLeft: "5px" }}>*</sup>
);

class DocumentList extends Component {
  state = {
    uploadedDocIndex: 0,
    uploadedIndex: [],
    uploadedDocuments: [],
    selectValue: []
  };

  componentDidMount = () => {
    const {
      prepareFinalObject,
      uploadedDocsInRedux: uploadedDocuments
    } = this.props;
    if (uploadedDocuments) {
      const uploadedIndex = Object.keys(uploadedDocuments).map(item => {
        return parseInt(item); //returns string so convert to integer
      });
      this.setState({ uploadedDocuments, uploadedIndex });
    }
    Object.values(uploadedDocuments).forEach((item, index) => {
      prepareFinalObject(`noc.documents[${index}]`, { ...item[0] });
    });
  };

  onUploadClick = uploadedDocIndex => {
    this.setState({ uploadedDocIndex });
  };

  handleDocument = async (file, fileStoreId) => {
    let { uploadedDocIndex, uploadedDocuments } = this.state;
    const { prepareFinalObject, documents, tenantId } = this.props;
    const { jsonPath, name } = documents[uploadedDocIndex];
    const fileUrl = await getFileUrlFromAPI(fileStoreId);
    uploadedDocuments = {
      ...uploadedDocuments,
      [uploadedDocIndex]: [
        {
          fileName: file.name,
          fileStoreId,
          fileUrl: Object.values(fileUrl)[0],
          documentType: name,
          tenantId
        }
      ]
    };

    prepareFinalObject("nocTemp.uploadedDocsInRedux", {
      ...uploadedDocuments
    });

    prepareFinalObject(jsonPath, {
      fileName: file.name,
      fileStoreId,
      fileUrl: Object.values(fileUrl)[0],
      documentType: name,
      tenantId
    });
    this.setState({ uploadedDocuments });
    this.getFileUploadStatus(true, uploadedDocIndex);
  };

  removeDocument = remDocIndex => {
    let { uploadedDocuments } = this.state;
    const { prepareFinalObject, documents } = this.props;
    const jsonPath = documents[remDocIndex].jsonPath;
    uploadedDocuments[remDocIndex] = {};
    prepareFinalObject(jsonPath, uploadedDocuments[remDocIndex]);
    this.setState({ uploadedDocuments });
    this.getFileUploadStatus(false, remDocIndex);
  };

  getFileUploadStatus = (status, index) => {
    const { uploadedIndex } = this.state;
    if (status) {
      uploadedIndex.push(index);
      this.setState({ uploadedIndex });
    } else {
      const deletedIndex = uploadedIndex.findIndex(item => item === index);
      uploadedIndex.splice(deletedIndex, 1);
      this.setState({ uploadedIndex });
    }
  };

  handleChange = (key, event) => {
    const { documentsUploadRedux, prepareFinalObject } = this.props;
    prepareFinalObject(`documentsUploadRedux`, {
      ...documentsUploadRedux,
      [key]: { dropdown: { value: event.target.value } }
    });
  };

  getUploadCard = (card, key) => {
    const { classes, documentsUploadRedux } = this.props;
    const { uploadedIndex } = this.state;
    return (
      <Grid container={true}>
        <Grid item={true} xs={2} sm={1} className={classes.iconDiv}>
          {uploadedIndex.indexOf(key) > -1 ? (
            <div className={classes.documentSuccess}>
              <Icon>
                <i class="material-icons">done</i>
              </Icon>
            </div>
          ) : (
            <div className={classes.documentIcon}>
              <span>{key + 1}</span>
            </div>
          )}
        </Grid>
        <Grid
          item={true}
          xs={10}
          sm={5}
          md={4}
          align="left"
          className={classes.descriptionDiv}
        >
          <LabelContainer labelKey={card.name} style={styles.documentName} />
          {card.required && requiredIcon}
          {/* <Typography variant="caption">{document.statement}</Typography>
          <Typography variant="caption">{description}</Typography> */}
        </Grid>
        <Grid item={true} xs={12} sm={6} md={4}>
          {card.dropdown && (
            <FormControl required className={classes.formControl}>
              {/* <InputLabel shrink htmlFor="age-label-placeholder">
                {card.dropdown.label}
              </InputLabel> */}
              <Grid className={classes.descriptionDiv}>
                <LabelContainer
                  labelKey={card.dropdown.label}
                  style={styles.dropdownLabel}
                />
                {card.dropdown.required && requiredIcon}
              </Grid>
              <Select
                value={
                  documentsUploadRedux[key] &&
                  (documentsUploadRedux[key].dropdown.value ||
                    documentsUploadRedux[key].dropdown.initialValue)
                }
                onChange={event => this.handleChange(key, event)}
                name="selected-document"
                required
              >
                {card.dropdown.menu &&
                  card.dropdown.menu.map(item => {
                    return (
                      <MenuItem value={item.code}>
                        <LabelContainer labelKey={item.code} />
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          )}
        </Grid>
        <Grid
          item={true}
          xs={12}
          sm={12}
          md={3}
          className={classes.fileUploadDiv}
        >
          <UploadSingleFile
            classes={this.props.classes}
            handleFileUpload={e =>
              handleFileUpload(e, this.handleDocument, this.props)
            }
            uploaded={uploadedIndex.indexOf(key) > -1}
            removeDocument={() => this.removeDocument(key)}
            documents={this.state.uploadedDocuments[key]}
            onButtonClick={() => this.onUploadClick(key)}
            inputProps={this.props.inputProps}
            buttonLabel={this.props.buttonLabel}
          />
        </Grid>
      </Grid>
    );
  };

  render() {
    const { classes, documentsList } = this.props;
    let index = 0;
    return (
      <div>
        {documentsList &&
          documentsList.map(container => {
            return (
              <div>
                <LabelContainer
                  labelKey={container.title}
                  style={styles.documentTitle}
                />
                {container.cards.map(card => {
                  return (
                    <div className={classes.documentContainer}>
                      {card.hasSubCards && (
                        <LabelContainer
                          labelKey={card.name}
                          style={styles.documentTitle}
                        />
                      )}
                      {card.hasSubCards &&
                        card.subCards.map(subCard => {
                          return (
                            <div className={classes.documentSubCard}>
                              {this.getUploadCard(subCard, index++)}
                            </div>
                          );
                        })}
                      {!card.hasSubCards && (
                        <div>{this.getUploadCard(card, index++)}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    );
  }
}

DocumentList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { screenConfiguration } = state;
  const documentsUploadRedux = get(
    screenConfiguration.preparedFinalObject,
    "documentsUploadRedux",
    {}
  );
  return { documentsUploadRedux };
};

const mapDispatchToProps = dispatch => {
  return {
    prepareFinalObject: (jsonPath, value) =>
      dispatch(prepareFinalObject(jsonPath, value))
  };
};

export default withStyles(themeStyles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DocumentList)
);
