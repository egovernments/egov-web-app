import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getCommonParagraph,
  getTextField,
  getDateField,
  getSelectTextField,
  getCommonContainer,
  getPattern,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { getIconStyle, objectToDropdown } from "../../utils";
import { prepareFinalObject as pFO } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const multipleTradeUnitCard = getCommonGrayCard({
  header: getCommonSubHeader("Trade Unit  "),
  tradeUnitCardContainer: getCommonContainer({
    tradeCategory: {
      ...getSelectTextField(
        "Trade Category",
        "Select Trade Category",
        true,
        "",
        "LicencesTemp[0].tradeType",
        "applyScreenMdmsData.TradeLicense.TradeTypeTransformed",
        [],
        "code",
        "code",
        {},
        {
          xs: 12,
          sm: 4
        }
      ),
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
      ...getSelectTextField(
        "Trade  Type",
        "Select Trade Type",
        true,
        "",
        "LicencesTemp[0].tradeSubType",
        "applyScreenMdmsData.TradeLicense.TradeCategoryTransformed",
        [],
        "code",
        "code",
        {},
        {
          xs: 12,
          sm: 4
        }
      ),
      beforeFieldChange: (action, state, dispatch) => {
        try {
          let tradeCategory = get(
            state.screenConfiguration.preparedFinalObject,
            "LicencesTemp[0].tradeType",
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
    tradeSubType: getSelectTextField(
      "Trade Sub-Type",
      "Select Trade Sub-Type",
      true,
      "",
      "LicencesTemp[0].tradeLicenseDetail.tradeUnits[0].tradeType",
      "applyScreenMdmsData.TradeLicense.TradeSubCategoryTransformed",
      [],
      "code",
      "code",
      {},
      {
        xs: 12,
        sm: 4
      }
    ),
    tradeUOM: getTextField(
      {
        labelName: "UOM (Unit of Measurement)",
        labelKey: "TL_NEW_TRADE_DETAILS_UOM_LABEL"
      },
      {
        labelName: "UOM",
        labelKey: "TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER"
      },
      true,
      "",
      "Licences[0].tradeLicenseDetail.tradeUnits[0].uom",
      {},
      {
        xs: 12,
        sm: 4
      }
    ),
    tradeUOMValue: getTextField(
      {
        labelName: "UOM Value",
        labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
      },
      {
        labelName: "Enter UOM Value",
        labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_PLACEHOLDER"
      },
      true,
      getPattern("UOMValue"),
      "Licences[0].tradeLicenseDetail.tradeUnits[0].uomValue",
      {},
      {
        xs: 12,
        sm: 4
      }
    )
  })
});

const accessoriesCard = {
  uiFramework: "custom-molecules",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      header: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
        children: {
          head: getCommonSubHeader("Accessories"),
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
        accessoriesName: getSelectTextField(
          "Accessories",
          "Select Accessories",
          false,
          "",
          "Licences[0].tradeLicenseDetail.accessories[0].accessoryCategory",
          "applyScreenMdmsData.TradeLicense.AccessoriesCategory",
          [],
          "code",
          "code",
          {},
          {
            xs: 12,
            sm: 4
          }
        ),
        accessoriesUOM: getTextField(
          {
            labelName: "UOM (Unit of Measurement)",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_LABEL"
          },
          {
            labelName: "UOM",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER"
          },
          true,
          "",
          "Licences[0].tradeLicenseDetail.accessories[0].uom",
          {},
          {
            xs: 12,
            sm: 4
          }
        ),
        accessoriesUOMValue: getTextField(
          {
            labelName: "UOM Value",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
          },
          {
            labelName: "Enter UOM Value",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_PLACEHOLDER"
          },
          false,
          getPattern("UOMValue"),
          "Licences[0].tradeLicenseDetail.accessories[0].uomValue",
          {},
          {
            xs: 12,
            sm: 4
          }
        )
      })
    }),

    items: [],
    addItemLabel: "ADD ACCESSORIES",
    headerName: "Accessory",
    headerJsonPath:
      "children.cardContent.children.header.children.head.children.Accessories.props.label",
    objectJsonPath: "Licences[0].accessories"
  },
  type: "array"
};

export const tradeDetails = getCommonCard({
  header: getCommonTitle("Please Provide Trade Details"),
  paragraph: getCommonParagraph(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  ),
  tradeDetailsConatiner: getCommonContainer({
    tradeLicenseType: getSelectTextField(
      "License Type",
      "Select License Type",
      true,
      "",
      "Licenses[0].licenseType",
      "",
      [
        {
          code: "TEMPORARY",
          code: "TEMPORARY"
        },
        {
          code: "PERMANENT",
          code: "PERMANENT"
        }
      ],
      "code",
      "code"
    ),
    tradeName: getTextField(
      {
        labelName: "Name of Trade",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_NAME_LABEL"
      },
      {
        labelName: "Example Diljit Da Dhaba",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_NAME_PLACEHOLDER"
      },
      true,
      getPattern("TradeName"),
      "Licenses[0].tradeName"
    ),
    tradeFromDate: getDateField(
      "From Date",
      "Trade License From Date",
      true,
      getPattern("Date"),
      "Licenses[0].validFrom",
      {}
    ),
    tradeToDate: getDateField(
      "To Date",
      "Trade License From Date",
      true,
      getPattern("Date"),
      "Licenses[0].validTo",
      {}
    ),
    tradeStructureType: {
      ...getSelectTextField(
        "Structure Type",
        "Select Structure Type",
        true,
        "",
        "LicencesTemp[0].tradeLicenseDetail.structureType",
        "applyScreenMdmsData.common-masters.StructureTypeTransformed",
        [],
        "code",
        "code"
      ),
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
    tradeStructureSubType: getSelectTextField(
      "Structure Sub Type",
      "Select Structure Sub Type",
      true,
      "",
      "Licences[0].tradeLicenseDetail.structureType",
      "applyScreenMdmsData.common-masters.StructureSubTypeTransformed",
      [],
      "code",
      "code"
    ),
    tradeCommencementDate: getDateField(
      {
        labelName: "Trade Commencement Date",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL"
      },
      {
        labelName: "Enter Trade Commencement Date",
        labekKey: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_PLACEHOLDER"
      },
      true,
      getPattern("Date"),
      "Licences[0].commencementDate",
      {}
    ),
    tradeGSTNo: getTextField(
      {
        labelName: "Trade GST No.",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_GST_NO_LABEL"
      },
      {
        labelName: "Enter Trade GST No.",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_GST_NO_PLACEHOLDER"
      },
      false,
      getPattern("GSTNo")
    ),
    tradeOperationalArea: getTextField(
      {
        labelName: "Operatonal Area (Sq Ft)",
        labelKey: "TL_NEW_TRADE_DETAILS_OPR_AREA_LABEL"
      },
      {
        labelName: "Enter Operatonal Area in Sq Ft",
        labelKey: "TL_NEW_TRADE_DETAILS_OPR_AREA_PLACEHOLDER"
      },
      false,
      getPattern("OperationalArea"),
      "Licences[0].tradeLicenseDetail.operationalArea"
    ),
    tradeNoOfEmployee: getTextField(
      {
        labelName: "No. Of Employee",
        labelKey: "TL_NEW_TRADE_DETAILS_NO_EMPLOYEES_LABEL"
      },
      {
        labelName: "Enter No. Of Employee",
        labelKey: "TL_NEW_TRADE_DETAILS_NO_EMPLOYEES_PLACEHOLDER"
      },
      false,
      getPattern("NoOfEmp"),
      "Licences[0].tradeLicenseDetail.noOfEmployees"
    )
  }),
  multipleTradeUnitCard,
  accessoriesCard
});
