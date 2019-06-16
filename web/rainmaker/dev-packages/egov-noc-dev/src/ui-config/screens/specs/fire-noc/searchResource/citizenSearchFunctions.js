import { getSearchResults } from "../../../../../ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

export const fetchData = async (action, state, dispatch) => {
  //const response = await getSearchResults();
  const response = {
    FireNOCs: [
      {
        id: "2c07233d-413a-4ed5-b8bd-12617b13adb4",
        tenantId: "pb.amritsar",
        fireNOCNumber: null,
        provisionFireNOCNumber: null,
        oldFireNOCNumber: null,
        dateOfApplied: null,
        fireNOCDetails: {
          id: "f93b4cb6-baae-4c2b-9d3b-c4fa90a31a65",
          applicationNumber: "PB-FN-2019-06-15-002280",
          status: "INITIATED",
          fireNOCType: "NEW",
          applicationDate: "1560615952289",
          financialYear: null,
          issuedDate: null,
          validFrom: null,
          validTo: null,
          action: "INITIATE",
          channel: null,
          noOfBuildings: "SINGLE",
          buildings: [
            {
              id: "bcc29cab-01b1-47b0-8f2f-67dbd9b65671",
              tenantId: "pb.amritsar",
              name: "dsrrh",
              usageType: "GROUP_A_RESIDENTIAL.SUBDIVISIONA-1",
              uoms: [
                {
                  id: "e9f0c1df-e5f7-492e-a071-8d09009a32d4",
                  code: "HEIGHT_OF_BUILDING",
                  value: "300",
                  isActiveUom: true,
                  active: true
                },
                {
                  id: "d72d8a95-2d7d-4c5f-a8f7-aa861789d53f",
                  code: "NO_OF_FLOORS",
                  value: "6",
                  isActiveUom: false,
                  active: true
                },
                {
                  id: "c10b50b6-6b9e-41fd-bb9e-e2bcb25a5a6d",
                  code: "NO_OF_BASEMENTS",
                  value: "1",
                  isActiveUom: false,
                  active: true
                }
              ],
              applicationDocuments: []
            }
          ],
          propertyDetails: {
            id: "67a8e2c0-1010-46f1-b0da-79e5d56c5b08",
            propertyId: null,
            address: {
              tenantId: "pb.amritsar",
              doorNo: null,
              latitude: null,
              longitude: null,
              buildingName: null,
              city: "pb.amritsar",
              locality: { code: "SUN04" },
              pincode: null,
              street: null
            }
          },
          applicantDetails: {
            ownerShipType: "INDIVIDUAL.SINGLEOWNER",
            owners: [
              {
                id: "fe134bbf-7492-4925-b8a0-eade45a94b0b",
                useruuid: "d9fb76e8-3c65-4e11-9f5f-2998c0f8b8a6",
                active: true,
                nsame: "Shreya",
                ownerType: "INDIVIDUAL.SINGLEOWNER",
                relationship: null,
                fatherOrHusbandName: ""
              }
            ],
            additionalDetail: {
              id: "c227c198-5239-4632-9077-e67ae783ae82",
              documents: []
            }
          },
          additionalDetail: {
            documents: [],
            ownerAuditionalDetail: {
              id: "c227c198-5239-4632-9077-e67ae783ae82",
              documents: []
            }
          },
          auditDetails: {
            createdBy: "d9fb76e8-3c65-4e11-9f5f-2998c0f8b8a6",
            lastModifiedBy: "",
            createdTime: "1560615952189",
            lastModifiedTime: "0"
          }
        },
        auditDetails: {
          createdBy: "d9fb76e8-3c65-4e11-9f5f-2998c0f8b8a6",
          lastModifiedBy: "",
          createdTime: "1560615952189",
          lastModifiedTime: "0"
        }
      }
    ]
  };
  //const mdmsRes = await getMdmsData(dispatch);
  //   let tenants =
  //     mdmsRes &&
  //     mdmsRes.MdmsRes &&
  //     mdmsRes.MdmsRes.tenant.citymodule.find(item => {
  //       if (item.code === "TL") return true;
  //     });
  //   dispatch(
  //     prepareFinalObject(
  //       "applyScreenMdmsData.common-masters.citiesByModule.TL",
  //       tenants
  //     )
  //   );
  try {
    if (response && response.FireNOCs && response.FireNOCs.length > 0) {
      dispatch(prepareFinalObject("searchResults", response.FireNOCs));
      dispatch(
        prepareFinalObject("myApplicationsCount", response.FireNOCs.length)
      );
    }
  } catch (error) {
    console.log(error);
  }
};
