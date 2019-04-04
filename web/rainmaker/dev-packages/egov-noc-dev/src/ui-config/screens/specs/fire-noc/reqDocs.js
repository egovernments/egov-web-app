import {
  getCommonHeader,
  getLabel,
  getBreak,
  getCommonTitle,
  getCommonParagraph,
  getCommonContainer
} from "egov-ui-framework/ui-config/screens/specs/utils";

import { showHideAdhocPopup, getCommonGrayCard } from "../utils";

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

  subParagraph: getCommonParagraph({
    labelName:
      "* In case of multiple/institutional Applicant please provide ID of primary or authorized person",
    labelKey: "NOC_ADDRESS_PROOF_NOTE"
  })
});

const buildingPlan = getCommonGrayCard({
  subHeader: getCommonTitle({
    labelName: "Proof of Identity(Any 1)",
    labelKey: "NOC_BUILDING_PLAN_HEADING"
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
  })
});

export const NOCRequiredDocuments = getCommonContainer({
  headerDiv: {
    uiFramework: "custom-atoms",
    componentPath: "Container",

    children: {
      header: {
        gridDefination: {
          xs: 12
        },
        ...header
      }
    }
  },
  lowerDiv: {
    uiFramework: "custom-atoms",
    componentPath: "Container",

    children: {
      identityProof,
      addressProof,
      buildingPlan,
      fireFightingPlan,
      ownerCheckList,
      footer
    }
  }
});

export default NOCRequiredDocuments;
