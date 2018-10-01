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
import { getIconStyle } from "../../utils";

const multipleTradeUnitCard =
  // {
  //   uiFramework: "custom-molecules",
  //   componentPath: "MultiItem",
  //   props: {
  //     scheama:
  getCommonGrayCard({
    header: getCommonSubHeader("Trade Unit  "),
    tradeUnitCardContainer: getCommonContainer({
      tradeCategory: getSelectTextField(
        "Trade Category",
        "Select Trade Category",
        true,
        "",
        "Licences[0].tradeType",
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
      tradeType: getSelectTextField(
        "Trade  Type",
        "Select Trade Type",
        true,
        "",
        "",
        "",
        [],
        "",
        "",
        {},
        {
          xs: 12,
          sm: 4
        }
      ),
      tradeSubType: getSelectTextField(
        "Trade Sub-Type",
        "Select Trade Sub-Type",
        true,
        "",
        "Licences[0].tradeLicenseDetail.tradeUnits[0].tradeType",
        "",
        [],
        "",
        "",
        {},
        {
          xs: 12,
          sm: 4
        }
      ),
      tradeUOM: getTextField(
        "UOM (Unit of Measurement)",
        "",
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
        "UOM Value",
        "Enter UOM Value",
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
//     ,
//     items: [],
//     addItemLabel: "ADD TRADE UNIT"
//   },
//   type:"array"
// };

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
          "UOM (Unit of Measurement)",
          "UOM",
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
          "UOM Value",
          "Enter UOM Value",
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
      objectJsonPath:"Licences[0].accessories"
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
      "Name of Trade",
      "Example Diljit Da Dhaba",
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
    tradeStructureType: getSelectTextField(
      "Structure Type",
      "Select Structure Type",
      true,
      "",
      "",
      "applyScreenMdmsData.common-masters.StructureTypeTransformed",
      [],
      "code",
      "code"
    ),
    tradeStructureSubType: getSelectTextField(
      "Structure Sub Type",
      "Select Structure Sub Type",
      true,
      "",
      "Licences[0].tradeLicenseDetail.structureType"
    ),
    tradeCommencementDate: getDateField(
      "Trade Commencement Date",
      "Enter Trade Commencement Date",
      true,
      getPattern("Date"),
      "Licences[0].commencementDate",
      {}
    ),
    tradeGSTNo: getTextField(
      "Trade GST No.",
      "Enter Trade GST No.",
      false,
      getPattern("GSTNo")
    ),
    tradeOperationalArea: getTextField(
      "Operatonal Area (Sq Ft)",
      "Enter Operatonal Area in Sq Ft",
      false,
      getPattern("OperationalArea"),
      "Licences[0].tradeLicenseDetail.operationalArea"
    ),
    tradeNoOfEmployee: getTextField(
      "No. Of Employee",
      "Enter No. Of Employee",
      false,
      getPattern("NoOfEmp"),
      "Licences[0].tradeLicenseDetail.noOfEmployees"
    )
  }),
  multipleTradeUnitCard,
  accessoriesCard
});
