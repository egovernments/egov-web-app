import {
  getCommonHeader,
  getCommonCard,
  getCommonTitle,
  getCommonParagraph,
  getLabel,
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getDivider,
  getLabelWithValue
} from "mihy-ui-framework/ui-config/screens/specs/utils";

const header = getCommonHeader("Trade License Application (2018-2019)");

const estimate = getCommonGrayCard({
  estimateSection: {
    uiFramework: "custom-molecules",
    componentPath: "FeesEstimateCard",
    props: {
      estimate: {
        header: "Trade License Fee",
        fees: [
          { name: "Trade License Charge" },
          { name: "Penalty", value: 500 },
          { name: "Rebate", value: 200 }
        ],
        extra: [
          { textLeft: "Last Date for Rebate (20% of TL)" },
          {
            textLeft: "Penalty (10% of TL) applicable from"
          },
          { textLeft: "Additoinal Penalty (20% of TL) applicable from" }
        ]
      }
    }
  }
});

const reviewTradeDetails = getCommonGrayCard({
  headerDiv: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    children: {
      header: {
        gridDefination: {
          xs: "12",
          sm: "10"
        },
        ...getCommonSubHeader("Trade Details")
      }
    }
  },
  viewOne: getCommonContainer({
    reviewLicenceType: getLabelWithValue("Licence Type", "Temporary"),
    reviewTradeName: getLabelWithValue("Trade Name", "Matchbox Packing Unit"),
    reviewTradeMobility: getLabelWithValue("Trade Mobility", "Immovable"),
    reviewCommencementDate: getLabelWithValue(
      "Commencement Date",
      "12/12/2018"
    ),
    reviewOperationalArea: getLabelWithValue("Operational Area", "2000 Sqft"),
    reviewNoOfEmployee: getLabelWithValue("No of Employees", "200"),
    reviewGSTNo: getLabelWithValue("GST No.", "364565")
  }),
  div1: getDivider(),
  viewTwo: getCommonContainer({
    reviewTradeCategory: getLabelWithValue("Trade Category", "Goods"),
    reviewTradeType: getLabelWithValue("Trade Type", "Value"),
    reviewTradeSubtype: getLabelWithValue(
      "Trade Sub-Type",
      "Manufacuring Plant"
    ),
    reviewTradeUOM: getLabelWithValue("UOM (Unit of Measurement)", "Sq Ft"),
    reviewTradeUOMValue: getLabelWithValue("UOM Value", "2000")
  }),
  div2: getDivider(),
  viewThree: getCommonContainer({
    reviewAccessoryType: getLabelWithValue("Accesory Type", "Generator"),
    reviewAccessoryUOM: getLabelWithValue("UOM", "Watt"),
    reviewAccessoryUOMValue: getLabelWithValue("UOM Value", "5000")
  }),
  div3: getDivider(),
  viewFour: getCommonContainer({
    reviewPropertyID: getLabelWithValue("Property Assessment ID", "456"),
    reviewElectricityNo: getLabelWithValue("Electricity Connection No.", "789"),
    reviewCity: getLabelWithValue("City", "Amritsar"),
    reviewPincode: getLabelWithValue("Pincode", "875478"),
    reviewDoorNo: getLabelWithValue("Door/House No.", "707/B"),
    reviewBuildingName: getLabelWithValue(
      "Building/Company Name",
      "Suncity Apartments"
    ),
    reviewStreetName: getLabelWithValue("Street Name", "Old Gurudwara Street"),
    reviewMohalla: getLabelWithValue("Mohalla", "Old Gurudwara Street")
  })
});

const reviewOwnerDetails = getCommonGrayCard({
  headerDiv: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    children: {
      header: {
        gridDefination: {
          xs: "12",
          sm: "10"
        },
        ...getCommonSubHeader("Owner Details")
      }
    }
  },
  viewFive: getCommonContainer({
    reviewOwnerName: getLabelWithValue("Name", "Satinder Singh"),
    reviewOwnerFatherName: getLabelWithValue(
      "Father/Husband's Name",
      "Jaswindar Singh"
    ),
    reviewOwnerGender: getLabelWithValue("Gender", "Male"),
    reviewOwnerAge: getLabelWithValue("Age", "45"),
    reviewOwnerPhoneNo: getLabelWithValue("Phone No.", "9999999999"),
    reviewOwnerEmail: getLabelWithValue("Email", "satinder@gmail.com"),
    reviewOwnerPAN: getLabelWithValue("PAN No.", "BUFAS1234H"),
    reviewOwnerAddr: getLabelWithValue(
      "Corrospondance Address",
      "707/B, railway Colony, Vikarnagar, Amritsar"
    ),
    reviewOwnerSpecialCat: getLabelWithValue("Special Category", "None")
  })
});

const reviewDocumentDetails = getCommonGrayCard({
  headerDiv: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    children: {
      header: {
        gridDefination: {
          xs: "12",
          sm: "10"
        },
        ...getCommonSubHeader("Documents")
      }
    }
  }
});

export const tradeReviewDetails = getCommonCard({
  header: getCommonTitle(
    "Please review the Application and Proceed with Approval"
  ),
  paragraph: getCommonParagraph(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  ),
  estimate,
  reviewTradeDetails,
  reviewOwnerDetails,
  reviewDocumentDetails
});

const screenConfig = {
  uiFramework: "material-ui",
  name: "searchPreview",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: "12",
                sm: "10"
              },
              ...header
            },
            helpSection: {
              componentPath: "Button",
              props: {
                color: "primary"
              },
              gridDefination: {
                xs: "12",
                sm: "2",
                align: "right"
              },
              children: {
                buttonLabel: getLabel("Status: Pending")
              }
            }
          }
        },
        tradeReviewDetails
      }
    }
  }
};

export default screenConfig;
