import {
    getCommonCard,
    getTextField,
    getCommonHeader,
    getDateField,
    getSelectField,
    getCommonContainer,
    getPattern,
    getTimeField, 
    getCommonSubHeader,
    getCommonParagraph,
    getLabel,
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  const header = getCommonHeader({
    labelName: "Add New Event",
    labelKey: "EVENT_ADD_NEW_LABEL"
  });


  export const createForm = getCommonCard({
    createContainer: getCommonContainer({
      ulb: {
        ...getSelectField({
          label: {
            labelName: "ULB",
            labelKey: "EVENTS_ULB_LABEL",
          },
          localePrefix: {
            moduleName: "TENANT",
            masterName: "TENANTS",
          },
          optionLabel: "name",
          placeholder: { labelName: "Select City", labelKey: "TL_SELECT_CITY" },
          sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
          jsonPath: "events[0].tenantId",
          required: true,
          props: {
            required: true,
            // disabled: true,
            style: {
              marginBottom: 10,
            },
          },
        }),
      },
      dummyDiv5: {
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
      title1: getTextField({
        label: {
          labelName: "Event Name",
          labelKey: "EVENTS_NAME_LABEL",
        },
        placeholder: {
          labelName: "Enter Event Name",
          labelKey: "EVENTS_NAME_PLACEHOLDER",
        },
        required: true,
        jsonPath: "events[0].name",
        gridDefination: {
          xs: 12,
          sm: 6,
        },
      }),
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
      newCat: {
        ...getSelectField({
          label: {
            labelName: "Event Category",
            labelKey: "EVENTS_CATEGORY_LABEL",
          },
          localePrefix: {
            moduleName: "TENANT",
            masterName: "TENANTS",
          },
          optionLabel: "name",
          placeholder: { labelName: "Select Event Category", labelKey: "EVENTS_SELECT_CATEGORY_LABEL" },
          sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
          jsonPath: "events[0].tenantId",
          required: true,
          props: {
            required: true,
            // disabled: true,
            style: {
              marginBottom: 10,
            },
          },
        }),
      },
      dummyDiv111: {
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
      AddCategory: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 6,
          sm: 2,
        },
        children: {
          uploadButton: {

                componentPath: "Button",
                props: {
                  color: "primary",
                  fullWidth: true
                 // allign: left
                },
                children: {
                  mihyLoginButtonText: getLabel({label:"ADD NEW CATEGORY"})
                }, 
          },
        },
      },
      dummyDiv8: {
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
          labelName: "Description",
          labelKey: "EVENTS_DESCRIPTION_LABEL",
        },
        placeholder: {
          labelName: "Description (Max Char Limit : 500)",
          labelKey: "EVENTS_DESCRIPTION_LIMIT_PLACEHOLDER",
        },
        required: true,
        pattern: "",
        jsonPath: "events[0].description",
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
      fromDate: {
        ...getDateField({
          label: {
            labelName: "Event From Date",
            labelKey: "EVENTS_FROM_DATE_LABEL",
          },
          required: true,
          pattern: getPattern("Date"),
          jsonPath: "events[0].eventDetails.fromDate",
          gridDefination: {
            xs: 12,
            sm: 4,
          },
          props: {
            // inputProps: {
            //   min: getTodaysDateInYMD(),
            //   max: getFinancialYearDates("yyyy-mm-dd").endDate,
            // },
            iconObj: { position: "end", iconName: "calendar_today" },
            style: { marginBottom: 10 },
          },
        }),
      },
      fromTime: {
        ...getTimeField({
          label: {
            labelName: "Event From Time",
            labelKey: "EVENTS_FROM_TIME_LABEL",
          },
          required: true,
          pattern: getPattern("Time"),
          jsonPath: "events[0].eventDetails.fromTime",
          gridDefination: {
            xs: 12,
            sm: 2,
          },
          props: {
            // inputProps: {
            //   min: getTodaysDateInYMD(),
            //   max: getFinancialYearDates("yyyy-mm-dd").endDate,
            // },
            iconObj: { position: "end", iconName: " access_time" },
           
            style: { marginBottom: 10 },
          },
        }),
      },
      dummyDiv12: {
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
      toDate: {
        ...getDateField({
          label: { labelName: "Event To Date", labelKey: "EVENTS_TO_DATE_LABEL" },
          
          required: true,
          pattern: getPattern("Date"),
          jsonPath: "events[0].eventDetails.toDate",
          gridDefination: {
            xs: 12,
            sm: 4,
          },
          props: {
            //   inputProps: {
            //     min: getNextMonthDateInYMD(),
            //     max: getFinancialYearDates("yyyy-mm-dd").endDate,
            //   },
            iconObj: { position: "end", iconName: "calendar_today" },
            style: { marginBottom: 10 },
          },
        }),
      },
      toTime: {
        ...getTimeField({
          label: {
            labelName: "Event To Time",
            labelKey: "EVENTS_TO_TIME_LABEL",
          },
          required: true,
          pattern: getPattern("Time"),
          jsonPath: "events[0].eventDetails.fromTime",
          gridDefination: {
            xs: 12,
            sm: 2,
          },
          props: {
            // inputProps: {
            //   min: getTodaysDateInYMD(),
            //   max: getFinancialYearDates("yyyy-mm-dd").endDate,
            // },
            iconObj: { position: "end", iconName: " access_time" },
            style: { marginBottom: 10 },
          },
        }),
      },
      dummyDiv21: {
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
      title3: getTextField({
        label: {
          labelName: "Event Address",
          labelKey: "EVENTS_ADDRESS_LABEL",
        },
        placeholder: {
          labelName: "Enter Event Address",
          labelKey: "EVENTS_NAME_ADDRESS_PLACEHOLDER",
        },
        required: true,
        jsonPath: "events[0].name",
        gridDefination: {
          xs: 12,
          sm: 6,
        },
      }),
      dummyDiv51: {
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
      LocateMap: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 6,
        },
        children: {
          subheader: getCommonSubHeader(
            {
              labelName: "Pick event location from the map",
              labelKey: "EVENTS_PICK_MAP_LABEL",
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

                componentPath: "Button",
                props: {
                  color: "primary",
                  fullWidth: true
                },
                children: {
                  mihyLoginButtonText: getLabel({label:"Locate On Map"})
                }, 
          },
        },
      },
      dummyDiv9: {
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
      title4: getTextField({
        label: {
          labelName: "Organizer Name",
          labelKey: "EVENTS_ORGANIZER_NAME_LABEL",
        },
        placeholder: {
          labelName: "Enter Organizer Name",
          labelKey: "EVENTS_ENTER_ORGANIZER_NAME_PLACEHOLDER",
        },
        required: true,
        jsonPath: "events[0].name",
        gridDefination: {
          xs: 12,
          sm: 6,
        },
      }),
      title5: getTextField({
        label: {
          labelName: "Entry Fee (INR)",
          labelKey: "EVENTS_ENTRY_FEE_INR_LABEL",
        },
        placeholder: {
          labelName: "Enter Entry Fee",
          labelKey: "EVENTS_ENTER_ENTRY_FEE_PLACEHOLDER",
        },
        required: true,
        jsonPath: "events[0].name",
        gridDefination: {
          xs: 12,
          sm: 6,
        },
      }),
    }),
  });

  const screenConfig={
    uiFramework: "material-ui",
    name: "create",
    components: {
        div:{
            uiFramework: "custom-atoms",
            componentPath: "Form",
            props: {
                className: "common-div-css",
                id: "search",
              },
            children:{
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
                  createCard:{
                    uiFramework: "custom-atoms",
                    componentPath: "Form",
                    props: {
                        id: "create_form",
                      },
                      children: {
                        createForm,
                     //   footer: getFooter(),
                      },  
                  }



            }

        },
    }



  }
  export default screenConfig;