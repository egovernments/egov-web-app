import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../utils";
import { convertEpochToDate } from "../../utils/index";

export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);
  showHideProgress(true, dispatch);
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

  const response = await getSearchResults(queryObject);
  let data = response.Licenses.map(item => ({
    "Application No": item.applicationNumber,
    "License No": item.licenseNumber,
    "Trade Name": item.tradeName,
    "Owner Name": item.tradeLicenseDetail.owners[0].name,
    "Application Date": convertEpochToDate(item.applicationDate),
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
  showHideProgress(false, dispatch);
  showHideTable(true, dispatch);
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
