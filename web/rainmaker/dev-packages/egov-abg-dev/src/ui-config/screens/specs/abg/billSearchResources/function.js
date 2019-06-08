import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../../../../ui-utils/commons";
import { convertEpochToDate, convertDateToEpoch } from "../../utils/index";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { textToLocalMapping } from "./searchResults";
import { validateFields } from "../../utils";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";

// const tenantId = JSON.parse(getUserInfo()).tenantId;
const tenantId = "pb.amritsar";

export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);

  let queryObject = [
    {
      key: "tenantId",
      value: tenantId
    },
    { key: "limit", value: "10" }
  ];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  const isSearchBoxFirstRowValid = validateFields(
    "components.div.children.billSearchCard.children.cardContent.children.searchContainer.children",
    // "components.div.children.fireNOCApplication.children.cardContent.children.searchContainer.children",
    state,
    dispatch,
    "billSearch"
  );
  const isSearchBoxSecondRowValid = validateFields(
    "components.div.children.billSearchCard.children.cardContent.children.searchContainer.children",
    // "components.div.children.fireNOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children",
    state,
    dispatch,
    "billSearch"
  );
  if (!isSearchBoxFirstRowValid && isSearchBoxSecondRowValid) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field to start search",
          labelKey: "ABG_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
        },
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
          labelKey: "ABG_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
        },
        "warning"
      )
    );
  } else {
    //  showHideProgress(true, dispatch);
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key].trim() !== ""
      ) {
        queryObject.push({ key: key, value: searchScreenObject[key].trim() });
      }
    }

    console.log(queryObject);

    const responseFromAPI = await getSearchResults(queryObject);
    // console.log(responseFromAPI);

    const getResponse = (responseFromAPI && responseFromAPI.Bill) || [];
    debugger;
    const response = [];
    for (let i = 0; i < getResponse.length; i++) {
      response[i] = {
        billNumber: get(getResponse[i], `Bill[0].billDetails[0].billNumber`),
        consumerName: get(getResponse[i], `Bill[0].payerName`),
        serviceCategory: get(
          getResponse[i],
          `Bill[0].billDetails[0].businessService`
        ),
        billDate: get(getResponse[i], `Bill[0].billDetails[0].billDate`),
        billAmount: get(getResponse[i], `Bill[0].taxAndPayments[0].amountPaid`),
        status: get(getResponse[i], `Bill[0].billDetails[0].status`),
        action: getAction("status")
      };
    }

    // const response = [
    //   {
    //     billNumber: "12873873",
    //     consumerName: "Ravinder Pal Singh",
    //     serviceCategory: "Advertisement Tax",
    //     billDate: "12-04-2019",
    //     billAmount: "4500.00",
    //     status: "Paid",
    //     action: "Download Receipt"
    //   },
    //   {
    //     billNumber: "12873873",
    //     consumerName: "Ravinder Pal Singh",
    //     serviceCategory: "Advertisement Tax",
    //     billDate: "12-04-2019",
    //     billAmount: "4500.00",
    //     status: "Partial Payment",
    //     action: "pay"
    //   },
    //   {
    //     billNumber: "12873873",
    //     consumerName: "Ravinder Pal Singh",
    //     serviceCategory: "Advertisement Tax",
    //     billDate: "12-04-2019",
    //     billAmount: "4500.00",
    //     status: "Pending",
    //     action: "pay"
    //   },
    //   {
    //     billNumber: "12873873",
    //     consumerName: "Ravinder Pal Singh",
    //     serviceCategory: "Advertisement Tax",
    //     billDate: "12-04-2019",
    //     billAmount: 4500.0,
    //     status: "Expired",
    //     action: "Generate Bill"
    //   }
    // ];

    console.log("LOLOL....", response);

    try {
      let data = response.map(item => ({
        [get(textToLocalMapping, "Bill No.")]: item.billNumber || "-",
        [get(textToLocalMapping, "Consumer Name")]: item.consumerName || "-",
        [get(textToLocalMapping, "Service Category")]:
          item.serviceCategory || "-",
        [get(textToLocalMapping, "Bill Date")]:
          convertEpochToDate(item.billDate) || "-",
        [get(textToLocalMapping, "Bill Amount[INR]")]: item.billAmount || "-",
        [get(textToLocalMapping, "Status")]: item.status || "-",
        [get(textToLocalMapping, "Action")]: item.action || "-",
        tenantId: item.tenantId
      }));
      dispatch(
        handleField(
          "billSearch",
          "components.div.children.searchResults",
          "props.data",
          data
        )
      );
      dispatch(
        handleField(
          "billSearch",
          "components.div.children.searchResults",
          "props.title",
          "Search Results for Bill (" + data.length + ")"
        )
      );

      // dispatch(handleField("billSearch", "components.div.children.searchResults"));
      showHideTable(true, dispatch);
    } catch (error) {
      dispatch(toggleSnackbar(true, error.message, "error"));
      console.log(error);
    }
  }
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "billSearch",
      "components.div.children.searchResults",
      "visible",
      booleanHideOrShow
    )
  );
};

const getAction = rowData => {
  console.log("calm");
};
