import {
  getCommonHeader,
  getLabel,
  getBreak,
  getCommonTitle,
  getCommonParagraph,
  getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";

import {
  showHideAdhocPopup,
  getCommonGrayCard,
  getLabelOnlyValue
} from "../utils";

import { footer } from "./requiredDocuments/footer";
const documentsData = [
  { title: "POI", documents: ["PAN", "Passport"], note: "*NOTE SOME" },
  { title: "POI", documents: ["PAN", "Passport"], note: "*NOTE SOME" },
  { title: "POI", documents: ["PAN", "Passport"], note: "*NOTE SOME" }
];

const header = getCommonHeader({
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

const getDetails = getLabel();
const identityProof = getCommonGrayCard({
  subHeader: getCommonTitle({
    labelName: "Proof of Identity(Any 1)",
    labelKey: "NOC_IDENTITY_PROOF_HEADING"
  }),
  break1: getBreak(),
  docs: getCommonContainer({
    pan: getLabelOnlyValue({
      labelName: "1 PAN Card",
      labelKey: "NOC_IDENTITY_PROOF_PAN_LABEL"
    }),
    pan2: getLabelOnlyValue({
      labelName: "2 Passport",
      labelKey: "NOC_IDENTITY_PROOF_PASSPORT_LABEL"
    }),
    pan3: getLabelOnlyValue({
      labelName: "3 Aadhaar Card",
      labelKey: "NOC_IDENTITY_PROOF_AADHAR_LABEL"
    }),
    pan4: getLabelOnlyValue({
      labelName: "4 Voter ID Card",
      labelKey: "NOC_IDENTITY_PROOF_VOTER_ID_LABEL"
    }),
    pan5: getLabelOnlyValue({
      labelName: "5 Driving License",
      labelKey: "NOC_IDENTITY_PROOF_DRIVING_LIC_LABEL"
    })
  }),

  subParagraph: getCommonParagraph({
    labelName:
      "* In case of multiple/institutional Applicant please provide ID of primary or authorized person",
    labelKey: "NOC_IDENTITY_PROOF_NOTE"
  })
});

const addressProof = getCommonGrayCard({
  subHeader: getCommonTitle({
    labelName: "Proof of Address(Any 1)",
    labelKey: "NOC_IDENTITY_PROOF_HEADING"
  }),
  break1: getBreak(),
  docs: getCommonContainer({
    pan: getLabelOnlyValue({
      labelName: "1 PAN Card",
      labelKey: "NOC_IDENTITY_PROOF_PAN_LABEL"
    }),
    pan2: getLabelOnlyValue({
      labelName: "2 Passport",
      labelKey: "NOC_IDENTITY_PROOF_PASSPORT_LABEL"
    }),
    pan3: getLabelOnlyValue({
      labelName: "3 Aadhaar Card",
      labelKey: "NOC_IDENTITY_PROOF_AADHAR_LABEL"
    }),
    pan4: getLabelOnlyValue({
      labelName: "4 Voter ID Card",
      labelKey: "NOC_IDENTITY_PROOF_VOTER_ID_LABEL"
    }),
    pan5: getLabelOnlyValue({
      labelName: "5 Driving License",
      labelKey: "NOC_IDENTITY_PROOF_DRIVING_LIC_LABEL"
    }),
    pan6: getLabelOnlyValue({
      labelName: "6 Electricity Bill",
      labelKey: "NOC_IDENTITY_PROOF_ELECTRICITY_BILL_LABEL"
    })
  }),

  subParagraph: getCommonParagraph({
    labelName:
      "* In case of multiple/institutional Applicant please provide ID of primary or authorized person",
    labelKey: "NOC_ADDRESS_PROOF_NOTE"
  })
});

const buildingPlan = getCommonGrayCard({
  subHeader: getCommonTitle({
    labelName: "Building Plan",
    labelKey: "NOC_BUILDING_PLAN_HEADING"
  }),
  break1: getBreak(),
  docs: getCommonContainer({
    pan: getLabelOnlyValue({
      labelName: "1 Site Plan",
      labelKey: "NOC_BUILDING_PLAN_SITE_PLAN_LABEL"
    }),
    pan2: getLabelOnlyValue({
      labelName: "2 Ground Floor Plan",
      labelKey: "NOC_BUILDING_PLAN_GROUND_FLOOR_PLAN_LABEL"
    }),
    pan3: getLabelOnlyValue({
      labelName: "3 Section Plan",
      labelKey: "NOC_BUILDING_PLAN_SECTION_PLAN_LABEL"
    }),
    pan4: getLabelOnlyValue({
      labelName: "4 Elevation Plan",
      labelKey: "NOC_BUILDING_PLAN_ELEVATION_PLAN_LABEL"
    }),
    pan5: getLabelOnlyValue({
      labelName: "5 Built-up Area statement",
      labelKey: "NOC_BUILDING_BUILTUP_AREA_LABEL"
    })
  }),
  subParagraph: getCommonParagraph({
    labelName:
      "* In case of multiple buildings please provide building plans for all buildings",
    labelKey: "NOC_BUILDING_PLAN_NOTE"
  })
});

const fireFightingPlan = getCommonGrayCard({
  subHeader: getCommonTitle({
    labelName: "Fire-Fighting Plan",
    labelKey: "NOC_FIRE_FIGHTING_PLAN_HEADING"
  }),
  break1: getBreak(),
  docs: getCommonContainer({
    pan: getLabelOnlyValue({
      labelName: "1 Schematic drawing",
      labelKey: "NOC_FIREFIGHTING_SCHEMATIC_LABEL"
    }),
    pan1: getLabelOnlyValue({
      labelName: "2  Schematic drawing of fire detecting system",
      labelKey: "NOC_FIREFIGHTING_SCHEMATIC_DETECTING_SYSTEM_LABEL"
    })
  }),
  subParagraph: getCommonParagraph({
    labelName:
      "* In case of multiple buildings please provide building plans for all buildings",
    labelKey: "NOC_FIRE_FIGHTING_PLAN_NOTE"
  })
});

const ownerCheckList = getCommonGrayCard({
  subHeader: getCommonTitle({
    labelName: "Owners Checklist",
    labelKey: "NOC_OWNER_CHECK_LIST_HEADING"
  }),
  break1: getBreak(),
  docs: getCommonContainer({
    pan: getLabelOnlyValue({
      labelName: "1 Fire and Safety Checklist",
      labelKey: "NOC_OWNER_CHECK_LIST_FIRE_SAFETY_LABEL"
    }),
    pan1: getLabelOnlyValue({
      labelName: "2 Copy of Provisional for NoC (if applying for New)",
      labelKey: "NOC_OWNER_CHECK_LIST_PROVISIONAL_COPY_LABEL"
    })
  })
});

export const NOCRequiredDocuments = getCommonContainer(
  {
    documents: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        header,
        identityProof,
        addressProof,
        buildingPlan,
        fireFightingPlan,
        ownerCheckList
      },
      props: {
        id: "documents-div"
      }
    },
    footer: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        footer
      }
    }
  },
  {
    style: {
      paddingBottom: 75
    }
  }
);

export default NOCRequiredDocuments;
