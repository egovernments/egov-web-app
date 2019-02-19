import React, { Component } from "react";
import { connect } from "react-redux";
// import UiSelectField from './UiSelectField';
// import { translate, validate_fileupload } from '../../common/common';
// import RaisedButton from 'material-ui/RaisedButton';
// import { DropDown} from "components";
import { SelectField, MenuItem } from "material-ui";
import { Row, Col } from "react-bootstrap";
import _ from "lodash";
import { httpRequest } from "egov-ui-kit/utils/api";
import jp from "jsonpath";
import { withRouter } from "react-router";
import Label from "egov-ui-kit/utils/translationNode";
// import AutoComplete from "material-ui/AutoComplete";


class UiBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boundaryData: [],
      dropDownData: [],
      dropDownDataVal: {},
      labelArr: [],
      viewLabels: [],
      localityArray: [],
    };
  }

  componentDidMount() {
    this.fetchLocations(this.props.item);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (_.get(nextProps.formData, nextProps.item.jsonPath) === "" || _.get(nextProps.formData, nextProps.item.jsonPath) === undefined) {
  //     this.setState({
  //       dropDownDataVal: {},
  //     });
  //   }
  //   if (window.location.hash.split("/")[1] != "create" || nextProps.item.setResponseData == true) {
  //     if (_.get(this.props.formData, this.props.item.jsonPath) != _.get(nextProps.formData, nextProps.item.jsonPath)) {
  //       this.fetchLocations(nextProps.item);
  //     }
  //   }
  // }

  // renderView = (labelData) => {
  //   return (
  //     <div>
  //       <Row>
  //         {!_.isEmpty(labelData)
  //           ? Object.keys(labelData).map((key, index) => {
  //               return (
  //                 <Col
  //                   key={index}
  //                   id={key + index}
  //                   // style={}
  //                   xs={3}
  //                   md={3}
  //                 >
  //                   <label>
  //                     {" "}
  //                     <span style={{ fontSize: "13px", fontWeight: 600 }}> {key} </span>
  //                     <br /> {labelData[key]}
  //                   </label>
  //                 </Col>
  //               );
  //             })
  //           : ""}
  //       </Row>
  //     </div>
  //   );
  // };

  initDropdownValues = (boundaryData, bdryCode) => {
    var ddArr = [];
    var jPath = "";
    var viewLabels = {};
    var pathArr = jp.paths(boundaryData, `$..[?(@.code=='${bdryCode}')]`);
    pathArr = pathArr[0];
    if (pathArr) {
      for (var i = 0; i < pathArr.length; ) {
        ddArr.push(pathArr[i] + "[" + pathArr[i + 1] + "]");
        jPath = ddArr.join(".");
        if (i > 1) {
          var code = jp.query(boundaryData, jPath + ".code");
          var label = jp.query(boundaryData, jPath + ".label");
          var name = jp.query(boundaryData, jPath + ".name");
          viewLabels[label] = name[0];

          //for update screen
          if (this.props.match.url.split("/")[1] != "view") {
            this.handler(code[0], label[0]);
          }
        }
        i += 2;
      }
    }

    this.setState({
      viewLabels: viewLabels,
    });
  };

  fetchBoundaryData = async (item) => {
    let boundaryData = sessionStorage.getItem("boundaryData");
    if (boundaryData) {
      try {
        boundaryData = JSON.parse(boundaryData);
      } catch (error) {
        boundaryData = [];
        console.log(error);
      }
    } else {
      const queryObj = [
        {
          key: "hierarchyTypeCode",
          value: "REVENUE",
        },
      ];
      boundaryData = await httpRequest("/egov-location/location/v11/boundarys/_search?", "", queryObj, {});
      sessionStorage.setItem("boundaryData", JSON.stringify(boundaryData));
    }
    return boundaryData;
  };

  fetchLocations = async (item) => {
    let { resTransfer } = this;
    let self = this;
    const boundaryData = await this.fetchBoundaryData(item);
    var jpath = "";
    let cityBdry = jp.query(boundaryData, `$.TenantBoundary[?(@.hierarchyType.name=="${item.hierarchyType}")].boundary[?(@.label=='City')]`);
    var labelArr = self.fetchLabels(cityBdry[0]);
    self.setState({
      boundaryData: cityBdry,
      labelArr: labelArr,
    });

    self.setFirstDropDownData(cityBdry);

    /**Code to set the localities for the entire tenant (first load)*/
    this.state.localityArray = jp.query(cityBdry, `$..children[?(@.label=="Locality")].code`);
    let e = { target: { value: this.state.localityArray } };
    this.props.handleFieldChange(e, "localityArray", true, "");
    /**End of locality array code*/

    // THIS IS FOR THE UPDATE PART
    // if (window.location.hash.split("/")[1] != "create" || item.setResponseData) {
    //   if (!_.isEmpty(self.props.formData)) {
    //     if (typeof _.get(self.props.formData, self.props.item.jsonPath) != "undefined") {
    //       self.initDropdownValues(cityBdry, _.get(self.props.formData, self.props.item.jsonPath));
    //     }
    //   }
    // }
  };

  getDepth = (obj) => {
    var depth = 0;
    if (obj.children) {
      obj.children.forEach((d) => {
        var tmpDepth = this.getDepth(d);
        if (tmpDepth > depth) {
          depth = tmpDepth;
        }
      });
    }
    return 1 + depth;
  };

  getLabelName = (obj) => {
    var label;
    for (var i = 0; i < obj.length - 1; i++) {
      if (obj[i].code && obj[i].name && obj[i].label && obj[i].code != "" && obj[i].name != "" && obj[i].label != "") {
        return obj[i].label;
      }
    }
    return null;
  };

  fetchLabels = (cityBdry) => {
    var depth;
    var labelArr = [];
    var str = "";
    var bdryArr = [];

    if (cityBdry != null) {
      depth = this.getDepth(cityBdry);
      bdryArr = jp.query(cityBdry, `$.children..label`);
      for (var i = 0; i < bdryArr.length - 1; i++) {
        if (bdryArr[i] !== "") {
          labelArr.push(bdryArr[i]);
        }
      }
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      labelArr = labelArr.filter(onlyUnique);
    }
    return labelArr;
  };
  handler = (key, property) => {
    let { dropDownDataVal, dropDownData } = this.state;

    let newDropDownDataVal = { dropDownDataVal: {} };
    for (let i = 0; i < this.state.labelArr.length; i++) {
      if (this.state.labelArr[i] == property) {
        newDropDownDataVal.dropDownDataVal[property] = key;
        break;
      } else {
        newDropDownDataVal.dropDownDataVal[this.state.labelArr[i]] = dropDownDataVal[this.state.labelArr[i]];
      }
    }
    this.setState(newDropDownDataVal);

    //below runs for create & update only
    this.populateNextDropDown(key, property);

    // if (property == this.state.labelArr[this.state.labelArr.length - 1]) {
    //   this.props.handler(
    //     {
    //       target: {
    //         value: key,
    //       },
    //     },
    //     this.props.item.jsonPath,
    //     this.props.item.isRequired ? true : false,
    //     "",
    //     this.props.item.requiredErrMsg,
    //     this.props.item.patternErrMsg
    //   );
    // }

    /** Old search parameters */
    // let e = { target: { value: key } };
    // this.props.handleFieldChange(e, property, true, "");
    /** END Old search params */

    /** Add locality array to search parameters */
    this.props.handleFieldChange({ target: { value: this.state.localityArray } }, "localityArray", true, "");
    // this.props.handleFieldChange({ target: { value: dropDownData[property].find(o => o.key == key).value } }, property, true, "");
    this.props.handleFieldChange({ target: { value: newDropDownDataVal.dropDownDataVal } }, "ZonalSelection", true, "");
    /** END Add local... */

    console.log(key, property);
  };

  setFirstDropDownData = (cityBdry) => {
    var objArr,
      ddData = [];
    objArr = jp.query(cityBdry, `$.*.children[?(@.label=='${this.state.labelArr[0]}')]`);
    if (objArr.length > 0) {
      objArr.map((v) => {
        var dd = {};
        dd.key = v.code;
        dd.value = v.name;
        ddData.push(dd);
      });
    }
    this.setState({
      dropDownData: {
        ...this.state.dropDownData,
        [this.state.labelArr[0]]: ddData,
      },
    });
  };

  populateNextDropDown = (key, property) => {
    var index = this.state.labelArr.indexOf(property);
    if (index > -1) {
      var objArr,
        ddData = [];
      var str = "";
      for (var i = 0; i < index; i++) {
        str = str + ".*.children";
      }
      var jPath = "$.*.children" + str + `[?(@.code=='${key}')]`;
      objArr = jp.query(this.state.boundaryData, jPath + `.children[?(@.label=='${this.state.labelArr[index + 1]}')]`);

      /**Code to set the locality array locality wise reports data*/
      if (this.state.labelArr.length - index == 2) {
        this.state.localityArray = jp.query(objArr, `$..code`);
      } else if (this.state.labelArr.length - index == 1) {
        this.state.localityArray = [key];
      } else {
        this.state.localityArray = jp.query(objArr, `$..children[?(@.label=="Locality")].code`);
      }
      /**End of locality array code*/

      if (objArr.length > 0) {
        objArr.map((v) => {
          if (v.label == this.state.labelArr[index + 1]) {
            var dd = {};
            dd.key = v.code;
            dd.value = v.name;
            ddData.push(dd);
          }
        });
      }
    }
    this.setState({
      dropDownData: {
        ...this.state.dropDownData,
        [this.state.labelArr[index + 1]]: ddData,
      },
    });
  };

  renderFields = (level) => {
    // const dataSourceConfig = { text: "label", value: "value" };
    let { dropDownDataVal, dropDownData } = this.state;
    let labelProperty = {
      floatingLabelFixed: true,
      floatingLabelText: (
        <div className="rainmaker-displayInline">
          <Label className="show-field-label" label={level} fontSize="18px" containerStyle={{ marginRight: "5px" }} />
          <span style={{ color: "#FF0000" }}>{this.props.item.isRequired ? " *" : ""}</span>
        </div>
      ),
      hintText: "PT_COMMON_PLEASE_SELECT",
    };
    return (
      <SelectField
        // className="custom-form-control-for-select"
        id={this.props.item.jsonPath.split(".").join("-") + "-" + level}
        dropDownMenuProps={{
          targetOrigin: { horizontal: "left", vertical: "bottom" },
        }}
        style={{ display: "inline-block" }}
        errorStyle={{ float: "left" }}
        fullWidth={true}
        // underlineDisabledStyle={{ backgroundColor: "#eee!important" }}
        // {...labelProperty}
        maxHeight={200}
        {...labelProperty}
        disabled={this.props.item.isDisabled}
        value={!_.isEmpty(dropDownDataVal) && dropDownDataVal.hasOwnProperty(level) && dropDownDataVal[level]}
        onChange={(event, key, value) => {
          this.handler(value, level);
        }}
      >
        {dropDownData[level] && dropDownData[level].map((dd, index) => <MenuItem value={dd.key} key={index} primaryText={dd.value} />)}
      </SelectField>

    );
  };

  renderBoundary = (item) => {
    if (window.location.hash.split("/")[1] != "view") {
      // switch (this.props.ui) {
      //   case "google":
      return this.state.labelArr.map((v, i) => {
        return (
          <Col xs={12} sm={4} md={4} lg={4} key={i}>
            {this.renderFields(v)}
          </Col>
        );
      });
      // (
      //   <div>
      //     {/*<Row>*/}
      //       {this.state.labelArr.map((v, i) => {
      //         return (
      //           <Col xs={12} sm={4} md={3} lg={3} key={i}>
      //             {this.renderFields(v)}
      //           </Col>
      //         );
      //       })}
      //     {/*</Row>*/}
      //     <br />
      //   </div>
      // );
      // }
    } else {
    }
  };

  render() {
    console.log(this.state);
    return this.renderBoundary(this.props.item);
    // (
    //   {/*<div style={this.props.item.style && this.props.item.style}>*/}
    //     {/* // The commented part is for view purpose (Populate, upadte, view) */}
    //     {/* {this.props.match.url.split("/")[1] == "view" && typeof _.get(this.props.formData, this.props.item.jsonPath) != "undefined"
    //       ? this.renderView(this.state.viewLabels)
    //       : this.renderBoundary(this.props.item)} */}
    //     {this.renderBoundary(this.props.item)}
    //     {/* {this.props.item.type == 'boundary' ? null : this.props.callbackFromCollectionRoute(this.state.dropDownDataVal, this.state.labelArr)} */}
    //   {/*</div>*/}
    // );
  }
}

const mapStateToProps = (state) => ({
  formData: state.frameworkForm.form,
});

const mapDispatchToProps = (dispatch) => ({
  setFormData: (data) => {
    dispatch({ type: "SET_FORM_DATA", data });
  },
  toggleSnackbarAndSetText: (snackbarState, toastMsg, isSuccess, isError) => {
    dispatch({
      type: "TOGGLE_SNACKBAR_AND_SET_TEXT",
      snackbarState,
      toastMsg,
      isSuccess,
      isError,
    });
  },
  setLoadingStatus: (loadingStatus) => {
    dispatch({ type: "SET_LOADING_STATUS", loadingStatus });
  },
});

export default withRouter(
  connect(
    null,
    null
  )(UiBoundary)
);





// <AutoComplete
//   // className="custom-form-control-for-textfield"
//   // floatingLabelStyle={{ fontSize: "20px"}}
//   fullWidth={true}
//   // style={{ display: "inline-block" }}
//   filter={(searchText, key) => {
//     return key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
//   }}
//   // listStyle={{ maxHeight: 100, overflow: "auto" }}
//   onNewRequest={(value) => {
//     this.props.handler(value,level);
//   }}
//   onUpdateInput={(searchText,dataSource,params)=>{
//      this.handler(searchText, level);
//   }}
//   dataSource={dropDownData[level]}
//   dataSourceConfig={dataSourceConfig}
//   openOnFocus={true}
//   {...labelProperty}
//   disabled={this.props.item.isDisabled}
//     maxHeight={200}
//     style={{ display: "inline-block" }}
//     errorStyle={{ float: "left" }}
//     id={this.props.item.jsonPath.split(".").join("-") + "-" + level}
//     dropDownMenuProps={{
//       targetOrigin: { horizontal: "left", vertical: "bottom" },
//     }}
// />
