"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NOCRequiredDocuments = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../utils");

var _footer = require("./requiredDocuments/footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var documentsData = [{ title: "POI", documents: ["PAN", "Passport"], note: "*NOTE SOME" }, { title: "POI", documents: ["PAN", "Passport"], note: "*NOTE SOME" }, { title: "POI", documents: ["PAN", "Passport"], note: "*NOTE SOME" }];

var header = (0, _utils.getCommonHeader)({
  labelName: "Required Documents-Fire NOC",
  labelKey: "NOC_REQ_DOCS_HEADER"
});
// const getDetails = (documentsData) => {
//   return (
//     <div>
//       {documentsData.map((item, i) => {
//         return(
//         <div
//           className="col-sm-4 custom-styling"
//           key={i}
//           textChildren={
//             <div>
//               <div className="head"> {item.head}</div>
//             </div>
//           }
//         />)
//       })}
//     </div>
//   );
// };

var getDetails = (0, _utils.getLabel)();
var identityProof = (0, _utils2.getCommonGrayCard)({
  subHeader: (0, _utils.getCommonTitle)({
    labelName: "Proof of Identity(Any 1)",
    labelKey: "NOC_IDENTITY_PROOF_HEADING"
  }),
  break1: (0, _utils.getBreak)(),
  docs: (0, _utils.getCommonContainer)({
    pan: (0, _utils2.getLabelOnlyValue)({
      labelName: "1 PAN Card",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    }),
    pan2: (0, _utils2.getLabelOnlyValue)({
      labelName: "2 Passport",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    }),
    pan3: (0, _utils2.getLabelOnlyValue)({
      labelName: "3 Aadhaar Card",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    }),
    pan4: (0, _utils2.getLabelOnlyValue)({
      labelName: "4 Voter ID Card",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    }),
    pan5: (0, _utils2.getLabelOnlyValue)({
      labelName: "5 Driving License",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    })
  }),

  subParagraph: (0, _utils.getCommonParagraph)({
    labelName: "* In case of multiple/institutional Applicant please provide ID of primary or authorized person",
    labelKey: "NOC_IDENTITY_PROOF_NOTE"
  })
});

var addressProof = (0, _utils2.getCommonGrayCard)({
  subHeader: (0, _utils.getCommonTitle)({
    labelName: "Proof of Address(Any 1)",
    labelKey: "NOC_IDENTITY_PROOF_HEADING"
  }),
  break1: (0, _utils.getBreak)(),
  docs: (0, _utils.getCommonContainer)({
    pan: (0, _utils2.getLabelOnlyValue)({
      labelName: "1 PAN Card",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    }),
    pan2: (0, _utils2.getLabelOnlyValue)({
      labelName: "2 Passport",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    }),
    pan3: (0, _utils2.getLabelOnlyValue)({
      labelName: "3 Aadhaar Card",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    }),
    pan4: (0, _utils2.getLabelOnlyValue)({
      labelName: "4 Voter ID Card",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    }),
    pan5: (0, _utils2.getLabelOnlyValue)({
      labelName: "5 Driving License",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    }),
    pan6: (0, _utils2.getLabelOnlyValue)({
      labelName: "6 Electricity Bill",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    })
  }),

  subParagraph: (0, _utils.getCommonParagraph)({
    labelName: "* In case of multiple/institutional Applicant please provide ID of primary or authorized person",
    labelKey: "NOC_ADDRESS_PROOF_NOTE"
  })
});

var buildingPlan = (0, _utils2.getCommonGrayCard)({
  subHeader: (0, _utils.getCommonTitle)({
    labelName: "Proof of Identity(Any 1)",
    labelKey: "NOC_BUILDING_PLAN_HEADING"
  }),
  break1: (0, _utils.getBreak)(),
  docs: (0, _utils.getCommonContainer)({
    pan: (0, _utils2.getLabelOnlyValue)({
      labelName: "1 Site Plan",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    }),
    pan2: (0, _utils2.getLabelOnlyValue)({
      labelName: "2 Ground Floor Plan",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    }),
    pan3: (0, _utils2.getLabelOnlyValue)({
      labelName: "3 Section Plan",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    }),
    pan4: (0, _utils2.getLabelOnlyValue)({
      labelName: "4 Elevation Plan",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    }),
    pan5: (0, _utils2.getLabelOnlyValue)({
      labelName: "5 Built-up Area statement",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    })
  }),
  subParagraph: (0, _utils.getCommonParagraph)({
    labelName: "* In case of multiple buildings please provide building plans for all buildings",
    labelKey: "NOC_BUILDING_PLAN_NOTE"
  })
});

var fireFightingPlan = (0, _utils2.getCommonGrayCard)({
  subHeader: (0, _utils.getCommonTitle)({
    labelName: "Fire-Fighting Plan",
    labelKey: "NOC_FIRE_FIGHTING_PLAN_HEADING"
  }),
  break1: (0, _utils.getBreak)(),
  docs: (0, _utils.getCommonContainer)({
    pan: (0, _utils2.getLabelOnlyValue)({
      labelName: "1 Schematic drawing",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    })
  }),
  subParagraph: (0, _utils.getCommonParagraph)({
    labelName: "* In case of multiple buildings please provide building plans for all buildings",
    labelKey: "NOC_FIRE_FIGHTING_PLAN_NOTE"
  })
});

var ownerCheckList = (0, _utils2.getCommonGrayCard)({
  subHeader: (0, _utils.getCommonTitle)({
    labelName: "Owners Checklist",
    labelKey: "NOC_OWNER_CHECK_LIST_HEADING"
  }),
  break1: (0, _utils.getBreak)(),
  docs: (0, _utils.getCommonContainer)({
    pan: (0, _utils2.getLabelOnlyValue)({
      labelName: "1 Fire and Safety Checklist",
      labelKey: "NOC_IDENTITY_PROOF_HEADING"
    })
  })
});

var NOCRequiredDocuments = exports.NOCRequiredDocuments = (0, _utils.getCommonContainer)({
  headerDiv: {
    uiFramework: "custom-atoms",
    componentPath: "Container",

    children: {
      header: (0, _extends3.default)({
        gridDefination: {
          xs: 12
        }
      }, header)
    }
  },
  lowerDiv: {
    uiFramework: "custom-atoms",
    componentPath: "Container",

    children: {
      identityProof: identityProof,
      addressProof: addressProof,
      buildingPlan: buildingPlan,
      fireFightingPlan: fireFightingPlan,
      ownerCheckList: ownerCheckList,
      footer: _footer.footer
    }
  }
}, {
  style: {
    paddingBottom: 75
  }
});

exports.default = NOCRequiredDocuments;