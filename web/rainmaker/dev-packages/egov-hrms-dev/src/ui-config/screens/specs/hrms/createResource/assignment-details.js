import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getCommonSubHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import set from "lodash/set";

const assignmentDetailsCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      asmtDetailsCardContainer: getCommonContainer(
        {
          assignFromDate: {
            ...getDateField({
              label: {
                labelName: "Assigned From Date",
                labelKey: "HR_ASMT_FROM_DATE_LABEL"
              },
              placeholder: {
                labelName: "Assigned From Date",
                labelKey: "HR_ASMT_FROM_DATE_PLACEHOLDER"
              },
              required: true,
              pattern: getPattern("Date"),
              jsonPath: "Employee[0].assignments[0].fromDate",
              props: {
                // inputProps: {
                //   min: getTodaysDateInYMD(),
                //   max: getFinancialYearDates("yyyy-mm-dd").endDate
                // }
              }
            })
          },
          assignToDate: {
            ...getDateField({
              label: {
                labelName: "Assigned To Date",
                labelKey: "HR_ASMT_TO_DATE_LABEL"
              },
              placeholder: {
                labelName: "Assigned To Date",
                labelKey: "HR_ASMT_TO_DATE_PLACEHOLDER"
              },
              // required: true,
              pattern: getPattern("Date"),
              jsonPath: "Employee[0].assignments[0].toDate",
              props: {
                // inputProps: {
                //   min: getTodaysDateInYMD(),
                //   max: getFinancialYearDates("yyyy-mm-dd").endDate
                // }
              }
            })
          },
          dummyDiv: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            gridDefination: {
              xs: 12,
              sm: 6
            },
            props: {
              disabled: true
            }
          },
          currentAssignment: {
            uiFramework: "custom-molecules-local",
            moduleName: "egov-hrms",
            componentPath: "SwitchWithLabel",
            props: {
              items: [
                {
                  label: "Currently Assigned Here"
                }
              ],
              SwitchProps: {
                color: "primary"
              },
              jsonPath: "Employee[0].assignments[0].isCurrentAssignment",
              compJPath:
                "components.div.children.formwizardThirdStep.children.assignmentDetails.children.cardContent.children.assignmentDetailsCard.props.items",
              screenKey: "create"
            },
            beforeFieldChange: (action, state, dispatch) => {
              let assignToComponentPath = action.componentJsonpath.replace(
                ".currentAssignment",
                ".assignToDate"
              );
              let isDisabled = get(
                state.screenConfiguration.screenConfig.create,
                `${action.componentJsonpath}.props.disabled`
              );
              if (!isDisabled) {
                if (action.value) {
                  dispatch(
                    handleField(
                      "create",
                      assignToComponentPath,
                      "props.value",
                      null
                    )
                  );
                  dispatch(
                    handleField(
                      "create",
                      assignToComponentPath,
                      "props.disabled",
                      true
                    )
                  );
                } else {
                  dispatch(
                    handleField(
                      "create",
                      assignToComponentPath,
                      "props.disabled",
                      false
                    )
                  );
                }
              }
            }
          },
          department: {
            ...getSelectField({
              label: {
                labelName: "Department",
                labelKey: "HR_DEPT_LABEL"
              },
              placeholder: {
                labelName: "Select Department",
                labelKey: "HR_DEPT_PLACEHOLDER"
              },
              required: true,
              jsonPath: "Employee[0].assignments[0].department",
              sourceJsonPath: "createScreenMdmsData.common-masters.Department",
              props: {
                className: "hr-generic-selectfield",
                optionValue: "code",
                optionLabel: "name",
                hasLocalization: false
              }
            })
          },
          designation: {
            ...getSelectField({
              label: { labelName: "Designation", labelKey: "HR_DESG_LABEL" },
              placeholder: {
                labelName: "Select Designation",
                labelKey: "HR_DEPT_PLACEHOLDER"
              },
              required: true,
              jsonPath: "Employee[0].assignments[0].designation",
              sourceJsonPath: "createScreenMdmsData.common-masters.Designation",
              props: {
                className: "hr-generic-selectfield",
                optionValue: "code",
                optionLabel: "name",
                hasLocalization: false
              }
            })
          },
          reportingTo: {
            ...getTextField({
              label: {
                labelName: "Reporting To",
                labelKey: "HR_REP_TO_LABEL"
              },
              placeholder: {
                labelName: "Reporting To",
                labelKey: "HR_REP_TO_LABEL"
              },
              pattern: getPattern("TradeName") || null,
              jsonPath: "Employee[0].assignments[0].reportingTo"
            })
          },
          headOfDepartment: {
            uiFramework: "custom-molecules-local",
            moduleName: "egov-hrms",
            componentPath: "SwitchWithLabel",
            props: {
              items: [
                {
                  label: "Head Of Department"
                }
              ],
              SwitchProps: {
                color: "primary"
              },
              jsonPath: "Employee[0].assignments[0].isHOD"
            }
          }
        },
        {
          style: {
            overflow: "visible"
          }
        }
      )
    }),
    onMultiItemAdd: (state, muliItemContent) => {
      let preparedFinalObject = get(
        state,
        "screenConfiguration.preparedFinalObject",
        {}
      );
      let cardIndex = get(muliItemContent, "assignFromDate.index");
      let cardId = get(
        preparedFinalObject,
        `Employee[0].assignments[${cardIndex}].id`
      );
      if (cardId) {
        let isCurrentAssignment = get(
          preparedFinalObject,
          `Employee[0].assignments[${cardIndex}].isCurrentAssignment`
        );
        Object.keys(muliItemContent).forEach(key => {
          if (isCurrentAssignment && key === "currentAssignment") {
            set(muliItemContent[key], "props.disabled", false);
          } else {
            set(muliItemContent[key], "props.disabled", true);
          }
        });
      } else {
        Object.keys(muliItemContent).forEach(key => {
          if (key === "dummyDiv") {
            set(muliItemContent[key], "props.disabled", true);
          } else {
            set(muliItemContent[key], "props.disabled", false);
          }
        });
      }
      return muliItemContent;
    },
    items: [],
    addItemLabel: "ADD ASSIGNMENT",
    headerName: "Assignment",
    headerJsonPath:
      "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "Employee[0].assignments",
    prefixSourceJsonPath:
      "children.cardContent.children.asmtDetailsCardContainer.children",
    disableDeleteIfKeyExists: "id"
  },
  type: "array"
};

export const assignmentDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Assignment Details",
      labelKey: "HR_ASSIGN_DET_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  subheader: getCommonSubHeader({
    labelName:
      "Please note that assignment details cannot be edited once saved.",
    labelKey: "HR_ASSIGN_DET_SUB_HEADER"
  }),
  assignmentDetailsCard
});
