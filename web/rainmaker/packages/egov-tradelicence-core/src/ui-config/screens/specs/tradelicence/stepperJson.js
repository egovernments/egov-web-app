export  const stepperObject = {
    "screenKey": "apply", "parentPath": "components.div.children.stepper.props",
    "stepper": {
        "steps": [
            {
                "label": {
                    "labelName": "Trade Details", "labelKey": "TL_COMMON_TR_DETAILS",
                },
                "active": true,
                "disabled": false,
                "completed": false,
                "classess": {

                },
                "contentComponentJsonPath": {
                   path: "components.div.children.formwizardFirstStep", errMsg: "Please fill all mandatory fields for Trade Details, then do next !" 

                }
            },
            {
                "label": {
                    "labelName": "Owner Details", "labelKey": "TL_COMMON_OWN_DETAILS"
                },
                "visbilityContentComponentJsonPath": [
                    "step"
                ]
            }, {
                "label": {
                    "labelName": "Documents", "labelKey": "TL_COMMON_DOCS"
                }

            }, {
                "label": {
                    "labelName": "Summary", "labelKey": "TL_COMMON_SUMMARY"
                }
            }
        ]
    },
    "footer": {
        "actions": [
            {
                "label": {
                    "labelName": "Previous Step",
                    "labelKey": "TL_COMMON_BUTTON_PREV_STEP"
                },
                "variant": "outlined",
                "fullWidth": false,
                "color": "primary",
                "classess": {

                },
                "iconProps": {
                    "name": "keyboard_arrow_left", "position": "before"
                },
                "visibleFor": [1, 2, 3]
            }, {
                "label": {
                    "labelName": "Next Step",
                    "labelKey": "TL_COMMON_BUTTON_NXT_STEP"
                },
                "variant": "contained",
                "fullWidth": false,
                "color": "primary",
                "style":{ "marginRight": "45px"},
                "classess": {

                },
                "iconProps": {
                    "name": "keyboard_arrow_right", "position": "after"
                },
                "visibleFor": [0, 1, 2]
            }, {
                "label": {
                    "labelName": "Submit",
                    "labelKey": "TL_COMMON_BUTTON_SUBMIT"
                },
                "variant": "outlined",
                "fullWidth": false,
                "color": "primary",
                "classess": {

                },
                "iconProps": {
                    "name": "keyboard_arrow_right", "position": "after"
                },
                "visibleFor": [3]
            }
        ]
    },
    "stpperToFooterRelattion": {
        "TL_COMMON_BUTTON_NXT_STEP": {
            "0": {
                "screenValidationComponentJsonPath": [{
                    dataPath:"tradeDetails.children.cardContent.children.tradeDetailsConatiner.children",
                },{
                    dataPath:"tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children"
                },{
                    dataPath: "tradeDetails.children.cardContent.children.accessoriesCard.props.items", 
                    childrenPath: "children.cardContent.children.accessoriesCardContainer.children", 
                    isMultiple: true
               },{
                  dataPath: "tradeDetails.children.cardContent.children.tradeUnitCard.props.items",
                  childrenPath: "children.cardContent.children.tradeUnitCardContainer.children", isMultiple: true
                }],
                "onClickCustomFunctionLocation": {
                }
            },
            "1": {

            },
            "2": {

            }
        }
    }
    
};