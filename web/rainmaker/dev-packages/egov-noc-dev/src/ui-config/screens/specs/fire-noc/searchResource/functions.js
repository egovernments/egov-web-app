import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../../../../ui-utils/commons";
import { convertEpochToDate, convertDateToEpoch } from "../../utils/index";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { textToLocalMapping } from "./searchResults";
import { validateFields } from "../../utils";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";

export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);
  let queryObject = [
    {
      key: "tenantId",
      value: JSON.parse(getUserInfo()).tenantId
    }
    // { key: "limit", value: "10" },
    // { key: "offset", value: "0" }
  ];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  const isSearchBoxFirstRowValid = validateFields(
    "components.div.children.fireNOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children",
    state,
    dispatch,
    "search"
  );

  const isSearchBoxSecondRowValid = validateFields(
    "components.div.children.fireNOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children",
    state,
    dispatch,
    "search"
  );

  if (!(isSearchBoxFirstRowValid && isSearchBoxSecondRowValid)) {
    dispatch(
      toggleSnackbar(
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
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field to start search",
          labelKey: "NOC_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
        },
        "warning"
      )
    );
  } else if (
    (searchScreenObject["fromDate"] === undefined ||
      searchScreenObject["fromDate"].length === 0) &&
    searchScreenObject["toDate"] !== undefined &&
    searchScreenObject["toDate"].length !== 0
  ) {
    dispatch(toggleSnackbar(true, "Please fill From Date", "warning"));
  } else {
    //  showHideProgress(true, dispatch);
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
        }
        // else if (key === "status") {
        //   queryObject.push({
        //     key: "action",
        //     value: searchScreenObject[key].trim()
        //   });
        // }
        else {
          queryObject.push({ key: key, value: searchScreenObject[key].trim() });
        }
      }
    }
    const response = await getSearchResults(queryObject);
    try {
      let data =
        response &&
        get(response, "FireNOCs", []).map(item => ({
          [get(textToLocalMapping, "Application No")]:
            item.applicationnumber || "-",
          [get(textToLocalMapping, "NOC No")]: "" || "-",
          [get(textToLocalMapping, "NOC Type")]:
            item.fireNOCDetails.fireNOCType || "-",
          [get(textToLocalMapping, "Owner Name")]:
            get(item, "fireNOCDetails.applicantDetails.owners[0].name") || "-",
          [get(textToLocalMapping, "Application Date")]:
            convertEpochToDate(item.applicationdate) || "-",
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
          `${textToLocalMapping["Search Results for Fire-NOC Applications"]}(${
            response.FireNOCs.length
          })`
        )
      );
      //showHideProgress(false, dispatch);
      showHideTable(true, dispatch);
    } catch (error) {
      //showHideProgress(false, dispatch);
      dispatch(toggleSnackbar(true, error.message, "error"));
      console.log(error);
    }
  }
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