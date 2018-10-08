import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getCommonParagraph,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import {
  getIconStyle,
  objectToDropdown,
  prepareDocumentTypeObj
} from "../../utils";
import { prepareFinalObject as pFO } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import filter from "lodash/filter";

const multipleTradeUnitCard = getCommonGrayCard({
  header: getCommonSubHeader({
    labelName: "Trade Unit  ",
    labelKey: "TL_NEW_TRADE_DETAILS_TRADE_UNIT_HEADER"
  }),
  tradeUnitCardContainer: getCommonContainer({
    tradeCategory: {
      ...getSelectField({
        label: { labelName: "Trade Category" },
        placeholder: { labelName: "Select Trade Category" },
        required: true,
        jsonPath: "LicensesTemp[0].tradeType",
        sourceJsonPath: "applyScreenMdmsData.TradeLicense.TradeTypeTransformed",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }),
      beforeFieldChange: (action, state, dispatch) => {
        try {
          dispatch(
            pFO(
              "applyScreenMdmsData.TradeLicense.TradeCategoryTransformed",
              objectToDropdown(
                get(
                  state.screenConfiguration.preparedFinalObject,
                  `applyScreenMdmsData.TradeLicense.TradeType.${action.value}`,
                  []
                )
              )
            )
          );
        } catch (e) {
          console.log(e);
        }
      }
    },
    tradeType: {
      ...getSelectField({
        label: { labelName: "Trade  Type" },
        placeholder: { labelName: "Select Trade Type" },
        required: true,
        jsonPath: "LicensesTemp[0].tradeSubType",
        sourceJsonPath:
          "applyScreenMdmsData.TradeLicense.TradeCategoryTransformed",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }),
      beforeFieldChange: (action, state, dispatch) => {
        try {
          let tradeCategory = get(
            state.screenConfiguration.preparedFinalObject,
            "LicensesTemp[0].tradeType",
            ""
          );
          dispatch(
            pFO(
              "applyScreenMdmsData.TradeLicense.TradeSubCategoryTransformed",
              get(
                state.screenConfiguration.preparedFinalObject,
                `applyScreenMdmsData.TradeLicense.TradeType.${tradeCategory}.${
                  action.value
                }`,
                []
              )
            )
          );
        } catch (e) {
          console.log(e);
        }
      }
    },
    tradeSubType: {
      ...getSelectField({
        label: { labelName: "Trade Sub-Type" },
        placeholder: { labelName: "Select Trade Sub-Type" },
        required: true,
        jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType",
        sourceJsonPath:
          "applyScreenMdmsData.TradeLicense.TradeSubCategoryTransformed",
        gridDefination: {
          xs: 12,
          sm: 4
        }
      }),
      beforeFieldChange: (action, state, dispatch) => {
        try {
          let tradeType = get(
            state.screenConfiguration.preparedFinalObject,
            "LicensesTemp[0].tradeType",
            ""
          );
          let tradeCategory = get(
            state.screenConfiguration.preparedFinalObject,
            "LicensesTemp[0].tradeSubType",
            ""
          );
          let tradeSubCategories = get(
            state.screenConfiguration.preparedFinalObject,
            `applyScreenMdmsData.TradeLicense.TradeType.${tradeType}.${tradeCategory}`,
            []
          );
          let currentObject = filter(tradeSubCategories, {
            code: action.value
          });
          console.log(currentObject);
          const applicationDocument = prepareDocumentTypeObj(
            currentObject[0].applicationDocument
          );
          dispatch(
            pFO("LicensesTemp[0].applicationDocuments", applicationDocument)
          );
          if (currentObject[0].uom !== null) {
            dispatch(
              pFO(
                "Licenses[0].tradeLicenseDetail.tradeUnits[0].uom",
                currentObject[0].uom
              )
            );
            dispatch(
              handleField(
                "apply",
                "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.multipleTradeUnitCard.children.cardContent.children.tradeUnitCardContainer.children.tradeUOMValue",
                "props.disabled",
                false
              )
            );
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    tradeUOM: getTextField({
      label: {
        labelName: "UOM (Unit of Measurement)",
        labelKey: "TL_NEW_TRADE_DETAILS_UOM_LABEL"
      },
      placeholder: {
        labelName: "UOM",
        labelKey: "TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER"
      },
      required: true,
      props: {
        disabled: true
      },
      jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].uom",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    }),
    tradeUOMValue: getTextField({
      label: {
        labelName: "UOM Value",
        labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
      },
      placeholder: {
        labelName: "Enter UOM Value",
        labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_PLACEHOLDER"
      },
      required: true,
      props: {
        disabled: true
      },
      pattern: getPattern("UOMValue"),
      jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].uomValue",
      gridDefination: {
        xs: 12,
        sm: 4
      }
    })
  })
});

const accessoriesCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      header: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
        children: {
          head: getCommonSubHeader({
            labelName: "Accessories",
            labelKey: "TL_NEW_TRADE_DETAILS_HEADER_ACC"
          }),
          ico: {
            uiFramework: "custom-molecules-local",
            componentPath: "Tooltip",
            props: {
              val: "Accessories Information",
              style: getIconStyle("headerIcon")
            }
          }
        }
      },
      accessoriesCardContainer: getCommonContainer({
        accessoriesName: {
          ...getSelectField({
            label: { labelName: "Accessories" },
            placeholder: { labelName: "Select Accessories" },
            jsonPath:
              "Licenses[0].tradeLicenseDetail.accessories[0].accessoryCategory",
            sourceJsonPath:
              "applyScreenMdmsData.TradeLicense.AccessoriesCategory",
            gridDefination: {
              xs: 12,
              sm: 4
            }
          }),
          beforeFieldChange: (action, state, dispatch) => {
            try {
              console.log(action.value);
              let accessories = get(
                state.screenConfiguration.preparedFinalObject,
                `applyScreenMdmsData.TradeLicense.AccessoriesCategory`,
                []
              );
              let currentObject = filter(accessories, {
                code: action.value
              });
              if (currentObject[0].uom) {
                dispatch(
                  pFO(
                    "Licenses[0].tradeLicenseDetail.accessories[0].uom",
                    currentObject[0].uom
                  )
                );
                dispatch(
                  handleField(
                    "apply",
                    "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.accessoriesCard.props.items[0].item0.children.cardContent.children.accessoriesCardContainer.children.accessoriesUOMValue",
                    "props.disabled",
                    false
                  )
                );
              }
            } catch (e) {
              console.log(e);
            }
          }
        },
        accessoriesUOM: getTextField({
          label: {
            labelName: "UOM (Unit of Measurement)",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_LABEL"
          },
          placeholder: {
            labelName: "UOM",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER"
          },
          required: true,
          props: {
            disabled: true
          },
          jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].uom",
          gridDefination: {
            xs: 12,
            sm: 4
          }
        }),
        accessoriesUOMValue: getTextField({
          label: {
            labelName: "UOM Value",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
          },
          placeholder: {
            labelName: "Enter UOM Value",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_PLACEHOLDER"
          },
          pattern: getPattern("UOMValue"),
          props: {
            disabled: true
          },
          jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].uomValue",
          gridDefination: {
            xs: 12,
            sm: 4
          }
        })
      })
    }),

    items: [],
    addItemLabel: "ADD ACCESSORIES",
    headerName: "Accessory",
    headerJsonPath:
      "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "Licenses[0].tradeLicenseDetail.accessories",
    prefixSourceJsonPath:
      "children.cardContent.children.accessoriesCardContainer.children"
  },
  type: "array"
};

export const tradeDetails = getCommonCard({
  header: getCommonTitle({
    labelName: "Please Provide Trade Details",
    labelKey: "TL_NEW_TRADE_DETAILS_PROV_DET_HEADER"
  }),
  // paragraph: getCommonParagraph({
  //   labelName:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  // }),
  tradeDetailsConatiner: getCommonContainer({
    tradeLicenseType: {
      ...getSelectField({
        label: { labelName: "License Type" },
        placeholder: { labelName: "Select License Type" },
        required: true,
        jsonPath: "Licenses[0].licenseType",
        data: [
          {
            code: "TEMPORARY"
          },
          {
            code: "PERMANENT"
          }
        ]
      }),
      beforeFieldChange: (action, state, dispatch) => {
        if (action.value === "TEMPORARY") {
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeToDate",
              "visible",
              true
            )
          );
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeFromDate",
              "visible",
              true
            )
          );
        } else {
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeToDate",
              "visible",
              false
            )
          );
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeFromDate",
              "visible",
              false
            )
          );
          dispatch(pFO("Licenses[0].validFrom", null));
          dispatch(pFO("Licenses[0].validTo", null));
        }
      }
    },
    tradeName: getTextField({
      label: {
        labelName: "Name of Trade",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_NAME_LABEL"
      },
      placeholder: {
        labelName: "Example Diljit Da Dhaba",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_NAME_PLACEHOLDER"
      },
      required: true,
      pattern: getPattern("TradeName"),
      jsonPath: "Licenses[0].tradeName"
    }),
    tradeFromDate: {
      ...getDateField({
        label: { labelName: "From Date" },
        placeholder: { labelName: "Trade License From Date" },
        required: true,
        pattern: getPattern("Date"),
        jsonPath: "Licenses[0].validFrom"
      }),
      visible: false
    },
    tradeToDate: {
      ...getDateField({
        label: { labelName: "To Date" },
        placeholder: { labelName: "Trade License From Date" },
        required: true,
        pattern: getPattern("Date"),
        jsonPath: "Licenses[0].validTo"
      }),
      visible: false
    },
    tradeStructureType: {
      ...getSelectField({
        label: { labelName: "Structure Type" },
        placeholder: { labelName: "Select Structure Type" },
        required: true,
        jsonPath: "LicensesTemp[0].tradeLicenseDetail.structureType",
        sourceJsonPath:
          "applyScreenMdmsData.common-masters.StructureTypeTransformed"
      }),
      beforeFieldChange: (action, state, dispatch) => {
        try {
          dispatch(
            pFO(
              "applyScreenMdmsData.common-masters.StructureSubTypeTransformed",
              get(
                state.screenConfiguration.preparedFinalObject
                  .applyScreenMdmsData["common-masters"],
                `StructureType.${action.value}`,
                []
              )
            )
          );
        } catch (e) {
          console.log(e);
        }
      }
    },
    tradeStructureSubType: getSelectField({
      label: { labelName: "Structure Sub Type" },
      placeholder: { labelName: "Select Structure Sub Type" },
      required: true,
      jsonPath: "Licenses[0].tradeLicenseDetail.structureType",
      sourceJsonPath:
        "applyScreenMdmsData.common-masters.StructureSubTypeTransformed"
    }),
    tradeCommencementDate: getDateField({
      label: {
        labelName: "Trade Commencement Date",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter Trade Commencement Date",
        labekKey: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_PLACEHOLDER"
      },
      required: true,
      pattern: getPattern("Date"),
      jsonPath: "Licenses[0].commencementDate"
    }),
    tradeGSTNo: getTextField({
      label: {
        labelName: "Trade GST No.",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_GST_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Trade GST No.",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_GST_NO_PLACEHOLDER"
      },
      pattern: getPattern("GSTNo")
    }),
    tradeOperationalArea: getTextField({
      label: {
        labelName: "Operatonal Area (Sq Ft)",
        labelKey: "TL_NEW_TRADE_DETAILS_OPR_AREA_LABEL"
      },
      placeholder: {
        labelName: "Enter Operatonal Area in Sq Ft",
        labelKey: "TL_NEW_TRADE_DETAILS_OPR_AREA_PLACEHOLDER"
      },
      pattern: getPattern("OperationalArea"),
      jsonPath: "Licenses[0].tradeLicenseDetail.operationalArea"
    }),
    tradeNoOfEmployee: getTextField({
      label: {
        labelName: "No. Of Employee",
        labelKey: "TL_NEW_TRADE_DETAILS_NO_EMPLOYEES_LABEL"
      },
      placeholder: {
        labelName: "Enter No. Of Employee",
        labelKey: "TL_NEW_TRADE_DETAILS_NO_EMPLOYEES_PLACEHOLDER"
      },
      pattern: getPattern("NoOfEmp"),
      jsonPath: "Licenses[0].tradeLicenseDetail.noOfEmployees"
    })
  }),
  multipleTradeUnitCard,
  accessoriesCard
});
