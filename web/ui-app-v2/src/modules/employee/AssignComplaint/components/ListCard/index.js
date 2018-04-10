import React, { Component } from "react";
import { Card, Icon, List, Label, AutoSuggest, Button } from "../../../../../components";
import faceOne from "../../../../../assets/images/faceOne.jpg";
import { connect } from "react-redux";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";
import { setRoute } from "redux/app/actions";
import Avatar from "material-ui/Avatar";
import "./index.css";

class ListCard extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/assignComplaint").default;
  }
  APIData = [
    {
      id: 23204,
      code: "658039",
      salutation: "MR.",
      name: "narsappa",
      userName: "narsappa",
      gender: null,
      maritalStatus: null,
      bloodGroup: null,
      permanentAddress: null,
      permanentCity: null,
      permanentPinCode: null,
      correspondenceAddress: null,
      correspondenceCity: null,
      correspondencePinCode: null,
      guardian: null,
      mobileNumber: "0123456789",
      altContactNumber: null,
      emailId: "mail@gmail.com",
      pan: null,
      aadhaarNumber: null,
      placeOfBirth: null,
      active: true,
      type: "EMPLOYEE",
      languagesKnown: null,
      employeeStatus: 4,
      employeeType: 4,
      group: null,
      motherTongue: null,
      identificationMark: null,
      passportNo: null,
      gpfNo: null,
      recruitmentMode: null,
      recruitmentType: null,
      recruitmentQuota: null,
      assignments: [
        {
          id: 1,
          position: 1,
          fund: null,
          functionary: null,
          function: null,
          department: 1,
          designation: 1,
          hod: [],
          isPrimary: true,
          fromDate: "01/04/2015",
          toDate: "31/03/2020",
          grade: null,
          govtOrderNumber: null,
          documents: null,
          createdBy: 1,
          createdDate: "30/05/2017",
          lastModifiedBy: 1,
          lastModifiedDate: null,
          tenantId: null,
        },
      ],
      jurisdictions: [],
      bank: null,
      bankBranch: null,
      dateOfRetirement: null,
      dateOfAppointment: null,
      dateOfJoining: null,
      dob: null,
      retirementAge: null,
      dateOfResignation: null,
      dateOfTermination: null,
      bankAccount: null,
      ifscCode: null,
      documents: null,
      tenantId: "default",
    },
    {
      id: 23205,
      code: "658039",
      salutation: "MR.",
      name: "murali",
      userName: "murali",
      gender: null,
      maritalStatus: null,
      bloodGroup: null,
      permanentAddress: null,
      permanentCity: null,
      permanentPinCode: null,
      correspondenceAddress: null,
      correspondenceCity: null,
      correspondencePinCode: null,
      guardian: null,
      mobileNumber: "0123456789",
      altContactNumber: null,
      emailId: "mail@gmail.com",
      pan: null,
      aadhaarNumber: null,
      placeOfBirth: null,
      active: true,
      type: "EMPLOYEE",
      languagesKnown: null,
      employeeStatus: 4,
      employeeType: 4,
      group: null,
      motherTongue: null,
      identificationMark: null,
      passportNo: null,
      gpfNo: null,
      recruitmentMode: null,
      recruitmentType: null,
      recruitmentQuota: null,
      assignments: [
        {
          id: 1,
          position: 1,
          fund: null,
          functionary: null,
          function: null,
          department: 2,
          designation: 1,
          hod: [],
          isPrimary: true,
          fromDate: "01/04/2015",
          toDate: "31/03/2020",
          grade: null,
          govtOrderNumber: null,
          documents: null,
          createdBy: 1,
          createdDate: "30/05/2017",
          lastModifiedBy: 1,
          lastModifiedDate: null,
          tenantId: null,
        },
      ],
      jurisdictions: [],
      bank: null,
      bankBranch: null,
      dateOfRetirement: null,
      dateOfAppointment: null,
      dateOfJoining: null,
      dob: null,
      retirementAge: null,
      dateOfResignation: null,
      dateOfTermination: null,
      bankAccount: null,
      ifscCode: null,
      documents: null,
      tenantId: "default",
    },
    {
      id: 23207,
      code: "658039",
      salutation: "MR.",
      name: "manu",
      userName: "manu",
      gender: null,
      maritalStatus: null,
      bloodGroup: null,
      permanentAddress: null,
      permanentCity: null,
      permanentPinCode: null,
      correspondenceAddress: null,
      correspondenceCity: null,
      correspondencePinCode: null,
      guardian: null,
      mobileNumber: "0123456789",
      altContactNumber: null,
      emailId: "mail@gmail.com",
      pan: null,
      aadhaarNumber: null,
      placeOfBirth: null,
      active: true,
      type: "EMPLOYEE",
      languagesKnown: null,
      employeeStatus: 4,
      employeeType: 4,
      group: null,
      motherTongue: null,
      identificationMark: null,
      passportNo: null,
      gpfNo: null,
      recruitmentMode: null,
      recruitmentType: null,
      recruitmentQuota: null,
      assignments: [
        {
          id: 1,
          position: 1,
          fund: null,
          functionary: null,
          function: null,
          department: 1,
          designation: 1,
          hod: [],
          isPrimary: true,
          fromDate: "01/04/2015",
          toDate: "31/03/2020",
          grade: null,
          govtOrderNumber: null,
          documents: null,
          createdBy: 1,
          createdDate: "30/05/2017",
          lastModifiedBy: 1,
          lastModifiedDate: null,
          tenantId: null,
        },
      ],
      jurisdictions: [],
      bank: null,
      bankBranch: null,
      dateOfRetirement: null,
      dateOfAppointment: null,
      dateOfJoining: null,
      dob: null,
      retirementAge: null,
      dateOfResignation: null,
      dateOfTermination: null,
      bankAccount: null,
      ifscCode: null,
      documents: null,
      tenantId: "default",
    },
  ];
  state = {
    results: [],
    searchTerm: "",
    selectedEmployeeId: "",
    dataSource: [],
  };

  avatarStyle = {
    top: 8,
    left: 17,
  };

  mainLabelStyle = {
    letterSpacing: 0.6,
    marginBottom: 4,
  };
  callIconStyle = {
    width: 16,
    height: 16,
    top: 16,
    right: 28,
    margin: "0px",
  };

  dataSource = [
    {
      id: 0,
      primaryText: (
        <Label
          label="Engineering Department"
          dark={true}
          bold={true}
          containerStyle={{ position: "absolute", top: 0, left: 0 }}
          labelStyle={this.mainLabelStyle}
        />
      ),
      open: true,
      nestedItems: [
        {
          id: 1,
          primaryText: <Label label="Amandeep Singh (10)" dark={true} bold={true} labelStyle={this.mainLabelStyle} />,
          leftAvatar: <Avatar size={33} src={faceOne} style={this.avatarStyle} />,
          secondaryText: <Label label="Junior Engineer" style={{ letterSpacing: 0 }} />,
          rightIcon: <Icon action="communication" name="call" style={this.callIconStyle} color="#22b25f" />,
        },
        {
          id: 2,
          primaryText: <Label label="Bhavneet Singh (15)" dark={true} bold={true} labelStyle={this.mainLabelStyle} />,
          leftAvatar: <Avatar size={33} src={faceOne} style={this.avatarStyle} />,
          secondaryText: <Label label="Junior Engineer" style={{ letterSpacing: 0 }} />,
          rightIcon: <Icon action="communication" name="call" style={this.callIconStyle} color="#22b25f" />,
        },
        {
          id: 3,
          primaryText: <Label label="Chirag Kapoor (10)" dark={true} bold={true} labelStyle={this.mainLabelStyle} />,
          leftAvatar: <Avatar size={33} src={faceOne} style={this.avatarStyle} />,
          secondaryText: <Label label="Junior Engineer" style={{ letterSpacing: 0 }} />,
          rightIcon: <Icon action="communication" name="call" style={this.callIconStyle} color="#22b25f" />,
        },
      ],
    },
    {
      id: 5,
      primaryText: (
        <Label
          label="Health & Sanitation Department"
          dark={true}
          bold={true}
          containerStyle={{ position: "absolute", top: 0, left: 0 }}
          labelStyle={this.mainLabelStyle}
        />
      ),
      open: true,
      nestedItems: [
        {
          id: 6,
          primaryText: <Label label="Khushwant Singh (10)" dark={true} bold={true} labelStyle={this.mainLabelStyle} />,
          leftAvatar: <Avatar size={33} src={faceOne} style={this.avatarStyle} />,
          secondaryText: <Label label="Junior Engineer" style={{ letterSpacing: 0 }} />,
          rightIcon: <Icon action="communication" name="call" style={this.callIconStyle} color="#22b25f" />,
        },
        {
          id: 7,
          primaryText: <Label label="Kunwar Sandhu (15)" dark={true} bold={true} labelStyle={this.mainLabelStyle} />,
          leftAvatar: <Avatar size={33} src={faceOne} style={this.avatarStyle} />,
          secondaryText: <Label label="Junior Engineer" style={{ letterSpacing: 0 }} />,
          rightIcon: <Icon action="communication" name="call" style={this.callIconStyle} color="#22b25f" />,
        },
        {
          id: 8,
          primaryText: <Label label="Mandeep Singh (10)" dark={true} bold={true} labelStyle={this.mainLabelStyle} />,
          leftAvatar: <Avatar size={33} src={faceOne} style={this.avatarStyle} />,
          secondaryText: <Label label="Junior Engineer" style={{ letterSpacing: 0 }} />,
          rightIcon: <Icon action="communication" name="call" style={this.callIconStyle} color="#22b25f" />,
        },
      ],
    },
  ];

  getDesignation = (status) => {
    return "Engineer";
  };

  getDepartment = (deptId) => {
    switch (deptId) {
      case 1:
        return "Department 1";
        break;
      case 2:
        return "Department 2";
        break;
    }
  };

  prepareRawDataToFormat = (rawData) => {
    let { getDepartment, getDesignation } = this;
    const seperateByDepartment = rawData.reduce((result, item) => {
      if (!result[item.assignments[0].department]) result[item.assignments[0].department] = [];
      result[item.assignments[0].department].push(item);
      return result;
    }, {});
    return Object.keys(seperateByDepartment).map((depDetails, index) => {
      return {
        id: seperateByDepartment[depDetails][0].assignments[0].department,
        primaryText: (
          <Label
            label={getDepartment(seperateByDepartment[depDetails][0].assignments[0].department)}
            dark={true}
            bold={true}
            containerStyle={{ position: "absolute", top: 0, left: 0 }}
            labelStyle={this.mainLabelStyle}
          />
        ),
        open: true,
        nestedItems: seperateByDepartment[depDetails].map((depItem, depItemIndex) => {
          return {
            id: depItem.id,
            primaryText: <Label label={depItem && depItem.name} dark={true} bold={true} labelStyle={this.mainLabelStyle} />,
            leftAvatar: <Avatar size={33} src={faceOne} style={this.avatarStyle} />,
            secondaryText: (
              <Label label={depItem && depItem.assignments && getDesignation(depItem.assignments[0].designation)} style={{ letterSpacing: 0 }} />
            ),
            rightIcon: <Icon action="communication" name="call" style={this.callIconStyle} color="#22b25f" />,
          };
        }),
      };
    });
  };

  componentDidMount() {
    let { initForm } = this.props;
    let { prepareRawDataToFormat, generateDataSource, APIData } = this;
    initForm(this.formConfig);
    const dataSource = prepareRawDataToFormat(APIData);
    this.setState({ dataSource });
  }

  prepareResultsForDisplay = (results = []) => {
    return results.map((result) => {
      const listItem = {};
      listItem.id = result.id;
      listItem.primaryText = result.primaryText;
      listItem.open = result.open;
      listItem.secondaryText = result.secondaryText;
      listItem.leftAvatar = result.leftAvatar;
      listItem.rightIcon = result.rightIcon;
      if (result.nestedItems) {
        listItem.nestedItems = result.nestedItems.map((nestedItem, index) => {
          const item = {};
          item.id = nestedItem.id;
          item.primaryText = nestedItem.primaryText;
          item.secondaryText = nestedItem.secondaryText;
          item.leftAvatar = nestedItem.leftAvatar;
          item.rightIcon = nestedItem.rightIcon;
          item.onClick = this.onEmployeeChosen.bind(null, item);
          return item;
        });
      }

      return listItem;
    });
  };

  onEmployeeChosen = (item, index) => {
    let { handleFieldChange } = this.props;
    let { dataSource } = this.state;
    const isReassignScreen = window.location.href.includes("reassign-complaint") ? true : false;
    handleFieldChange(this.formConfig.name, "assignee", item.id);
    isReassignScreen ? handleFieldChange(this.formConfig.name, "action", "reassign") : handleFieldChange(this.formConfig.name, "action", "assign");
    this.setState({ selectedEmployeeId: item.id });
  };

  renderList = (dataSource, enableClick) => {
    return (
      <List
        onItemClick={enableClick && this.onEmployeeChosen}
        listItemStyle={{ paddingTop: "8px", paddingBottom: "8px" }}
        nestedListStyle={{ padding: "0px", background: "#ffffff" }}
        autoGenerateNestedIndicator={false}
        primaryTogglesNestedList={true}
        innerDivStyle={{ padding: "8px 0 8px 72px", margin: 0 }}
        items={dataSource}
      />
    );
  };

  autoSuggestCallback = (results = [], searchTerm) => {
    this.setState({ results, searchTerm });
  };

  generateDataSource = (dataSource) => {
    return dataSource.reduce((transformedDataSource, source) => {
      return transformedDataSource.concat(source.nestedItems);
    }, []);
  };

  submitAssignee = (formKey, label) => {
    let { submitForm, setRoute } = this.props;
    let { selectedEmployeeId } = this.state;
    selectedEmployeeId && submitForm(formKey);
    switch (label) {
      case "ASSIGN":
        setRoute("/employee/complaint-assigned");
        break;
      case "RE-ASSIGN":
        setRoute("/employee/complaint-reassigned");
        break;
    }
  };

  render() {
    let { prepareResultsForDisplay, renderList, APIData, generateDataSource, prepareRawDataToFormat } = this;
    const { dataSource } = this.state;
    const transformedDataSource = generateDataSource(dataSource);
    const { results, searchTerm } = this.state;
    const displayInitialList = searchTerm.length === 0 ? true : false;
    const isEmployeeDirectory = window.location.href.includes("employee-directory") ? true : false;
    const isReassignScreen = window.location.href.includes("reassign-complaint") ? true : false;
    const { name: formKey } = this.formConfig;
    return (
      <div>
        <Card
          className="assign-complaint-main-card"
          textChildren={
            <div>
              <div className="employee-search-cont">
                {isEmployeeDirectory ? (
                  ""
                ) : (
                  <Label
                    label="Choose Employee to re-assign complaint to from the list"
                    labelStyle={this.mainLabelStyle}
                    containerStyle={{ padding: "0 40px 0 0" }}
                  />
                )}

                <AutoSuggest
                  id="employee-search"
                  containerStyle={{
                    margin: "16px 0",
                    padding: "0 8px",
                    background: "#f8f8f8",
                  }}
                  textFieldStyle={{ border: 0 }}
                  searchInputText="Search Employee"
                  searchKey="primaryText"
                  iconStyle={{ right: 15, left: "inherit" }}
                  hintStyle={{ letterSpacing: 0, bottom: 10, fontSize: 14 }}
                  iconPosition="after"
                  callback={this.autoSuggestCallback}
                  dataSource={transformedDataSource}
                />
              </div>
              <div className="employee-list-cont">
                {displayInitialList
                  ? renderList(prepareResultsForDisplay(dataSource))
                  : isEmployeeDirectory ? renderList(prepareResultsForDisplay(dataSource)) : this.renderList(prepareResultsForDisplay(results), true)}
              </div>
            </div>
          }
        />
        <div className="assign-complaint-button-cont">
          <Button
            primary={true}
            fullWidth={true}
            label={<Label buttonLabel={true} label={isReassignScreen ? "RE-ASSIGN" : "ASSIGN"} />}
            onClick={() => this.submitAssignee(formKey, isReassignScreen ? "RE-ASSIGN" : "ASSIGN")}
          />
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(null, mapDispatchToProps)(ListCard);
