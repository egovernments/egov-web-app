import React, { Component } from "react";
import { connect } from "react-redux";
import Label from "egov-ui-kit/utils/translationNode";
import { getCommaSeperatedAddress } from "egov-ui-kit/utils/commons";
import { AssessmentList, YearDialogue } from "modules/common";
import { Screen } from "modules/common";
import { Icon } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import { fetchGeneralMDMSData } from "egov-ui-kit/redux/common/actions";
import { fetchProperties, getSingleAssesmentandStatus } from "egov-ui-kit/redux/properties/actions";
import PropertyInformation from "./components/PropertyInformation";
import { getCompletedTransformedItems } from "egov-ui-kit/common/propertyTax/TransformedAssessments";
import isEqual from "lodash/isEqual";
import orderby from "lodash/orderBy";

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
      urlToAppend: "",
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

  onListItemClick = (item) => {
    const { getSingleAssesmentandStatus } = this.props;
    const { route } = item;
    route && getSingleAssesmentandStatus(route);
  };

  onAssessPayClick = () => {
    const { selPropertyDetails, propertyId, tenantId } = this.props;
    const assessmentNo = selPropertyDetails && selPropertyDetails.assessmentNumber;
    console.log(assessmentNo);
    this.setState({
      dialogueOpen: true,
      urlToAppend: `/property-tax/assessment-form?assessmentId=${assessmentNo}&isReassesment=true&propertyId=${propertyId}&tenantId=${tenantId}`,
    });
  };
  getAssessmentListItems = (props) => {
    const { propertyItems, propertyId, tenantId, history, sortedAssessments, selPropertyDetails } = props;
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
            secondaryText: (
              <PropertyInformation
                items={propertyItems}
                propertyTaxAssessmentID={propertyId}
                history={history}
                tenantId={tenantId}
                onButtonClick={this.onAssessPayClick}
              />
            ),
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
        route: selPropertyDetails,
        nestedItems: sortedAssessments && sortedAssessments,
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

  closeYearRangeDialogue = () => {
    this.setState({ dialogueOpen: false });
  };

  render() {
    const { history } = this.props;
    const { closeYearRangeDialogue } = this;
    const { dialogueOpen, urlToAppend } = this.state;
    return (
      <Screen>
        <AssessmentList
          onItemClick={this.onListItemClick}
          items={this.getAssessmentListItems(this.props)}
          innerDivStyle={innerDivStyle}
          listItemStyle={listItemStyle}
          history={history}
          hoverColor="#fff"
        />

        {dialogueOpen && <YearDialogue open={dialogueOpen} history={history} urlToAppend={urlToAppend} closeDialogue={closeYearRangeDialogue} />}
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
            value: addressObj.doorNo || "NA",
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
            value: addressObj.buildingName || "NA",
          },
          {
            key: "Mohalla:",
            value: addressObj.locality.name || "NA",
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
  const { urls, localizationLabels } = state.app;
  const { common } = state;
  const { cities } = common;
  const { generalMDMSDataById } = state.common || {};
  const { propertiesById, singleAssessmentByStatus } = state.properties || {};
  const propertyId = ownProps.match.params.propertyId;
  const tenantId = ownProps.match.params.tenantId;
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
  const completedAssessments = getCompletedTransformedItems(singleAssessmentByStatus, cities, localizationLabels);
  const sortedAssessments = completedAssessments && orderby(completedAssessments, ["epocDate"], ["desc"]);
  return { urls, propertyItems, tenantId, propertyId, customTitle, selPropertyDetails, sortedAssessments };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
    fetchGeneralMDMSData: (requestBody, moduleName, masterName) => dispatch(fetchGeneralMDMSData(requestBody, moduleName, masterName)),
    fetchProperties: (queryObjectProperty) => dispatch(fetchProperties(queryObjectProperty)),
    getSingleAssesmentandStatus: (queryObj) => dispatch(getSingleAssesmentandStatus(queryObj)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Property);
