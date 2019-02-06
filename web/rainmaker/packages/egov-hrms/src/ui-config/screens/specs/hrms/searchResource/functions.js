import get from "lodash/get";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../../../..//ui-utils/commons";
import { toggleSnackbarAndSetText } from "mihy-ui-framework/ui-redux/app/actions";
import { textToLocalMapping } from "./searchResults";
import { validateFields } from "../../utils";

export const searchApiCall = async (state, dispatch) => {
  showHideTable(false, dispatch);
  let queryObject = [
    {
      key: "tenantId",
      value: JSON.parse(localStorage.getItem("user-info")).tenantId
    }
  ];
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );
  const isSearchFormValid = validateFields(
    "components.div.children.searchForm.children.cardContent.children.searchFormContainer.children",
    state,
    dispatch,
    "search"
  );

  if (!isSearchFormValid) {
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
  } else {
    // Add selected search fields to queryobject
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key].trim() !== ""
      ) {
        queryObject.push({ key: key, value: searchScreenObject[key].trim() });
      }
    }
    let response = await getSearchResults(queryObject);
    // response = {
    //   Licenses: [
    //     {
    //       employeeID: "EMP-JAL-12345",
    //       name: "Ravinder Pal Singh",
    //       role: "Accountant",
    //       designation: "Junior Accountant",
    //       department: "Administration"
    //     },
    //     {
    //       employeeID: "EMP-JAL-1234",
    //       name: "Ravinder Pal Singh",
    //       role: "Accountant",
    //       designation: "Junior Accountant",
    //       department: "Administration"
    //     },
    //     {
    //       employeeID: "EMP-JAL-1234",
    //       name: "Ravinder Pal Singh",
    //       role: "Accountant",
    //       designation: "Junior Accountant",
    //       department: "Administration"
    //     },
    //     {
    //       employeeID: "EMP-JAL-1234",
    //       name: "Ravinder Pal Singh",
    //       role: "Accountant",
    //       designation: "Junior Accountant",
    //       department: "Administration"
    //     },
    //     {
    //       employeeID: "EMP-JAL-1234",
    //       name: "Ravinder Pal Singh",
    //       role: "Accountant",
    //       designation: "Junior Accountant",
    //       department: "Administration"
    //     },
    //     {
    //       employeeID: "EMP-JAL-1234",
    //       name: "Ravinder Pal Singh",
    //       role: "Accountant",
    //       designation: "Junior Accountant",
    //       department: "Administration"
    //     }
    //   ]
    // };
    try {
      let data = response.Employees.map(item => ({
        [get(textToLocalMapping, "Employee ID")]: get(item, "code", "-") || "-",
        [get(textToLocalMapping, "Name")]: get(item, "user.name", "-") || "-",
        [get(textToLocalMapping, "Role")]:
          get(item, "user.roles[0].name", "-") || "-",
        [get(textToLocalMapping, "Designation")]:
          get(item, "assignments[0].designation", "-") || "-",
        [get(textToLocalMapping, "Department")]:
          get(item, "assignments[0].department", "-") || "-"
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
          `${textToLocalMapping["Search Results for Employee"]} (${
            response.Employees.length
          })`
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
