import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../../../../ui-utils/commons";
import { convertEpochToDate, convertDateToEpoch } from "../../utils/index";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { textToLocalMapping } from "./searchResults";
import { validateFields } from "../../utils";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";

// const tenantId = JSON.parse(getUserInfo()).tenantId;
const tenantId = "pb.amritsar";

export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);

  let queryObject = [
    {
      key: "tenantId",
      value: tenantId
    },
    // { key: "limit", value: "10" },
    { key: "offset", value: "0" }
  ];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  const isSearchBoxFirstRowValid = validateFields(
    "components.div.children.UCSearchCard.children.cardContent.children.searchContainer.children",
    state,
    dispatch,
    "search"
  );
  if (!(isSearchBoxFirstRowValid)) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields to start search",
          labelKey: "UC_SEARCH_SELECT_VALID_ONE_TOAST_MESSAGE"
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
          labelKey: "UC_SEARCH_SELECT_AT_LEAST_ONE_TOAST_MESSAGE"
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
        } else {
          queryObject.push({ key: key, value: searchScreenObject[key].trim() });
        }
      }
    }

    console.log(queryObject);

    const responseFromAPI = await getSearchResults(queryObject);
    console.log(responseFromAPI);
   
     const Receipt=responseFromAPI && responseFromAPI.Receipt || [];
     const response=[];
     for(let i=0;i<Receipt.length;i++)
      {
        response[i]= {
            receiptNumber:get(Receipt[i],`receiptNumber`),
            payeeName:get(Receipt[i],`Bill[0].payerName`),
            serviceType:get(Receipt[i],`Bill[0].billDetails[0].businessService`),
           date:Receipt[i].receiptDate,
           amount:Receipt[i].Bill[0].billDetails[0].amountPaid,
           status:Receipt[i].Bill[0].billDetails[0].status




        }


      }
  
      console.log(response)
   
    
    try {
      let data = response.map(item => ({
        [get(textToLocalMapping, "Receipt No.")]:
          item.receiptNumber || "-",
          [get(textToLocalMapping, "Payee Name")]:
          item.payeeName|| "-",
          [get(textToLocalMapping, "Service Type")]:
          item.serviceType || "-", 
         [get(textToLocalMapping, "Date")]:
          convertEpochToDate(item. date) || "-",
          [get(textToLocalMapping, "Amount[INR]")]:
          item.amount || "-", 
        [get(textToLocalMapping, "Status")]: item.status || "-",
        tenantId: item.tenantId,
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
           "Search Results for Receipt ("+ data.length +")"
           
        )
      );

      dispatch(
        handleField(
          "search",
          "components.div.children.searchResults",
        )
      );
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
      "search",
      "components.div.children.searchResults",
      "visible",
      booleanHideOrShow
    )
  );
};