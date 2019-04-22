import {
  getBreak,
  getCommonCard,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonTitle,
  getSelectField,
  getTextField,
  getDateField,
  getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";

const showComponent = (dispatch, componentJsonPath, display) => {
  let displayProps = display ? {} : { display: "none" };
  dispatch(
    handleField("apply", componentJsonPath, "props.style", displayProps)
  );
};

export const payeeInformation = () => {
  return getCommonGrayCard({
    header: getCommonSubHeader(
      {
        labelName: "Payee Details",
        labelKey: "MP_PAYEE_DETAILS_SUBHEADER"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    payeeCard: getCommonContainer({
      mobileNumber: getTextField({
        label: {
          labelName: "Mobile No.",
          labelKey: "MP_PAYEE_MOBILE_NO_LABEL"
        },
        placeholder: {
          labelName: "Enter Mobile No.",
          labelKey: "MP_ENTER_PAYEE_MOBILE_NO_PLACEHOLDER"
        },
        required: true,
        title: {
          value: "Please search profile linked to the mobile no.",
          key: "MP_PAYEE_MOBILE_NO_TOOLTIP_MESSAGE"
        },
        infoIcon: "info_circle",
        pattern: getPattern("MobileNo"),
        jsonPath: "noc.applicantDetails.applicant[0].mobileNo",
        iconObj: {
          iconName: "search",
          position: "end",
          color: "#FE7A51"
          // onClickDefination: {
          //   action: "condition",
          //   callBack: (state, dispatch, fieldInfo) => {
          //     getDetailsForOwner(state, dispatch, fieldInfo);
          //   }
          // }
        },
        // props: {
        //   style: {
        //     maxWidth: "450px"
        //   }
        // },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      payeeName: getTextField({
        label: {
          labelName: "Name",
          labelKey: "MP_PAYEE_NAME_LABEL"
        },
        placeholder: {
          labelName: "Enter Name",
          labelKey: "MP_ENTER_PAYEE_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Name"),
        jsonPath: "noc.applicantDetails.applicant[0].applicantName",
        // props: {
        //   style: {
        //     maxWidth: "400px"
        //   }
        // },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      fatherHusbandName: getTextField({
        label: {
          labelName: "Father/Husband's Name",
          labelKey: "MP_PAYEE_FATHER_HUSBAND_NAME_LABEL"
        },
        placeholder: {
          labelName: "Enter Father/Husband's Name",
          labelKey: "MP_PAYEE_FATHER_HUSBAND_NAME_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("Name"),
        jsonPath:
          "noc.applicantDetails.applicant[0].applicantFatherHusbandName",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      payeeAddress: getTextField({
        label: {
          labelName: "Address",
          labelKey: "MP_PAYEE_ADDRESS_LABEL"
        },
        placeholder: {
          labelName: "Enter Address",
          labelKey: "mp_ENTER_PAYEE_ADDRESS_PLACEHOLDER"
        },
        // required: false,
        jsonPath: "noc.applicantDetails.applicant[0].applicantAddress",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    })
  });
};

export const payeeInformation = getCommonCard({
  infoContainer: getCommonGrayCard({
    header: getCommonSubHeader(
      {
        labelName: "Payee Details",
        labelKey: "MP_PAYEE_DETAILS_SUBHEADER"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    mobileNumber: getTextField({
      label: {
        labelName: "Mobile No.",
        labelKey: "MP_PAYEE_MOBILE_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Mobile No.",
        labelKey: "MP_ENTER_PAYEE_MOBILE_NO_PLACEHOLDER"
      },
      required: true,
      title: {
        value: "Please search profile linked to the mobile no.",
        key: "MP_PAYEE_MOBILE_NO_TOOLTIP_MESSAGE"
      },
      infoIcon: "info_circle",
      pattern: getPattern("MobileNo"),
      jsonPath: "noc.applicantDetails.applicant[0].mobileNo",
      iconObj: {
        iconName: "search",
        position: "end",
        color: "#FE7A51"
        // onClickDefination: {
        //   action: "condition",
        //   callBack: (state, dispatch, fieldInfo) => {
        //     getDetailsForOwner(state, dispatch, fieldInfo);
        //   }
        // }
      },
      // props: {
      //   style: {
      //     maxWidth: "450px"
      //   }
      // },
      gridDefination: {
        xs: 12,
        sm: 4,
        // md: 6
      }
    }),
    payeeName: getTextField({
      label: {
        labelName: "Name",
        labelKey: "MP_PAYEE_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Name",
        labelKey: "MP_ENTER_PAYEE_NAME_PLACEHOLDER"
      },
      required: true,
      pattern: getPattern("Name"),
      jsonPath: "noc.applicantDetails.applicant[0].applicantName",
      // props: {
      //   style: {
      //     maxWidth: "400px"
      //   }
      // },
      gridDefination: {
        xs: 12,
        sm: 4,
        // md: 6
      }
    }),
    fatherHusbandName: getTextField({
      label: {
        labelName: "Father/Husband's Name",
        labelKey: "MP_PAYEE_FATHER_HUSBAND_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Father/Husband's Name",
        labelKey: "MP_PAYEE_FATHER_HUSBAND_NAME_PLACEHOLDER"
      },
      required: true,
      pattern: getPattern("Name"),
      jsonPath:
        "noc.applicantDetails.applicant[0].applicantFatherHusbandName",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),
    payeeAddress: getTextField({
      label: {
        labelName: "Address",
        labelKey: "MP_PAYEE_ADDRESS_LABEL"
      },
      placeholder: {
        labelName: "Enter Address",
        labelKey: "mp_ENTER_PAYEE_ADDRESS_PLACEHOLDER"
      },
      // required: false,
      jsonPath: "noc.applicantDetails.applicant[0].applicantAddress",
      gridDefination: {
        xs: 12,
        sm: 4,
        md: 6
      }
    }),

    // locMohalla: getSelectField({
    //   label: {
    //     labelName: "Location/Mohalla",
    //     labelKey: "NOC_APPLICATION_NOC_LABEL"
    //   },
    //   placeholder: {
    //     labelName: "Select Location/Mohalla",
    //     labelKey: "NOC_APPLICATION_PLACEHOLDER"
    //   },
    //   required: false,
    //   jsonPath: "searchScreen.locMohalla",
    //   gridDefination: {
    //     xs: 12,
    //     sm: 4
    //   },
    //   data: [
    //     {
    //       code: "Ajit Nagar"
    //     },
    //     {
    //       code: "Cinema road-1"
    //     }
    //   ]
    // }),
    // propertyId: getTextField({
    //   label: {
    //     labelName: "Property ID",
    //     labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_LABEL"
    //   },
    //   placeholder: {
    //     labelName: "Enter Property ID",
    //     labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_PLACEHOLDER"
    //   },
    //   gridDefination: {
    //     xs: 12,
    //     sm: 4
    //   },
    //   required: false,
    //   pattern: getPattern("PropertyID"),
    //   errorMessage: "Invalid Property ID",
    //   jsonPath: "searchScreen.propertyId"
    // })
  }),
});


