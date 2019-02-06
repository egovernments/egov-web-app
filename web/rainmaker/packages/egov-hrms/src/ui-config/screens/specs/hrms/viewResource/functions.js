import get from "lodash/get";
import set from "lodash/set";
import {
  createEmployee,
  updateEmployee,
  getSearchResults
} from "../../../../..//ui-utils/commons";
import {
  convertDateToEpoch,
  toggleDeactivateDialog,
  showHideAdhocPopup
} from "../../utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { epochToYmdDate } from "../../utils";

// SET ALL SIMPLE DATES IN YMD FORMAT
const setDateInYmdFormat = (obj, values) => {
  values.forEach(element => {
    set(obj, element, epochToYmdDate(get(obj, element)));
  });
};

// SET ALL MULTIPLE OBJECT DATES IN YMD FORMAT
const setAllDatesInYmdFormat = (obj, values) => {
  values.forEach(element => {
    let elemObject =
      get(obj, `${element.object}`, []) === null
        ? []
        : get(obj, `${element.object}`, []);
    for (let i = 0; i < elemObject.length; i++) {
      element.values.forEach(item => {
        set(
          obj,
          `${element.object}[${i}].${item}`,
          epochToYmdDate(get(obj, `${element.object}[${i}].${item}`))
        );
      });
    }
  });
};

// SET ALL MULTIPLE OBJECT EPOCH DATES YEARS
const setAllYears = (obj, values) => {
  values.forEach(element => {
    let elemObject =
      get(obj, `${element.object}`, []) === null
        ? []
        : get(obj, `${element.object}`, []);
    for (let i = 0; i < elemObject.length; i++) {
      element.values.forEach(item => {
        let ymd = epochToYmdDate(get(obj, `${element.object}[${i}].${item}`));
        let year = ymd ? ymd.substring(0, 4) : null;
        year && set(obj, `${element.object}[${i}].${item}`, year);
      });
    }
  });
};

const setRolesData = obj => {
  let roles = get(obj, "user.roles", []);
  let newRolesArray = [];
  roles.forEach(element => {
    newRolesArray.push({
      label: element.name,
      value: element.code
    });
  });
  set(obj, "user.roles", newRolesArray);
};

const returnEmptyArrayIfNull = value => {
  if (value === null || value === undefined) {
    return [];
  } else {
    return value;
  }
};

export const furnishEmployeeData = (state, dispatch) => {
  let employeeObject = get(
    state.screenConfiguration.preparedFinalObject,
    "Employee",
    []
  );
  setDateInYmdFormat(employeeObject[0], ["dateOfAppointment", "user.dob"]);
  setAllDatesInYmdFormat(employeeObject[0], [
    { object: "assignments", values: ["fromDate", "toDate"] },
    { object: "serviceHistory", values: ["serviceFrom", "serviceTo"] }
  ]);
  setAllYears(employeeObject[0], [
    { object: "education", values: ["yearOfPassing"] },
    { object: "tests", values: ["yearOfPassing"] }
  ]);
  setRolesData(employeeObject[0]);
  dispatch(prepareFinalObject("Employee", employeeObject));
};

export const handleCreateUpdateEmployee = (state, dispatch) => {
  let uuid = get(
    state.screenConfiguration.preparedFinalObject,
    "Employee[0].uuid",
    null
  );
  if (uuid) {
    createUpdateEmployee(state, dispatch, "UPDATE");
  } else {
    createUpdateEmployee(state, dispatch, "CREATE");
  }
};

export const createUpdateEmployee = async (state, dispatch, action) => {
  const tenantId = JSON.parse(localStorage.getItem("user-info")).tenantId;
  let queryObject = [
    {
      key: "tenantId",
      value: tenantId
    }
  ];
  let employeeObject = get(
    state.screenConfiguration.preparedFinalObject,
    "Employee",
    []
  );

  // SET TENANT IDS IF THEY DO NOT ALREADY EXIST
  !get(employeeObject[0], "tenantId") &&
    set(employeeObject[0], "tenantId", tenantId);
  !get(employeeObject[0], "user.tenantId") &&
    set(employeeObject[0], "user.tenantId", tenantId);

  //SET TENANT IDS IN ALL NEWLY ADDED JURISDICTIONS, DOESNT CHANGE ALREADY PRESENT
  let jurisdictions = returnEmptyArrayIfNull(
    get(employeeObject[0], "jurisdictions", [])
  );
  for (let i = 0; i < jurisdictions.length; i++) {
    set(employeeObject[0], `jurisdictions[${i}].tenantId`, tenantId);
  }

  set(
    employeeObject[0],
    "dateOfAppointment",
    convertDateToEpoch(get(employeeObject[0], "dateOfAppointment"))
  );
  set(
    employeeObject[0],
    "user.dob",
    convertDateToEpoch(get(employeeObject[0], "user.dob"))
  );

  let assignments = returnEmptyArrayIfNull(
    get(employeeObject[0], "assignments", [])
  );
  for (let i = 0; i < assignments.length; i++) {
    set(
      employeeObject[0],
      `assignments[${i}].fromDate`,
      convertDateToEpoch(get(employeeObject[0], `assignments[${i}].fromDate`))
    );
    set(
      employeeObject[0],
      `assignments[${i}].toDate`,
      convertDateToEpoch(get(employeeObject[0], `assignments[${i}].toDate`))
    );
  }

  let serviceHistory = returnEmptyArrayIfNull(
    get(employeeObject[0], "serviceHistory", [])
  );
  for (let i = 0; i < serviceHistory.length; i++) {
    set(
      employeeObject[0],
      `serviceHistory[${i}].serviceFrom`,
      convertDateToEpoch(
        get(employeeObject[0], `serviceHistory[${i}].serviceFrom`)
      )
    );
    set(
      employeeObject[0],
      `serviceHistory[${i}].serviceTo`,
      convertDateToEpoch(
        get(employeeObject[0], `serviceHistory[${i}].serviceTo`)
      )
    );
  }

  // FORMAT EDUCATION PASSING DATES TO EPOCH
  let education = returnEmptyArrayIfNull(
    get(employeeObject[0], "education", [])
  );
  for (let i = 0; i < education.length; i++) {
    let educationYearOfPassing = get(
      employeeObject[0],
      `education[${i}].yearOfPassing`
    );
    set(
      employeeObject[0],
      `education[${i}].yearOfPassing`,
      convertDateToEpoch(`${educationYearOfPassing}-01-01`)
    );
  }

  // FORMAT TESTS PASSING DATES TO EPOCH
  let tests = returnEmptyArrayIfNull(get(employeeObject[0], "tests", []));
  for (let i = 0; i < tests.length; i++) {
    let testsYearOfPassing = get(
      employeeObject[0],
      `tests[${i}].yearOfPassing`
    );
    set(
      employeeObject[0],
      `tests[${i}].yearOfPassing`,
      convertDateToEpoch(`${testsYearOfPassing}-01-01`)
    );
  }

  // PROCESS ALL ROLES IN REQUIRED FORMAT
  let roles = get(employeeObject[0], "user.roles", []);
  let processedRoles = roles.map(item => {
    return {
      code: item.value,
      name: item.label
    };
  });
  set(employeeObject[0], "user.roles", processedRoles);

  if (action === "CREATE") {
    try {
      let response = await createEmployee(queryObject, employeeObject);
      let employeeId = get(response, "Employees[0].code");
      window.location.href = `/mihy-ui-framework/hrms/acknowledgement?purpose=create&status=success&applicationNumber=${employeeId}`;
    } catch (error) {
      furnishEmployeeData(state, dispatch);
    }
  } else if (action === "UPDATE") {
    try {
      let response = await updateEmployee(queryObject, employeeObject);
      let employeeId = response && get(response, "Employees[0].code");
      window.location.href = `/mihy-ui-framework/hrms/acknowledgement?purpose=update&status=success&applicationNumber=${employeeId}`;
    } catch (error) {
      furnishEmployeeData(state, dispatch);
    }
  }
};

export const deactivateEmployeeApiCall = async (state, dispatch) => {
  const tenantId = JSON.parse(localStorage.getItem("user-info")).tenantId;
  let queryObject = [
    {
      key: "tenantId",
      value: tenantId
    }
  ];
  let employeeObject = get(
    state.screenConfiguration.preparedFinalObject,
    "Employee",
    []
  );
  set(employeeObject[0], "isActive", false);
  set(
    employeeObject[0],
    `deactivationDetails[0].effectiveFrom`,
    convertDateToEpoch(
      get(employeeObject[0], `deactivationDetails[0].effectiveFrom`)
    )
  );
  try {
    let response = await updateEmployee(queryObject, employeeObject);
    let employeeId = response && get(response, "Employees[0].code");
    window.location.href = `/mihy-ui-framework/hrms/acknowledgement?purpose=deactivate&status=success&applicationNumber=${employeeId}`;
    showHideAdhocPopup(state, dispatch);
  } catch (error) {
    // furnishEmployeeData(state, dispatch);
  }
};

export const getEmployeeData = async (state, dispatch, employeeId) => {
  let queryObject = [
    {
      key: "codes",
      value: employeeId
    }
  ];
  let response = await getSearchResults(queryObject);
  dispatch(prepareFinalObject("Employee", get(response, "Employees")));
  furnishEmployeeData(state, dispatch);
};
