import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getCommonParagraph,
  getCommonContainer,
  getLabelWithValue,
  getDivider,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { changeStep } from "./footer";

const estimate= getCommonGrayCard({estimateSection:{
  uiFramework: "custom-molecules",
  componentPath: "FeesEstimateCard",
  props: {
    estimate: {
      header: "Trade License Fee",
      fees: [
        { name: "Trade License Charge" },
        { name: "Penalty", value: 500, info: "Information about Penalty" },
        { name: "Rebate", value: 200, info: "Information about Rebate" }
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
}})

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
      },
      editSection: {
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
          editIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "edit"
            }
          },
          buttonLabel: getLabel("Edit")
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            changeStep(state, dispatch, "", 0);
          }
        }
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
      },
      editSection: {
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
          editIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "edit"
            }
          },
          buttonLabel: getLabel("Edit")
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            changeStep(state, dispatch, "", 1);
          }
        }
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
      },
      editSection: {
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
          editIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "edit"
            }
          },
          buttonLabel: getLabel("Edit")
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            changeStep(state, dispatch, "", 2);
          }
        }
      },
      documents: {
        uiFramework: "custom-molecules",
        componentPath: "MultiDownloadCard",
        props: {
          data: [
            {
              title: "PAN Card",
              name: "Filename.jpg",
              link:
                "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb.jalandhar/rainmaker-pgr/July/26/Potholes_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20180919T113611Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAJLBRPPEUXFAI3Z6Q%2F20180919%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=be0913d89a67348485c0f91420b957793aa23075196cc11df2ffad49e986913d",
              linkText: "View"
            },
            {
              title: "Voter ID Card",
              name: "Filename.jpg",
              link:
              "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb.jalandhar/rainmaker-pgr/July/26/Potholes_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20180919T113611Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAJLBRPPEUXFAI3Z6Q%2F20180919%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=be0913d89a67348485c0f91420b957793aa23075196cc11df2ffad49e986913d",
              linkText: "View"
            },
            {
              title: "Passport",
              name: "Filename.jpg",
              link:
              "https://egov-rainmaker.s3.ap-south-1.amazonaws.com/pb.jalandhar/rainmaker-pgr/July/26/Potholes_3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20180919T113611Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAJLBRPPEUXFAI3Z6Q%2F20180919%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=be0913d89a67348485c0f91420b957793aa23075196cc11df2ffad49e986913d",
              linkText: "View"
            }
          ]
        }
      }
    }
  }
});

export const tradeReviewDetails = getCommonCard({
  header: getCommonTitle("Please review your Application and Submit"),
  paragraph: getCommonParagraph(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  ),
  estimate,
  reviewTradeDetails,
  reviewOwnerDetails,
  reviewDocumentDetails
});
