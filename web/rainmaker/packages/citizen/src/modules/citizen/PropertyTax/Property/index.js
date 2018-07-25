import React, { Component } from "react";
import { connect } from "react-redux";
import Label from "egov-ui-kit/utils/translationNode";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { Icon, BreadCrumbs } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import { fetchGeneralMDMSData } from "egov-ui-kit/redux/common/actions";
import PropertyInformation from "./components/PropertyInformation";
import ReceiptDialog from "./components/ReceiptDialog";
import isEqual from "lodash/isEqual";
// import PropertyItems from "./components/PropertyInformation/propertyitems";

const innerDivStyle = {
  padding: "20px 56px 20px 50px",
  borderBottom: "1px solid #e0e0e0",
  marginLeft: 0,
};

const IconStyle = {
  margin: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  height: "inherit",
};

const listItemStyle = {
  padding: "0px 20px",
  borderWidth: "10px 10px 0px",
};

class Property extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pathName: null,
      dialogueOpen: false,
    };
  }

  componentDidMount = () => {
    const { location, addBreadCrumbs, fetchGeneralMDMSData, renderCustomTitleForPt, customTitle } = this.props;
    const requestBody = {
      MdmsCriteria: {
        tenantId: "pb",
        moduleDetails: [
          {
            moduleName: "PropertyTax",
            masterDetails: [
              {
                name: "Floor",
              },
              {
                name: "UsageCategoryMajor",
              },
              {
                name: "UsageCategoryMinor",
              },
              {
                name: "UsageCategorySubMinor",
              },
              {
                name: "OccupancyType",
              },
              {
                name: "PropertyType",
              },
            ],
          },
        ],
      },
    };
    fetchGeneralMDMSData(requestBody, "PropertyTax", [
      "Floor",
      "UsageCategoryMajor",
      "UsageCategoryMinor",
      "UsageCategorySubMinor",
      "OccupancyType",
      "PropertyType",
    ]);
    console.log(this.props);
    const { pathname } = location;
    if (!(localStorage.getItem("path") === pathname)) {
      customTitle && addBreadCrumbs({ title: customTitle, path: window.location.pathname });
    }
    renderCustomTitleForPt(customTitle);
  };

  componentWillReceiveProps = (nextProps) => {
    const { customTitle, renderCustomTitleForPt } = this.props;
    if (!isEqual(customTitle, nextProps.customTitle)) {
      renderCustomTitleForPt(nextProps.customTitle);
    }
  };

  closeReceiptDialogue = () => {
    this.setState({ dialogueOpen: false });
  };

  render() {
    const { urls, location, history, assessmentListItems } = this.props;
    let urlArray = [];
    const { pathname } = location;
    if (urls.length === 0 && localStorage.getItem("path") === pathname) {
      urlArray = JSON.parse(localStorage.getItem("breadCrumbObject"));
    }

    return (
      <Screen>
        <BreadCrumbs url={urls.length > 0 ? urls : urlArray} pathname={pathname} history={history} />
        {assessmentListItems && (
          <AssessmentList items={assessmentListItems} innerDivStyle={innerDivStyle} listItemStyle={listItemStyle} history={this.props.history} />
        )}
        <ReceiptDialog open={this.state.dialogueOpen} closeDialogue={this.closeReceiptDialogue} />
      </Screen>
    );
  }
}

const getAddressInfo = (addressObj, extraItems) => {
  return [
    {
      heading: "Property Address",
      iconAction: "action",
      iconName: "home",
      items: [
        {
          key: " House No:",
          value: addressObj.houseNo || "NA",
        },
        {
          key: "Street Name:",
          value: addressObj.street || "NA",
        },
        {
          key: "Pincode:",
          value: addressObj.pincode || "NA",
        },
        {
          key: "Colony Name:",
          value: addressObj.colonyName || "NA",
        },
        {
          key: "Mohalla:",
          value: addressObj.mohalla || "NA",
        },
        ...extraItems,
      ],
    },
  ];
};

const transform = (floor, key, generalMDMSDataById) => {
  const { masterName, dataKey } = key;
  if (!masterName) {
    return floor[dataKey];
  } else {
    if (floor[dataKey] === "NONRESIDENTIAL") {
      return generalMDMSDataById["UsageCategoryMinor"][floor["usageCategoryMinor"]].name;
    } else {
      return generalMDMSDataById[masterName][floor[dataKey]].name;
    }
  }
};

const getAssessmentInfo = (propertyDetails, keys, generalMDMSDataById) => {
  const { units } = propertyDetails;
  return [
    {
      heading: "Assessment Information",
      iconAction: "action",
      iconName: "assignment",
      showTable: true,
      tableHeaderItems: [
        {
          key: "Plot Size:",
          value: propertyDetails.uom ? `${propertyDetails.landArea} ${propertyDetails.uom}` : `${propertyDetails.landArea} sq yards`,
        },
        {
          key: "Type of Building:",
          value: generalMDMSDataById["PropertyType"][propertyDetails.propertyType].name,
        },
      ],
      items: {
        header: ["Floor", "Usage Type", "Sub Usage Type", "Occupancy", "Built Area/Total Annual Rent"],
        values: units.map((floor) => {
          return {
            value: keys.map((key) => {
              return transform(floor, key, generalMDMSDataById);
            }),
          };
        }),
      },
    },
  ];
};

const getOwnerInfo = (ownerDetails) => {
  return [
    {
      heading: "Ownership Information",
      iconAction: "social",
      iconName: "person",
      nestedItems: true,
      items: ownerDetails.map((owner) => {
        return {
          items: [
            {
              key: "Name",
              value: owner.name || "NA",
            },
            {
              key: "Gender:",
              value: owner.gender || "NA",
            },
            {
              key: "Mobile No:",
              value: owner.mobileNumber || "NA",
            },
            {
              key: "Father's Name:",
              value: owner.fatherOrHusbandName || "NA",
            },
            {
              key: "User Category:",
              value: owner.ownerType || "NA",
            },
            {
              key: "Email ID:",
              value: owner.emailId || "NA",
            },
            {
              key: "Correspondence Address:",
              value: owner.correspondenceAddress || "NA",
            },
          ],
        };
      }),
    },
  ];
};

const getLatestPropertyDetails = (propertyDetailsArray) => {
  if (propertyDetailsArray.length > 1) {
    return propertyDetailsArray.reduce((acc, curr) => {
      return acc.assessmentDate > curr.assessmentDate ? acc : curr;
    });
  } else {
    return propertyDetailsArray[0];
  }
};

const mapStateToProps = (state, ownProps) => {
  const { urls } = state.app;
  const { generalMDMSDataById } = state.common || {};
  const { propertiesById } = state.properties || {};
  const propertyId = ownProps.match.params.propertyId;
  const selPropertyDetails = propertiesById[propertyId];
  const latestPropertyDetails = getLatestPropertyDetails(selPropertyDetails.propertyDetails);
  const addressInfo = getAddressInfo(selPropertyDetails.address, [{ key: "Property ID:", value: selPropertyDetails.propertyId }]);
  const assessmentInfoKeys = [
    { masterName: "Floor", dataKey: "floorNo" },
    { masterName: "UsageCategoryMajor", dataKey: "usageCategoryMajor" },
    { masterName: "UsageCategorySubMinor", dataKey: "usageCategorySubMinor" },
    { masterName: "OccupancyType", dataKey: "occupancyType" },
    { masterName: "", dataKey: "unitArea" },
  ];
  const assessmentInfo = generalMDMSDataById ? getAssessmentInfo(latestPropertyDetails, assessmentInfoKeys, generalMDMSDataById) : [];
  const ownerInfo = getOwnerInfo(latestPropertyDetails.owners);
  const propertyItems = [...addressInfo, ...assessmentInfo, ...ownerInfo];
  const customTitle = getCommaSeperatedAddress(selPropertyDetails.address.buildingName, selPropertyDetails.address.street);
  const assessmentListItems = [
    {
      primaryText: <Label label="Property Information" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
      leftIcon: (
        <div style={IconStyle}>
          <Icon action="action" name="info" color="#484848" />
        </div>
      ),
      nestedItems: [
        {
          secondaryText: <PropertyInformation items={propertyItems} propertyTaxAssessmentID={propertyId} />,
        },
      ],
      rightIcon: (
        <div style={IconStyle}>
          <Icon action="hardware" name="keyboard-arrow-right" color="#484848" />
        </div>
      ),
    },
    {
      primaryText: <Label label="Assessment History" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
      leftIcon: (
        <div style={IconStyle}>
          <Icon action="action" name="receipt" color="#484848" style={IconStyle} />
        </div>
      ),
      nestedItems: [
        {
          primaryText: <Label label="2018 - 2019" fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />,
          status: "Paid",
          receipt: true,
        },
        {
          primaryText: <Label label="2017 - 2018" fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />,
          status: "ASSESS & PAY",
          receipt: true,
        },
        {
          primaryText: <Label label="2016 - 2017" fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />,
          status: "Paid",
          receipt: true,
        },
        {
          primaryText: <Label label="2015 - 2016" fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />,
          status: "ASSESS & PAY",
          receipt: true,
        },
        {
          primaryText: <Label label="2014 - 2015" fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />,
          status: "ASSESS & PAY",
          receipt: true,
        },
        {
          primaryText: <Label label="VIEW ALL ASSESSMENTS" fontSize="16px" color="#fe7a51" labelStyle={{ fontWeight: 500 }} />,
        },
      ],
      rightIcon: (
        <div style={IconStyle}>
          <Icon action="hardware" name="keyboard-arrow-right" color="#484848" />
        </div>
      ),
    },
  ];

  return { urls, assessmentListItems, customTitle };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
    fetchGeneralMDMSData: (requestBody, moduleName, masterName) => dispatch(fetchGeneralMDMSData(requestBody, moduleName, masterName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Property);
