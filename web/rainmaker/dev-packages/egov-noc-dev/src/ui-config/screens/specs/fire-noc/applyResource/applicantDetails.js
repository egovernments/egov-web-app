import {
  getBreak,
  getCommonCard,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonTitle,
  getSelectField,
  getTextField
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";

const showComponent = (dispatch, componentJsonPath, display) => {
  let displayProps = display ? {} : { display: "none" };
  dispatch(
    handleField("apply", componentJsonPath, "props.style", displayProps)
  );
};

const commonApplicantInformation = () => {
  return getCommonGrayCard({
    header: getCommonSubHeader(
      {
        labelName: "Applicant Information",
        labelKey: "NOC_APPLICANT_INFORMATION_SUBHEADER"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    applicationCard: getCommonContainer({
      mobileNumber: getTextField({
        label: {
          labelName: "Mobile No.",
          labelKey: "NOC_MOBILE_NO_LABEL"
        },
        placeholder: {
          labelName: "Enter Mobile No.",
          labelKey: "NOC_ENTER_MOBILE_NO_PLACEHOLDER"
        },
        required: true,
        jsonPath: "mobileNo",
        props: {
          style: {
            maxWidth: "450px"
          }
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 12
        }
      }),
      applicantName: getTextField({
        label: {
          labelName: "Name",
          labelKey: "NOC_APPLICANT_NAME_LABEL"
        },
        placeholder: {
          labelName: "Enter Name",
          labelKey: "NOC_ENTER_APPLICANT_NAME_PLACEHOLDER"
        },
        // required: true,
        jsonPath: "applicantName",
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
      genderRadioGroup: {
        uiFramework: "custom-containers",
        moduleName: "egov-noc",
        componentPath: "RadioGroupContainer",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        jsonPath: "applicantGender",
        props: {
          label: "Gender",
          buttons: ["Male", "Female", "Transgender"],
          jsonPath: "applicantGender"
          // defaultValue: "Male"
        },
        type: "array"
      },
      applicantDob: getTextField({
        label: {
          labelName: "Date Of Birth",
          labelKey: "NOC_APPLICANT_DOB_LABEL"
        },
        placeholder: {
          labelName: "DD/MM/YYYY",
          labelKey: "NOC_ENTER_APPLICANT_DOB_PLACEHOLDER"
        },
        required: true,
        jsonPath: "applicantDob",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      applicantEmail: getTextField({
        label: {
          labelName: "Email",
          labelKey: "NOC_APPLICANT_EMAIL_LABEL"
        },
        placeholder: {
          labelName: "Enter Email",
          labelKey: "NOC_ENTER_APPLICANT_EMAIL_PLACEHOLDER"
        },
        // required: true,
        jsonPath: "applicantEmail",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      fatherHusbandName: getTextField({
        label: {
          labelName: "Father/Husband's Name",
          labelKey: "NOC_APPLICANT_FATHER_HUSBAND_NAME_LABEL"
        },
        placeholder: {
          labelName: "Enter Father/Husband's Name",
          labelKey: "NOC_APPLICANT_FATHER_HUSBAND_NAME_PLACEHOLDER"
        },
        required: true,
        jsonPath: "applicantFatherHusbandName",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      relationshipRadioGroup: {
        uiFramework: "custom-containers",
        moduleName: "egov-noc",
        componentPath: "RadioGroupContainer",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        jsonPath: "applicantRelationship",
        props: {
          label: "Relationship",
          buttons: ["Father", "Husband"],
          jsonPath: "applicantRelationship"
          // defaultValue: "Male"
        },
        type: "array"
      },
      applicantPan: getTextField({
        label: {
          labelName: "PAN No.",
          labelKey: "NOC_APPLICANT_PAN_LABEL"
        },
        placeholder: {
          labelName: "Enter Applicant's PAN No.",
          labelKey: "NOC_ENTER_APPLICANT_PAN_PLACEHOLDER"
        },
        // required: true,
        jsonPath: "applicantPan",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      applicantAddress: getTextField({
        label: {
          labelName: "Correspondence Address",
          labelKey: "NOC_APPLICANT_CORRESPONDENCE_ADDRESS_LABEL"
        },
        placeholder: {
          labelName: "Enter Correspondence Address",
          labelKey: "NOC_ENTER_APPLICANT_CORRESPONDENCE_ADDRESS_PLACEHOLDER"
        },
        required: true,
        jsonPath: "applicantAddress",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      specialApplicantCategory: getSelectField({
        label: {
          labelName: "Special Applicant Category",
          labelKey: "NOC_SPECIAL_APPLICANT_CATEGORY_LABEL"
        },
        placeholder: {
          labelName: "Select Special Applicant Category",
          labelKey: "NOC_SPECIAL_APPLICANT_CATEGORY_PLACEHOLDER"
        },
        jsonPath: "applicantCategory",
        data: [
          {
            code: "A"
          },
          {
            code: "B"
          }
        ],
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    })
  });
};

const institutionInformation = () => {
  return getCommonGrayCard({
    header: getCommonSubHeader(
      {
        labelName: "Applicant Information",
        labelKey: "NOC_APPLICANT_INFORMATION_SUBHEADER"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    applicationCard: getCommonContainer({
      institutionName: getTextField({
        label: {
          labelName: "Name of Institution",
          labelKey: "NOC_INSTITUTION_LABEL"
        },
        placeholder: {
          labelName: "Enter Name of Institution",
          labelKey: "NOC_ENTER_INSTITUTION_PLACEHOLDER"
        },
        required: true,
        jsonPath: "institutionName",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      telephoneNumber: getTextField({
        label: {
          labelName: "Official Telephone No.",
          labelKey: "NOC_TELEPHONE_NUMBER_LABEL"
        },
        placeholder: {
          labelName: "Enter Official Telephone No.",
          labelKey: "NOC_ENTER_TELEPHONE_NUMBER_PLACEHOLDER"
        },
        required: true,
        jsonPath: "telephoneNumber",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      authorisedPerson: getTextField({
        label: {
          labelName: "Name of Authorized Person",
          labelKey: "NOC_AUTHORIZED_PERSON_LABEL"
        },
        placeholder: {
          labelName: "Enter Name of Authorized Person",
          labelKey: "NOC_ENTER_AUTHORIZED_PERSON_PLACEHOLDER"
        },
        required: true,
        jsonPath: "authorizedPerson",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      designation: getTextField({
        label: {
          labelName: "Designation in Institution",
          labelKey: "NOC_INSTITUTION_DESIGNATION_LABEL"
        },
        placeholder: {
          labelName: "Enter Name of Institution",
          labelKey: "NOC_ENTER_INSTITUTION_DESIGNATION_PLACEHOLDER"
        },
        required: true,
        jsonPath: "institutionDesignation",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      authorizedPersonMobile: getTextField({
        label: {
          labelName: "Mobile No. of Authorized Person",
          labelKey: "NOC_AUTHORIZED_PERSON_MOBILE_LABEL"
        },
        placeholder: {
          labelName: "Enter Mobile No. of Authorized Person",
          labelKey: "NOC_AUTHORIZED_PERSON_MOBILE_PLACEHOLDER"
        },
        required: true,
        jsonPath: "authorizedPersonMobile",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      authorizedPersonEmail: getTextField({
        label: {
          labelName: "Email of Authorized Person",
          labelKey: "NOC_AUTHORIZED_PERSON_EMAIL_LABEL"
        },
        placeholder: {
          labelName: "Enter Email of Authorized Person",
          labelKey: "NOC_AUTHORIZED_PERSON_EMAIL_PLACEHOLDER"
        },
        required: true,
        jsonPath: "authorizedPersonEmail",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      officialCorrespondenceAddress: getTextField({
        label: {
          labelName: "Official Correspondence Address",
          labelKey: "NOC_OFFICIAL_CORRESPONDENCE_ADDRESS_LABEL"
        },
        placeholder: {
          labelName: "Enter Name of Institution",
          labelKey: "NOC_ENTER_OFFICIAL_CORRESPONDENCE_ADDRESS_PLACEHOLDER"
        },
        required: true,
        jsonPath: "officialCorrespondenceAddress",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    })
  });
};

export const applicantDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Applicant Details",
      labelKey: "NOC_APPLICANT_DETAILS_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  break: getBreak(),
  applicantTypeContainer: getCommonContainer({
    applicantType: {
      ...getSelectField({
        label: {
          labelName: "Applicant Type",
          labelKey: "NOC_APPLICANT_TYPE_LABEL"
        },
        placeholder: {
          labelName: "Select Applicant Type",
          labelKey: "NOC_APPLICANT_TYPE_PLACEHOLDER"
        },
        jsonPath: "applicantType",
        data: [
          {
            code: "Individual"
          },
          {
            code: "Multiple"
          },
          {
            code: "Institutional-Private"
          }
        ],
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      }),
      afterFieldChange: (action, state, dispatch) => {
        let singleApplicantContainerJsonPath =
          "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer";
        let multipleApplicantContainerJsonPath =
          "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer";
        let institutionContainerJsonPath =
          "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer";
        let applicantSubtypeJsonPath =
          "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.applicantSubType";
        if (action.value === "Individual") {
          showComponent(dispatch, singleApplicantContainerJsonPath, true);
          showComponent(dispatch, multipleApplicantContainerJsonPath, false);
          showComponent(dispatch, institutionContainerJsonPath, false);
          showComponent(dispatch, applicantSubtypeJsonPath, false);
        } else if (action.value === "Multiple") {
          showComponent(dispatch, singleApplicantContainerJsonPath, false);
          showComponent(dispatch, multipleApplicantContainerJsonPath, true);
          showComponent(dispatch, institutionContainerJsonPath, false);
          showComponent(dispatch, applicantSubtypeJsonPath, false);
        } else if (action.value === "Institutional-Private") {
          showComponent(dispatch, singleApplicantContainerJsonPath, false);
          showComponent(dispatch, multipleApplicantContainerJsonPath, false);
          showComponent(dispatch, institutionContainerJsonPath, true);
          showComponent(dispatch, applicantSubtypeJsonPath, true);
        }
      }
    },
    applicantSubType: {
      ...getSelectField({
        label: {
          labelName: "Type of Applicant - Subtype",
          labelKey: "NOC_APPLICANT_SUBTYPE_LABEL"
        },
        placeholder: {
          labelName: "Select Applicant Subtype",
          labelKey: "NOC_APPLICANT_TYPE_PLACEHOLDER"
        },
        jsonPath: "applicantType",
        data: [
          {
            code: "Private Company"
          }
        ],
        props: {
          style: {
            display: "none"
          }
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })
    },
    singleApplicantContainer: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        individualApplicantInfo: commonApplicantInformation()
      }
    },
    multipleApplicantContainer: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: {
          display: "none"
        }
      },
      children: {
        multipleApplicantInfo: {
          uiFramework: "custom-containers",
          componentPath: "MultiItem",
          props: {
            scheama: commonApplicantInformation(),
            items: [],
            addItemLabel: "Add Applicant",
            prefixSourceJsonPath:
              "children.cardContent.children.buildingDataCard.multipleBuildingContainer.children"
          },
          type: "array"
        }
      }
    },
    institutionContainer: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: {
          display: "none"
        }
      },
      children: {
        institutionInfo: institutionInformation()
      }
    }
  })
});
