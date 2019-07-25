import {
  getCommonCard,
  getTextField,
  getCommonHeader,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getCommonSubHeader,
  getCommonParagraph,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { localStorageGet } from "egov-ui-kit/utils/localStorageUtils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import find from "lodash/find";

const header = getCommonHeader({
  labelName: "Add New Public Message",
  labelKey: "ADD_NEW_PUBLIC_MESSAGE",
});

const footer = (buttonLabel, callBack) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer",
    },
    children: {
      payButton: {
        componentPath: "Button",
        props: {
          variant: "contained",
          color: "primary",
          style: {
            minWidth: "200px",
            height: "48px",
            marginRight: "45px",
          },
        },
        children: {
          submitButtonLabel: getLabel(buttonLabel),
          submitButtonIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "keyboard_arrow_right",
            },
          },
        },
        onClickDefination: {
          action: "condition",
          // callBack: callBackForNext,
        },
      },
    },
  };
};

export const createForm = getCommonCard({
  Conatiner: getCommonContainer({
    tradeLocCity: {
      ...getSelectField({
        label: {
          labelName: "ULB",
          labelKey: "EVENTS_ULB_LABEL",
        },
        labelPrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS",
        },
        optionLabel: "name",
        placeholder: { labelName: "Select City", labelKey: "TL_SELECT_CITY" },
        sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
        jsonPath: "Licenses[0].tradeLicenseDetail.address.tenantId",
        required: true,
        props: {
          required: true,
          disabled: true,
          style: {
            marginBottom: 10,
          },
        },
      }),
      // beforeFieldChange: async (action, state, dispatch) => {
      //   //Below only runs for citizen - not required here in employee

      //   dispatch(prepareFinalObject("Licenses[0].tradeLicenseDetail.address.city", action.value));
      //   try {
      //     let payload = await httpRequest(
      //       "post",
      //       "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
      //       "_search",
      //       [{ key: "tenantId", value: action.value }],
      //       {}
      //     );
      //     const mohallaData =
      //       payload &&
      //       payload.TenantBoundary[0] &&
      //       payload.TenantBoundary[0].boundary &&
      //       payload.TenantBoundary[0].boundary.reduce((result, item) => {
      //         result.push({
      //           ...item,
      //           name: `${action.value.toUpperCase().replace(/[.]/g, "_")}_REVENUE_${item.code.toUpperCase().replace(/[._:-\s\/]/g, "_")}`,
      //         });
      //         return result;
      //       }, []);
      //     dispatch(prepareFinalObject("applyScreenMdmsData.tenant.localities", mohallaData));
      //     dispatch(
      //       handleField(
      //         "apply",
      //         "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla",
      //         "props.suggestions",
      //         mohallaData
      //         // payload.TenantBoundary && payload.TenantBoundary[0].boundary
      //       )
      //     );
      //     const mohallaLocalePrefix = {
      //       moduleName: action.value,
      //       masterName: "REVENUE",
      //     };
      //     dispatch(
      //       handleField(
      //         "apply",
      //         "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla",
      //         "props.localePrefix",
      //         mohallaLocalePrefix
      //       )
      //     );
      //   } catch (e) {
      //     console.log(e);
      //   }
      // },
    },

    dummyDiv1: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      props: {
        disabled: true,
      },
    },
    comments: getTextField({
      label: {
        labelName: "Message Content",
        labelKey: "EVENTS_COMMENTS_LABEL",
      },
      placeholder: {
        labelName: "Message Content ( Character Length:280)",
        labelKey: "EVENTS_COMMENTS_PLACEHOLDER",
      },
      required: true,
      pattern: "",
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.comments",
      props: {
        multiline: true,
        rows: 6,
        InputProps: {
          disableUnderline: true,
          marginTop: 50,
          style: {
            border: "1px solid #ced4da",
          },
        },
        style: {
          marginBottom: 10,
        },
      },
    }),
    dummyDiv2: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      props: {
        disabled: true,
      },
    },
    uploadFile: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      children: {
        subheader: getCommonSubHeader(
          {
            labelName: "Attachment",
            labelKey: "EVENTS_ATTACHMENT_LABEL",
          },
          {
            style: {
              fontSize: "12px",
              fontWeight: 500,
              color: "rgba(0, 0, 0, 0.60)",
            },
          }
        ),
        uploadButton: {
          uiFramework: "custom-molecules",
          componentPath: "UploadMultipleFiles",
          gridDefination: {
            xs: 12,
            sm: 6,
          },
          props: {
            maxFiles: 4,
            inputProps: {
              accept: "image/*, .pdf, .png, .jpeg",
            },
            buttonLabel: { labelName: "UPLOAD FILES", labelKey: "EVENTS_UPLOAD_FILE" },
            // jsonPath: "Licenses[0].wfDocuments",
            maxFileSize: 5000,
          },
        },
        // description: getCommonSubHeader(
        //   {
        //     labelName: "Only jpg, png, doc and pdf files. 5MB max file size.",
        //   },
        //   {
        //     style: {
        //       fontSize: "12px",
        //       fontWeight: 500,
        //       color: "rgba(0, 0, 0, 0.60)",
        //     },
        //   }
        // ),

        uploadFileInfo: getCommonParagraph(
          {
            labelName: "Only .jpg and .pdf files. 5MB max file size.",
            labelKey: "TL_APPROVAL_UPLOAD_SUBHEAD",
          },
          {
            style: {
              fontSize: 12,
              marginBottom: 10,
              marginTop: 5,
              color: "rgba(0, 0, 0, 0.6000000238418579)",
            },
          }
        ),
      },
    },
    dummyDiv3: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      props: {
        disabled: true,
      },
    },
    tradeFromDate: {
      ...getDateField({
        label: {
          labelName: "Display From Date",
          labelKey: "EVENTS_FROM_DATE_LABEL",
        },
        required: true,
        pattern: getPattern("Date"),
        jsonPath: "Licenses[0].validFrom",
        props: {
          // inputProps: {
          //   min: getTodaysDateInYMD(),
          //   max: getFinancialYearDates("yyyy-mm-dd").endDate,
          // },
          style: { marginBottom: 10 },
        },
      }),
    },
    dummyDiv4: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      props: {
        disabled: true,
      },
    },
    tradeToDate: {
      ...getDateField({
        label: { labelName: "To Date", labelKey: "TL_COMMON_TO_DATE_LABEL" },
        placeholder: {
          labelName: "Display To Date",
          labelKey: "EVENTS_TO_DATE_LABEL",
        },
        required: true,
        pattern: getPattern("Date"),
        jsonPath: "Licenses[0].validTo",
        props: {
          //   inputProps: {
          //     min: getNextMonthDateInYMD(),
          //     max: getFinancialYearDates("yyyy-mm-dd").endDate,
          //   },
          style: { marginBottom: 10 },
        },
      }),
    },
  }),
});

const getFooter = () => {
  const queryValue = getQueryArg(window.location.href, "purpose");
  let buttonLabel = {};
  if (queryValue === "edit") {
    buttonLabel = {
      labelName: "Save",
      // labelKey: "",
    };
    return footer(buttonLabel);
  } else if (queryValue == "delete") {
    buttonLabel = {
      labelName: "Delete",
      // labelKey: "",
    };
    return footer(buttonLabel);
  } else {
    buttonLabel = {
      labelName: "Add Message",
      // labelKey: "",
    };
    return footer(buttonLabel);
  }
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "create",
  beforeInitScreen: (action, state, dispatch) => {
    const businessServiceData = JSON.parse(localStorageGet("businessServiceData"));
    const data = find(businessServiceData, { businessService: "NewTL" });
    const { states } = data || [];

    if (states && states.length > 0) {
      const status = states.map((item, index) => {
        return {
          code: item.state,
        };
      });
      dispatch(prepareFinalObject("applyScreenMdmsData.searchScreen.status", status.filter((item) => item.code != null)));
    }

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search",
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6,
              },
              ...header,
            },
          },
        },
        createCard: {
          uiFramework: "custom-atoms",
          componentPath: "Form",
          props: {
            id: "create_form",
          },
          children: {
            createForm,
            footer: getFooter(),
          },
        },
      },
    },
  },
};

export default screenConfig;
