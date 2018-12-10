import {
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import {
  getIconStyle,
  objectToDropdown,
  getTodaysDateInYMD,
  getFinancialYearDates,
  getNextMonthDateInYMD,
  setFilteredTradeTypes,
  getUniqueItemsFromArray
} from "../../utils";
import { prepareFinalObject as pFO } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import filter from "lodash/filter";

const tradeUnitCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      header: getCommonSubHeader(
        {
          labelName: "Trade Unit  ",
          labelKey: "TL_NEW_TRADE_DETAILS_TRADE_UNIT_HEADER"
        },
        {
          style: {
            marginBottom: 18
          }
        }
      ),
      tradeUnitCardContainer: getCommonContainer(
        {
          tradeCategory: {
            ...getSelectField({
              label: { labelName: "Trade Category" },
              placeholder: { labelName: "Select Trade Category" },
              required: true,
              jsonPath: "LicensesTemp.tradeUnits[0].tradeType",
              props: {
                jsonPathUpdatePrefix: "LicensesTemp.tradeUnits",
                setDataInField: true
              },
              sourceJsonPath:
                "applyScreenMdmsData.TradeLicense.TradeTypeTransformed",
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
                        `applyScreenMdmsData.TradeLicense.TradeType.${
                          action.value
                        }`,
                        []
                      )
                    )
                  )
                );
                let componentPath = action.componentJsonpath.split(".");
                componentPath.pop();
                componentPath.push("tradeType");
                componentPath = componentPath.join(".");
                dispatch(
                  handleField(
                    "apply",
                    componentPath,
                    "props.data",
                    objectToDropdown(
                      get(
                        state.screenConfiguration.preparedFinalObject,
                        `applyScreenMdmsData.TradeLicense.TradeType.${
                          action.value
                        }`,
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
              jsonPath: "LicensesTemp.tradeUnits[0].tradeSubType",
              props: {
                jsonPathUpdatePrefix: "LicensesTemp.tradeUnits"
              },
              sourceJsonPath:
                "applyScreenMdmsData.TradeLicense.TradeCategoryTransformed",
              gridDefination: {
                xs: 12,
                sm: 4
              }
            }),
            beforeFieldChange: (action, state, dispatch) => {
              try {
                let cardIndex = action.componentJsonpath
                  .split("items[")[1]
                  .split("]")[0];
                let tradeCategory = get(
                  state.screenConfiguration.preparedFinalObject,
                  `LicensesTemp.tradeUnits[${cardIndex}].tradeType`,
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
                let componentPath = action.componentJsonpath.split(".");
                componentPath.pop();
                componentPath.push("tradeSubType");
                componentPath = componentPath.join(".");
                dispatch(
                  handleField(
                    "apply",
                    componentPath,
                    "props.data",
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
            uiFramework: "custom-containers-local",
            componentPath: "AutosuggestContainer",
            jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType",
            required: true,
            gridDefination: {
              xs: 12,
              sm: 4
            },
            props: {
              style: {
                width: "100%",
                cursor: "pointer"
              },
              label: { labelName: "Trade Sub-Type" },
              placeholder: { labelName: "Select Trade Sub-Type" },
              jsonPath:
                "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType",
              sourceJsonPath:
                "applyScreenMdmsData.TradeLicense.TradeSubCategoryTransformed",
              setDataInField: true,
              labelsFromLocalisation: true,
              fullwidth: true,
              required: true,
              inputLabelProps: {
                shrink: true
              }
            },
            beforeFieldChange: (action, state, dispatch) => {
              try {
                let cardIndex = action.componentJsonpath
                  .split("items[")[1]
                  .split("]")[0];
                const tradeSubTypes = get(
                  state.screenConfiguration,
                  "preparedFinalObject.Licenses[0].tradeLicenseDetail.tradeUnits",
                  []
                );
                const alreadySelected =
                  tradeSubTypes &&
                  tradeSubTypes.find((item, i) => {
                    if (item.tradeType === action.value && cardIndex != i)
                      return true;
                  });
                if (alreadySelected) {
                  alert(
                    "This trade type is already selected, Please select another"
                  );
                  action.value = null;
                } else {
                  let tradeType = get(
                    state.screenConfiguration.preparedFinalObject,
                    `LicensesTemp.tradeUnits[${cardIndex}].tradeType`,
                    ""
                  );
                  let tradeCategory = get(
                    state.screenConfiguration.preparedFinalObject,
                    `LicensesTemp.tradeUnits[${cardIndex}].tradeSubType`,
                    ""
                  );
                  let tradeSubCategories = get(
                    state.screenConfiguration.preparedFinalObject,
                    `applyScreenMdmsData.TradeLicense.TradeType.${tradeType}.${tradeCategory}`,
                    []
                  );
                  tradeSubCategories = getUniqueItemsFromArray(
                    tradeSubCategories,
                    "code"
                  );
                  let currentObject = filter(tradeSubCategories, {
                    code: action.value
                  });
                  if (currentObject[0].uom !== null) {
                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOM"
                        ),
                        "props.value",
                        currentObject[0].uom
                      )
                    );
                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOMValue"
                        ),
                        "props.required",
                        true
                      )
                    );
                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOMValue"
                        ),
                        "props.disabled",
                        false
                      )
                    );
                  } else {
                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOMValue"
                        ),
                        "props.required",
                        false
                      )
                    );

                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOMValue"
                        ),
                        "props.disabled",
                        true
                      )
                    );

                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOM"
                        ),
                        "props.value",
                        ""
                      )
                    );
                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOMValue"
                        ),
                        "props.value",
                        ""
                      )
                    );

                    dispatch(
                      pFO(
                        `Licenses[0].tradeLicenseDetail.tradeUnits[${cardIndex}].uom`,
                        null
                      )
                    );
                    dispatch(
                      pFO(
                        `Licenses[0].tradeLicenseDetail.tradeUnits[${cardIndex}].uomValue`,
                        null
                      )
                    );
                    dispatch(
                      handleField(
                        "apply",
                        action.componentJsonpath.replace(
                          "tradeSubType",
                          "tradeUOMValue"
                        ),
                        "props.error",
                        false
                      )
                    );
                  }
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
            // required: true,
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
              disabled: true,
              setDataInField: true,
              jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].uomValue"
            },
            pattern: getPattern("UOMValue"),
            jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].uomValue",
            gridDefination: {
              xs: 12,
              sm: 4
            }
          })
        },
        {
          style: {
            overflow: "visible"
          }
        }
      )
    }),
    items: [],
    addItemLabel: "ADD TRADE UNITS",
    headerName: "TradeUnits",
    headerJsonPath:
      "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits",
    prefixSourceJsonPath:
      "children.cardContent.children.tradeUnitCardContainer.children"
  },
  type: "array"
};

const accessoriesCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: getCommonGrayCard({
      header: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
        children: {
          head: getCommonSubHeader(
            {
              labelName: "Accessories",
              labelKey: "TL_NEW_TRADE_DETAILS_HEADER_ACC"
            },
            {
              style: {
                marginBottom: 18
              }
            }
          ),
          ico: {
            uiFramework: "custom-molecules-local",
            componentPath: "Tooltip",
            props: {
              val: {
                value: "Accessories Information",
                key: "TL_ACCESSORIES_TOOLTIP_MESSAGE"
              },
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
              let accessories = get(
                state.screenConfiguration.preparedFinalObject,
                `applyScreenMdmsData.TradeLicense.AccessoriesCategory`,
                []
              );
              let currentObject = filter(accessories, {
                code: action.value
              });
              const currentUOMField = get(
                state.screenConfiguration.screenConfig.apply,
                action.componentJsonpath,
                []
              );
              var jsonArr = currentUOMField.jsonPath.split(".");
              jsonArr.pop();

              let currentUOMValueFieldPath = action.componentJsonpath.split(
                "."
              );
              currentUOMValueFieldPath.pop();
              currentUOMValueFieldPath = currentUOMValueFieldPath.join(".");
              if (currentObject[0].uom) {
                dispatch(
                  handleField(
                    "apply",
                    `${currentUOMValueFieldPath}.accessoriesUOM`,
                    "props.value",
                    currentObject[0].uom
                  )
                );
                dispatch(
                  handleField(
                    "apply",
                    `${currentUOMValueFieldPath}.accessoriesUOMValue`,
                    "props.disabled",
                    false
                  )
                );
                dispatch(
                  handleField(
                    "apply",
                    `${currentUOMValueFieldPath}.accessoriesUOMValue`,
                    "required",
                    true
                  )
                );
              } else {
                // dispatch(
                //   handleField(
                //     "apply",
                //     `${currentUOMValueFieldPath}.accessoriesUOM`,
                //     "required",
                //     false
                //   )
                // );
                dispatch(
                  handleField(
                    "apply",
                    `${currentUOMValueFieldPath}.accessoriesUOMValue`,
                    "required",
                    false
                  )
                );
                dispatch(
                  handleField(
                    "apply",
                    `${currentUOMValueFieldPath}.accessoriesUOM`,
                    "props.value",
                    ""
                  )
                );
                dispatch(
                  handleField(
                    "apply",
                    `${currentUOMValueFieldPath}.accessoriesUOMValue`,
                    "props.value",
                    ""
                  )
                );
                dispatch(
                  handleField(
                    "apply",
                    `${currentUOMValueFieldPath}.accessoriesUOMValue`,
                    "props.disabled",
                    true
                  )
                );
                dispatch(pFO(`${jsonArr.join(".")}.uom`, null));
                dispatch(pFO(`${jsonArr.join(".")}.uomValue`, null));
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
          // required: true,
          props: {
            disabled: true
          },
          jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].uom",
          gridDefination: {
            xs: 12,
            sm: 4
          }
        }),
        accessoriesUOMValue: {
          ...getTextField({
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
              disabled: true,
              setDataInField: true,
              jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].uomValue"
            },
            required: true,
            jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].uomValue",
            gridDefination: {
              xs: 12,
              sm: 4
            }
          })
        }
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
  header: getCommonTitle(
    {
      labelName: "Trade Details",
      labelKey: "TL_NEW_TRADE_DETAILS_PROV_DET_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  tradeDetailsConatiner: getCommonContainer({
    tradeLicenseType: {
      ...getSelectField({
        label: { labelName: "License Type" },
        placeholder: { labelName: "Select License Type" },
        required: true,
        jsonPath: "Licenses[0].licenseType",
        props: {
          disabled: true,
          value: "PERMANENT",
          className: "tl-trade-type"
        },
        sourceJsonPath: "applyScreenMdmsData.TradeLicense.licenseType"
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
        jsonPath: "Licenses[0].validFrom",
        props: {
          inputProps: {
            min: getTodaysDateInYMD(),
            max: getFinancialYearDates("yyyy-mm-dd").endDate
          }
        }
      }),
      visible: false
    },
    tradeToDate: {
      ...getDateField({
        label: { labelName: "To Date" },
        placeholder: { labelName: "Trade License From Date" },
        required: true,
        pattern: getPattern("Date"),
        jsonPath: "Licenses[0].validTo",
        props: {
          inputProps: {
            min: getNextMonthDateInYMD(),
            max: getFinancialYearDates("yyyy-mm-dd").endDate
          }
        }
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
          // dispatch(pFO("Licenses[0].tradeLicenseDetail.structureType", null));
        } catch (e) {
          console.log(e);
        }
      }
    },
    tradeStructureSubType: {
      ...getSelectField({
        label: { labelName: "Structure Sub Type" },
        placeholder: { labelName: "Select Structure Sub Type" },
        required: true,
        jsonPath: "Licenses[0].tradeLicenseDetail.structureType",
        sourceJsonPath:
          "applyScreenMdmsData.common-masters.StructureSubTypeTransformed"
      }),
      beforeFieldChange: (action, state, dispatch) => {
        const tradeTypes = setFilteredTradeTypes(
          state,
          dispatch,
          get(
            state.screenConfiguration.preparedFinalObject,
            "Licenses[0].licenseType",
            "PERMANENT"
          ),
          action.value
        );
        const tradeTypeDropdownData =
          tradeTypes &&
          tradeTypes.TradeType &&
          Object.keys(tradeTypes.TradeType).map(item => {
            return { code: item, active: true };
          });
        tradeTypeDropdownData &&
          dispatch(
            pFO(
              "applyScreenMdmsData.TradeLicense.TradeTypeTransformed",
              tradeTypeDropdownData
            )
          );
        // dispatch(pFO("Licenses[0].tradeLicenseDetail.tradeUnits", []));
        // dispatch(pFO("LicensesTemp.tradeUnits", []));
      }
    },
    tradeCommencementDate: getDateField({
      label: {
        labelName: "Trade Commencement Date",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter Trade Commencement Date",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_PLACEHOLDER"
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
      pattern: getPattern("GSTNo"),
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.gstNo"
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
  tradeUnitCard,
  accessoriesCard
});
