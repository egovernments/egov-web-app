import { httpRequest } from "../../../../../ui-utils/api";
import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";

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
  try {
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
      "Application Date": changeDateFormat(item.applicationDate),
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
  } catch (error) {
    console.log(error);
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

const changeDateFormat = epoch => {
  var dateObj = new Date(epoch);
  var month = dateObj.getMonth() + 1;
  var day = dateObj.getDate();
  var year = dateObj.getFullYear();
  month = (month > 9 ? "" : "0") + month;
  day = (day > 9 ? "" : "0") + day;
  return day + "/" + month + "/" + year;
};
