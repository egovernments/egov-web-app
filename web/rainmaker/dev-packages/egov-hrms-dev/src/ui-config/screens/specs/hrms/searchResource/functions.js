import get from "lodash/get";
import find from "lodash/find";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults } from "../../../../..//ui-utils/commons";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { textToLocalMapping } from "./searchResults";
import { validateFields } from "../../utils";

export const getDeptName = (state, codes) => {
  let deptMdmsData = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreenMdmsData.common-masters.Department",
    []
  );
  let codeNames = codes.map(code => {
    return get(find(deptMdmsData, { code: code }), "name", "");
  });
  return codeNames.join();
};

export const getDesigName = (state, codes) => {
  let desigMdmsData = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreenMdmsData.common-masters.Designation",
    []
  );
  let codeNames = codes.map(code => {
    return get(find(desigMdmsData, { code: code }), "name", "");
  });
  return codeNames.join();
};

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
      toggleSnackbar(
        true,
        "Please fill valid fields to start search",
        "warning"
      )
    );
  } else if (
    Object.keys(searchScreenObject).length == 0 ||
    Object.values(searchScreenObject).every(x => x.trim() === "")
  ) {
    dispatch(
      toggleSnackbar(
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
      let data = response.Employees.map(item => {
        // GET ALL CURRENT DESIGNATIONS OF EMPLOYEE
        let currentDesignations = get(item, "assignments", [])
          .filter(assignment => {
            return assignment.isCurrentAssignment;
          })
          .map(assignment => {
            return assignment.designation;
          });

        // GET ALL CURRENT DEPARTMENTS OF EMPLOYEE
        let currentDepartments = get(item, "assignments", [])
          .filter(assignment => {
            return assignment.isCurrentAssignment;
          })
          .map(assignment => {
            return assignment.department;
          });

        // console.log(getDeptName(state, currentDepartments));
        return {
          [get(textToLocalMapping, "Employee ID")]:
            get(item, "code", "-") || "-",
          [get(textToLocalMapping, "Name")]: get(item, "user.name", "-") || "-",
          [get(textToLocalMapping, "Role")]:
            get(item, "user.roles", [])
              .map(role => {
                return ` ${role.name}`;
              })
              .join() || "-",
          [get(textToLocalMapping, "Designation")]:
            getDesigName(state, currentDesignations) || "-",
          [get(textToLocalMapping, "Department")]:
            getDeptName(state, currentDepartments) || "-"
        };
      });

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
      dispatch(toggleSnackbar(true, error.message, "error"));
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
