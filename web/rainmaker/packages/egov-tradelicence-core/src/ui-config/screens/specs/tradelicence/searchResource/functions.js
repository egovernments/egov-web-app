import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../../../..//ui-utils/commons";
import { convertEpochToDate, convertDateToEpoch } from "../../utils/index";
import { toggleSnackbarAndSetText } from "egov-ui-framework/ui-redux/app/actions";
import { textToLocalMapping } from "./searchResults";
import { validateFields } from "../../utils";

export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);
  let queryObject = [
    {
      key: "tenantId",
      value: JSON.parse(localStorage.getItem("user-info")).tenantId
    },
    { key: "limit", value: "10" },
    { key: "offset", value: "0" }
  ];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  const isSearchBoxFirstRowValid = validateFields(
    "components.div.children.tradeLicenseApplication.children.cardContent.children.appTradeAndMobNumContainer.children",
    state,
    dispatch,
    "search"
  );

  const isSearchBoxSecondRowValid = validateFields(
    "components.div.children.tradeLicenseApplication.children.cardContent.children.appStatusAndToFromDateContainer.children",
    state,
    dispatch,
    "search"
  );

  if (!(isSearchBoxFirstRowValid && isSearchBoxSecondRowValid)) {
    dispatch(
      toggleSnackbarAndSetText(
        true,
        "Please fill valid fields to start search",
        "warning"
      )
    );
  } else if (
    Object.keys(searchScreenObject).length == 0 ||
    Object.values(searchScreenObject).every(x => x === "")
  ) {
    dispatch(
      toggleSnackbarAndSetText(
        true,
        "Please fill at least one field to start search",
        "warning"
      )
    );
  } else if (
    (searchScreenObject["fromDate"] === undefined ||
      searchScreenObject["fromDate"].length === 0) &&
    searchScreenObject["toDate"] !== undefined &&
    searchScreenObject["toDate"].length !== 0
  ) {
    dispatch(
      toggleSnackbarAndSetText(true, "Please fill From Date", "warning")
    );
  } else {
    // showHideProgress(true, dispatch);
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key].trim() !== ""
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
          queryObject.push({ key: key, value: searchScreenObject[key].trim() });
        }
      }
    }

    const response = await getSearchResults(queryObject);
    try {
      let data = response.Licenses.map(item => ({
        [get(textToLocalMapping, "Application No")]:
          item.applicationNumber || "-",
        [get(textToLocalMapping, "License No")]: item.licenseNumber || "-",
        [get(textToLocalMapping, "Trade Name")]: item.tradeName || "-",
        [get(textToLocalMapping, "Owner Name")]:
          item.tradeLicenseDetail.owners[0].name || "-",
        [get(textToLocalMapping, "Application Date")]:
          convertEpochToDate(item.applicationDate) || "-",
        tenantId: item.tenantId,
        [get(textToLocalMapping, "Status")]:
          get(textToLocalMapping, item.status) || "-"
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
          "props.title",
          `${
            textToLocalMapping["Search Results for Trade License Applications"]
          } (${response.Licenses.length})`
        )
      );
      // showHideProgress(false, dispatch);
      showHideTable(true, dispatch);
    } catch (error) {
      // showHideProgress(false, dispatch);
      dispatch(toggleSnackbarAndSetText(true, error.message, "error"));
      console.log(error);
    }
  }
};
// const showHideProgress = (booleanHideOrShow, dispatch) => {
//   dispatch(
//     handleField(
//       "search",
//       "components.div.children.progressStatus",
//       "visible",
//       booleanHideOrShow
//     )
//   );
// };

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
