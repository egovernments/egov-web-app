import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern
} from "mihy-ui-framework/ui-config/screens/specs/utils";

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
            children: {}
          },
          currentAssignment: {
            uiFramework: "custom-molecules-local",
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
              jsonPath: "Employee[0].assignments[0].isCurrentAssignment"
            }
            // jsonPath: "Employee[0].assignments[0].isCurrentAssignment"
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
                optionLabel: "name"
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
                optionLabel: "name"
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
              jsonPath: "Employee[0].assignments[0].isHod"
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
    items: [],
    addItemLabel: "ADD ASSIGNMENT",
    headerName: "Assignment",
    headerJsonPath:
      "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "Employee[0].assignments",
    prefixSourceJsonPath:
      "children.cardContent.children.asmtDetailsCardContainer.children"
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
  assignmentDetailsCard
});
