import { httpRequest } from "../../../../../ui-utils/api";
import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";

export const searchApiCall = async (state, dispatch) => {
  let queryObject = [{ key: "tenantId", value: "pb.amritsar" }];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  for (var key in searchScreenObject) {
    if (searchScreenObject.hasOwnProperty(key)) {
      queryObject.push({ key: key, value: searchScreenObject[key] });
    }
  }
  const response = await httpRequest(
    "post",
    "/tl-services/v1/_search",
    "",
    queryObject
  );

  let data = response.Licenses.map(item => ({
    "Application No": item.applicationNumber,
    "License No": item.licenseNumber,
    "Trade Name": item.tradeName,
    "Owner Name": item.tradeLicenseDetail.owners[0].name,
    "Application Date": item.applicationDate,
    Status: item.status
  }));

  dispatch(
    handleField(
      "search",
      "components.div.children.searchResults",
      "props.data",
      data
    )
  );
  dispatch(
    handleField(
      "search",
      "components.div.children.searchResults",
      "visible",
      true
    )
  );
};