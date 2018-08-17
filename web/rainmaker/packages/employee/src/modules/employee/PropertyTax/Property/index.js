import React, { Component } from "react";
import { connect } from "react-redux";
import Label from "egov-ui-kit/utils/translationNode";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";
import { AssessmentList } from "modules/common";
import { Screen } from "modules/common";
import { Icon } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import { fetchGeneralMDMSData } from "egov-ui-kit/redux/common/actions";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";
import PropertyInformation from "./components/PropertyInformation";
import isEqual from "lodash/isEqual";

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
    const { fetchProperties, fetchGeneralMDMSData, renderCustomTitleForPt, customTitle } = this.props;
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
    fetchProperties([{ key: "ids", value: this.props.match.params.propertyId }, { key: "tenantId", value: this.props.match.params.tenantId }]);
    renderCustomTitleForPt(customTitle);
  };

  getAssessmentListItems = (props) => {
    const { propertyItems, propertyId, history, transformedAssessments } = props;
    console.log(transformedAssessments);
    const viewAllAssessmentItem = {
      primaryText: (
        <div
          onClick={() => {
            history.push(`/property-tax/my-properties/property/view-assessments/${propertyId}`);
          }}
        >
          <Label label="PT_PROPERTY_VIEW_ALL_ASSESSMENTS" fontSize="16px" color="#fe7a51" bold={true} />
        </div>
      ),
    };
    transformedAssessments && transformedAssessments.push(viewAllAssessmentItem);
    return [
      {
        primaryText: <Label label="PT_PROPERTY_INFORMATION" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
        leftIcon: (
          <div style={IconStyle}>
            <Icon action="action" name="info" color="#484848" />
          </div>
        ),
        nestedItems: [
          {
            secondaryText: <PropertyInformation items={propertyItems} propertyTaxAssessmentID={propertyId} history={history} />,
          },
        ],
        rightIcon: (
          <div style={IconStyle}>
            <Icon action="hardware" name="keyboard-arrow-right" color="#484848" />
          </div>
        ),
        initiallyOpen: true,
      },
      {
        primaryText: <Label label="PT_PROPERTY_ASSESSMENT_HISTORY" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
        leftIcon: (
          <div style={IconStyle}>
            <Icon action="action" name="receipt" color="#484848" style={IconStyle} />
          </div>
        ),
        nestedItems: transformedAssessments,
        rightIcon: (
          <div style={IconStyle}>
            <Icon action="hardware" name="keyboard-arrow-right" color="#484848" />
          </div>
        ),
      },
    ];
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
    const { history, transformedAssessments } = this.props;

    return (
      <Screen>
        {transformedAssessments && (
          <AssessmentList
            items={this.getAssessmentListItems(this.props)}
            innerDivStyle={innerDivStyle}
            listItemStyle={listItemStyle}
            history={history}
          />
        )}
      </Screen>
    );
  }
}

const getAddressInfo = (addressObj, extraItems) => {
  return (
    addressObj && [
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
    ]
  );
};

const transform = (floor, key, generalMDMSDataById) => {
  const { masterName, dataKey } = key;
  if (!masterName) {
    return floor[dataKey];
  } else {
    if (floor[dataKey]) {
      if (floor[dataKey] === "NONRESIDENTIAL") {
        return generalMDMSDataById["UsageCategoryMinor"] ? generalMDMSDataById["UsageCategoryMinor"][floor["usageCategoryMinor"]].name : "";
      } else if (floor[dataKey] === "RESIDENTIAL") {
        return generalMDMSDataById["UsageCategoryMajor"] ? generalMDMSDataById["UsageCategoryMajor"][floor[dataKey]].name : "";
      } else {
        return generalMDMSDataById[masterName] ? generalMDMSDataById[masterName][floor[dataKey]].name : "";
      }
    } else {
      return "-";
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
          value:
            generalMDMSDataById && generalMDMSDataById["PropertyType"] && generalMDMSDataById["PropertyType"][propertyDetails.propertyType]
              ? generalMDMSDataById["PropertyType"][propertyDetails.propertyType].name
              : "NA",
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
  if (propertyDetailsArray) {
    if (propertyDetailsArray.length > 1) {
      return propertyDetailsArray.reduce((acc, curr) => {
        return acc.assessmentDate > curr.assessmentDate ? acc : curr;
      });
    } else {
      return propertyDetailsArray[0];
    }
  } else {
    return;
  }
};

const mapStateToProps = (state, ownProps) => {
  // const { urls } = state.app;
  // const { generalMDMSDataById } = state.common || {};
  // const { propertiesById } = state.properties || {};
  // const propertyId = ownProps.match.params.propertyId;
  // const selPropertyDetails = propertiesById[propertyId];
  // const latestPropertyDetails = getLatestPropertyDetails(selPropertyDetails.propertyDetails);
  // const addressInfo = getAddressInfo(selPropertyDetails.address, [{ key: "Property ID:", value: selPropertyDetails.propertyId }]);
  // const assessmentInfoKeys = [
  //   { masterName: "Floor", dataKey: "floorNo" },
  //   { masterName: "UsageCategoryMajor", dataKey: "usageCategoryMajor" },
  //   { masterName: "UsageCategorySubMinor", dataKey: "usageCategorySubMinor" },
  //   { masterName: "OccupancyType", dataKey: "occupancyType" },
  //   { masterName: "", dataKey: "unitArea" },
  // ];
  // const assessmentInfo = generalMDMSDataById ? getAssessmentInfo(latestPropertyDetails, assessmentInfoKeys, generalMDMSDataById) : [];
  // const ownerInfo = getOwnerInfo(latestPropertyDetails.owners);
  // const propertyItems = [...addressInfo, ...assessmentInfo, ...ownerInfo];
  // const customTitle = getCommaSeperatedAddress(selPropertyDetails.address.buildingName, selPropertyDetails.address.street);

  // const { propertyDetails } = selPropertyDetails;
  // let transformedAssessments = Object.values(propertyDetails).map((assessment, index) => {
  //   return {
  //     primaryText: <Label label={assessment.financialYear} fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />,
  //     status: "ASSESS & PAY",
  //     receipt: true,
  //     assessmentNo: assessment.assessmentNumber,
  //   };
  // });
  // return { urls, propertyItems, propertyId, customTitle, transformedAssessments };
  const { urls } = state.app;
  const { common } = state;
  const { cities } = common;
  const { generalMDMSDataById } = state.common || {};
  const { propertiesById } = state.properties || {};
  const propertyId = ownProps.match.params.propertyId;
  const selPropertyDetails = propertiesById[propertyId] || {};
  const latestPropertyDetails = getLatestPropertyDetails(selPropertyDetails.propertyDetails);
  const addressInfo = getAddressInfo(selPropertyDetails.address, [{ key: "Property ID:", value: selPropertyDetails.propertyId }]) || [];
  const assessmentInfoKeys = [
    { masterName: "Floor", dataKey: "floorNo" },
    { masterName: "UsageCategoryMajor", dataKey: "usageCategoryMajor" },
    { masterName: "UsageCategorySubMinor", dataKey: "usageCategorySubMinor" },
    { masterName: "OccupancyType", dataKey: "occupancyType" },
    { masterName: "", dataKey: "unitArea" },
  ];
  const assessmentInfo = generalMDMSDataById
    ? latestPropertyDetails
      ? getAssessmentInfo(latestPropertyDetails, assessmentInfoKeys, generalMDMSDataById)
      : []
    : [];
  const ownerInfo = (latestPropertyDetails && getOwnerInfo(latestPropertyDetails.owners)) || [];
  const propertyItems = [...addressInfo, ...assessmentInfo, ...ownerInfo];
  const customTitle = selPropertyDetails && selPropertyDetails.address && getCommaSeperatedAddress(selPropertyDetails.address, cities);
  const { propertyDetails } = selPropertyDetails;
  let transformedAssessments =
    propertyDetails &&
    Object.values(propertyDetails).map((assessment, index) => {
      return {
        primaryText: <Label label={assessment.financialYear} fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />,
        status: "ASSESS & PAY",
        receipt: true,
        assessmentNo: assessment.assessmentNumber,
        financialYear: assessment.financialYear,
        propertyId: propertyId,
      };
    });
  return { urls, propertyItems, propertyId, customTitle, transformedAssessments };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
    fetchGeneralMDMSData: (requestBody, moduleName, masterName) => dispatch(fetchGeneralMDMSData(requestBody, moduleName, masterName)),
    fetchProperties: (queryObjectProperty) => dispatch(fetchProperties(queryObjectProperty)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Property);
