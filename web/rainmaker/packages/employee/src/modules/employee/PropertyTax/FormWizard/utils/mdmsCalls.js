import { MDMS } from "egov-ui-kit/utils/endPoints"
import { httpRequest } from "egov-ui-kit/utils/api";

export const getDocumentTypes = async () => {
  try {
    let requestBody = {
      MdmsCriteria: {
        tenantId: "pb",
        moduleDetails: [
          {
            moduleName: "PropertyTax",
            masterDetails: [
              {
                name: "OwnerTypeDocument",
              },
            ],
          },
        ],
      },
    };
    const payload = await httpRequest(MDMS.GET.URL, MDMS.GET.ACTION, [], requestBody)
    return payload
  } catch (e) {
    //TODO:
  }
}
