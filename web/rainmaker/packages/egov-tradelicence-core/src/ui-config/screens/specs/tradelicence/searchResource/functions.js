import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../utils";
import { convertEpochToDate, convertDateToEpoch } from "../../utils/index";

export const searchApiCall = async (state, dispatch) => {
  let queryObject = [{ key: "tenantId", value: "pb.amritsar" }];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  if (Object.keys(searchScreenObject).length == 0) {
    alert("Please fill at least one field to start search");
  } else {
    showHideTable(false, dispatch);
    showHideProgress(true, dispatch);
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key] !== ""
      ) {
        if (key === "fromDate") {
          queryObject.push({
            key: key,
            value: convertDateToEpoch(searchScreenObject[key], "daystart")
          });
        } else if (key === "toDate") {
          queryObject.push({
            key: key,
            value: convertDateToEpoch(searchScreenObject[key], "dayend")
          });
        } else {
          queryObject.push({ key: key, value: searchScreenObject[key] });
        }
      }
    }

    const response = await getSearchResults(queryObject);
    let data = response.Licenses.map(item => ({
      "Application No": item.applicationNumber || "-",
      "License No": item.licenseNumber || "-",
      "Trade Name": item.tradeName || "-",
      "Owner Name": item.tradeLicenseDetail.owners[0].name || "-",
      "Application Date": convertEpochToDate(item.applicationDate) || "-",
      Status: item.status || "-"
    }));

    dispatch(
      handleField(
        "search",
        "components.div.children.searchResults",
        "props.data",
        data
      )
    );
    showHideProgress(false, dispatch);
    showHideTable(true, dispatch);
  }
};
const showHideProgress = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "search",
      "components.div.children.progressStatus",
      "visible",
      booleanHideOrShow
    )
  );
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "search",
      "components.div.children.searchResults",
      "visible",
      booleanHideOrShow
    )
  );
};
