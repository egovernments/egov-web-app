import isEmpty from "lodash/isEmpty";
import { uploadFile, httpRequest } from "ui-utils/api";
import { convertDateToEpoch } from "../ui-config/screens/specs/utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import set from "lodash/set";

export const updateTradeDetails = async requestBody => {
  try {
    const payload = await httpRequest(
      "post",
      "/tl-services/v1/_update",
      "",
      [],
      requestBody
    );
    return payload;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchResults = async queryObject => {
  try {
    const response = await httpRequest(
      "post",
      "/tl-services/v1/_search",
      "",
      queryObject
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updatePFOforSearchResults = async (
  action,
  state,
  dispatch,
  queryValue
) => {
  let queryObject = [
    { key: "tenantId", value: "pb.amritsar" },
    { key: "applicationNumber", value: queryValue }
  ];
  const payload = await getSearchResults(queryObject);
  dispatch(prepareFinalObject("Licenses[0]", payload.Licenses[0]));
};

export const applyTradeLicense = async (state, dispatch) => {
  try {
    let queryObject = JSON.parse(
      JSON.stringify(
        get(state.screenConfiguration.preparedFinalObject, "Licenses", [])
      )
    );
    set(queryObject[0], "validFrom", 1522540800000);
    set(queryObject[0], "validTo", 1554076799000);
    if (queryObject[0] && queryObject[0].commencementDate) {
      queryObject[0].commencementDate = convertDateToEpoch(
        queryObject[0].commencementDate,
        "dayend"
      );
    }
    let owners = get(queryObject[0], "tradeLicenseDetail.owners");
    owners = (owners && convertOwnerDobToEpoch(owners)) || [];
    set(queryObject[0], "tradeLicenseDetail.owners", owners);
    set(queryObject[0], "tenantId", "pb.amritsar");
    const status = get(queryObject[0], "status", "");

    if (
      (status === "INITIATED" || status === "APPLIED") &&
      queryObject[0].applicationNumber
    ) {
      //call update
      let action = "INITIATE";
      if (
        queryObject[0].tradeLicenseDetail &&
        queryObject[0].tradeLicenseDetail.applicationDocuments
      ) {
        action = "APPLY";
      }
      set(queryObject[0], "action", action);
      const response = await httpRequest(
        "post",
        "/tl-services/v1/_update",
        "",
        [],
        { Licenses: queryObject }
      );
      response && dispatch(prepareFinalObject("Licenses", response.Licenses));
    } else {
      set(queryObject[0], "action", "INITIATE");
      const response = await httpRequest(
        "post",
        "/tl-services/v1/_create",
        "",
        [],
        { Licenses: queryObject }
      );
      dispatch(prepareFinalObject("Licenses", response.Licenses));
    }
  } catch (error) {
    console.log(error);
  }
};

const convertOwnerDobToEpoch = owners => {
  let updatedOwners =
    owners &&
    owners.map(owner => {
      owner.dob = convertDateToEpoch(owner.dob, "dayend");
      return owner;
    });
  return updatedOwners;
};
