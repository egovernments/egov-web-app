"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends32 = require("babel-runtime/helpers/extends");

var _extends33 = _interopRequireDefault(_extends32);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = {
  form: {},
  files: [],
  msg: "",
  toastMsg: "",
  dialogOpen: false,
  snackbarOpen: false,
  fieldErrors: {},
  isFormValid: false,
  validationData: {},
  validatePropertyOwner: {},
  validatePropertyFloor: {},
  showTable: false,
  buttonText: "Search",
  editIndex: -1,
  isSuccess: false,
  isError: false,
  isOwnerValid: false,
  isFloorValid: false,
  noOfFloors: 0,
  hasDemandError: false,
  isDatesValid: {
    type: "",
    error: false
  },
  isPrimaryOwner: "PrimaryOwner",
  hasGuidanceBoundries: false
};

function validate(isRequired, pattern, name, value, validationData, fielderrorMsg) {
  var errorText = "";
  if (isRequired) {
    if (value.toString().trim().length > 0) {
      if (_lodash2.default.indexOf(validationData.required.current, name) === -1) {
        validationData.required.current.push(name);
      }
    } else {
      validationData.required.current = _lodash2.default.remove(validationData.required.current, function (item) {
        return item !== name;
      });
      errorText = "This field is required";
    }
  }
  if (pattern.toString().trim().length > 0) {
    if (value !== "") {
      if (pattern.test(value)) {
        //when pattern succeeds, remove it from pattern current array
        validationData.pattern.current = _lodash2.default.remove(validationData.pattern.current, function (item) {
          return item !== name;
        });
      } else if (pattern === "/^[0-9]+$/") {
        //when pattern fails, add it in pattern current array
        if (_lodash2.default.indexOf(validationData.pattern.current, name) === -1) {
          validationData.pattern.current.push(name);
        }
        errorText = "It expects numeric only";
      } else {
        validationData.required.current = _lodash2.default.remove(validationData.required.current, function (item) {
          return item !== name;
        });
        //when pattern fails, add it in pattern current array
        if (_lodash2.default.indexOf(validationData.pattern.current, name) === -1) {
          validationData.pattern.current.push(name);
        }
        //Get cusom message and show it
        errorText = fielderrorMsg ? fielderrorMsg : "Invalid field data";
      }
    } else {
      validationData.pattern.current = _lodash2.default.remove(validationData.pattern.current, function (item) {
        return item != name;
      });
    }
  }
  if (!isRequired && value === "") {
    errorText = "";
  }
  return {
    errorText: errorText,
    validationData: validationData,
    isFormValid: validationData.required.required.length === validationData.required.current.length && (validationData.pattern ? validationData.pattern.current.length === 0 : true)
  };
}

function validate2(isRequired, pattern, name, value, validatePropertyOwner) {
  var errorText = "";
  if (isRequired) {
    if (value.length || value) {
      if (_lodash2.default.indexOf(validatePropertyOwner.required.current, name) === -1) {
        validatePropertyOwner.required.current.push(name);
      }
    } else {
      validatePropertyOwner.required.current = _lodash2.default.remove(validatePropertyOwner.required.current, function (item) {
        return item != name;
      });
      errorText = "This field is required";
    }
  }

  if (!value.match(/[a-z]/i)) {
    if (value.match(/^\d+$/) && parseInt(value) > 0) {} else {
      validatePropertyOwner.required.current = _lodash2.default.remove(validatePropertyOwner.required.current, function (item) {
        return item != name;
      });

      errorText = "Invalid field data";
    }
  }

  if (pattern.toString().length > 0) {
    if (value !== "") {
      if (pattern.test(value)) {
        // if (_.indexOf(validationData.pattern.current, name) == -1) {
        //   validationData.pattern.current.push(name);
        // }
      } else if (pattern === "/^[0-9]+$/") {
        validatePropertyOwner.required.current = _lodash2.default.remove(validatePropertyOwner.required.current, function (item) {
          return item != name;
        });
        // validationData.pattern.current = _.remove(validationData.pattern.current, (item) => {
        //   return item != name
        // });
        errorText = "It expects numeric only";
      } else {
        validatePropertyOwner.required.current = _lodash2.default.remove(validatePropertyOwner.required.current, function (item) {
          return item != name;
        });
        // validationData.pattern.current = _.remove(validationData.pattern.current, (item) => {
        //   return item != name
        // });
        errorText = "Invalid field data";
      }
    }
  }
  if (!isRequired && value === "") {
    errorText = "";
  }
  // console.log(validationData.required.required)
  // console.log(validationData.required.current)
  // var isFormValid=false;
  // (validationData.required.required.length == validationData.required.current.length) && (validationData.pattern.required.length == validationData.pattern.current.length)
  console.log(validatePropertyOwner.required.required.length, validatePropertyOwner.required.current.length, errorText);
  return {
    errorText: errorText,
    validatePropertyOwner: validatePropertyOwner,
    isOwnerValid: validatePropertyOwner.required.required.length == validatePropertyOwner.required.current.length && errorText == ""
  };
}

function validate3(isRequired, pattern, name, value, validatePropertyFloor, floordata) {
  var errorText = "";
  if (isRequired) {
    if (value.length || value) {
      if (_lodash2.default.indexOf(validatePropertyFloor.required.current, name) === -1) {
        validatePropertyFloor.required.current.push(name);
      }
    } else {
      validatePropertyFloor.required.current = _lodash2.default.remove(validatePropertyFloor.required.current, function (item) {
        return item != name;
      });
      errorText = "This field is required";
    }
  }
  if (pattern.toString().length > 0) {
    if (value !== "") {
      if (pattern.test(value)) {
        // if (_.indexOf(validationData.pattern.current, name) == -1) {
        //   validationData.pattern.current.push(name);
        // }
      } else if (pattern === "/^[0-9]+$/") {
        validatePropertyFloor.required.current = _lodash2.default.remove(validatePropertyFloor.required.current, function (item) {
          return item !== name;
        });
        // validationData.pattern.current = _.remove(validationData.pattern.current, (item) => {
        //   return item != name
        // });
        errorText = "It expects numeric only";
      } else {
        validatePropertyFloor.required.current = _lodash2.default.remove(validatePropertyFloor.required.current, function (item) {
          return item !== name;
        });
        // validationData.pattern.current = _.remove(validationData.pattern.current, (item) => {
        //   return item != name
        // });
        errorText = "Invalid field data";
      }
    }
  }
  if (!isRequired && value === "") {
    errorText = "";
  }

  // console.log(validationData.required.required)
  // console.log(validationData.required.current)
  // var isFormValid=false;
  // (validationData.required.required.length == validationData.required.current.length) && (validationData.pattern.required.length == validationData.pattern.current.length)
  console.log(validatePropertyFloor.required.required.length, validatePropertyFloor.required.current.length);
  return {
    errorText: errorText,
    validatePropertyFloor: validatePropertyFloor,
    isFloorValid: validatePropertyFloor.required.required.length === validatePropertyFloor.required.current.length && errorText == ""
  };
}

function validateFileField(isRequired, code, files, validationData, errorMsg) {
  var errorText = "";
  if (isRequired) {
    if (files && files.length > 0) {
      if (_lodash2.default.indexOf(validationData.required.current, code) === -1) {
        validationData.required.current.push(code);
      }
    } else {
      validationData.required.current = _lodash2.default.remove(validationData.required.current, function (item) {
        return item !== code;
      });
      errorText = errorMsg || "This document is required";
    }
  }

  return {
    errorText: errorText,
    validationData: validationData,
    isFormValid: validationData.required.required.length === validationData.required.current.length && (validationData.pattern ? validationData.pattern.current.length === 0 : true)
  };
}

function validateCollection(addDemand) {
  var hasError = false;
  var demands = [];
  var collections = [];

  for (var key in addDemand) {
    if (addDemand.hasOwnProperty(key)) {
      if (key.match("collections")) {
        collections.push(addDemand[key]);
      } else {
        demands.push(addDemand[key]);
      }
    }
  }

  for (var i = 0; i < collections.length; i++) {
    var count = 0;
    for (var key in collections[i]) {
      if (collections[i][key] && demands[i]["demand" + count] && Number(collections[i][key]) > Number(demands[i]["demand" + count])) {
        hasError = true;
        return hasError;
      } else if (Number(collections[i][key]) > 0 && (demands[i]["demand" + count] == null || demands[i]["demand" + count] == "")) {
        hasError = true;
        return hasError;
      } else {
        hasError = false;
      }
      count++;
    }
  }

  return hasError;
}

function validateDates(floordata, type) {
  var error = false;

  if (type == "constructionStartDate" && floordata.hasOwnProperty("floor") && floordata.floor.hasOwnProperty("constructionStartDate") && (floordata.floor.hasOwnProperty("constCompletionDate") || floordata.floor.hasOwnProperty("occupancyDate"))) {
    if (floordata.floor.hasOwnProperty("constCompletionDate") && new Date(floordata.floor.constructionStartDate) > new Date(floordata.floor.constCompletionDate)) {
      error = true;
    } else if (floordata.floor.hasOwnProperty("occupancyDate") && new Date(floordata.floor.occupancyDate) < new Date(floordata.floor.constructionStartDate)) {
      error = true;
    }
  } else if (type == "constCompletionDate" && floordata.hasOwnProperty("floor") && floordata.floor.hasOwnProperty("constCompletionDate") && (floordata.floor.hasOwnProperty("constructionStartDate") || floordata.floor.hasOwnProperty("occupancyDate"))) {
    if (floordata.floor.hasOwnProperty("constructionStartDate") && new Date(floordata.floor.constructionStartDate) > new Date(floordata.floor.constCompletionDate)) {
      error = true;
    } else if (floordata.floor.hasOwnProperty("occupancyDate") && new Date(floordata.floor.occupancyDate) < new Date(floordata.floor.constCompletionDate)) {
      error = true;
    }
  } else if (type == "occupancyDate" && floordata.hasOwnProperty("floor") && floordata.floor.hasOwnProperty("occupancyDate") && (floordata.floor.hasOwnProperty("constructionStartDate") || floordata.floor.hasOwnProperty("constCompletionDate"))) {
    if (floordata.floor.hasOwnProperty("constructionStartDate") && new Date(floordata.floor.occupancyDate) < new Date(floordata.floor.constructionStartDate)) {
      error = true;
    } else if (floordata.floor.hasOwnProperty("constCompletionDate") && new Date(floordata.floor.occupancyDate) < new Date(floordata.floor.constCompletionDate)) {
      error = true;
    }
  }

  return error = {
    type: type,
    error: error
  };
}

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case "HAS_GUIDANCE_BOUNDRIES":
      return (0, _extends33.default)({}, state, {
        hasGuidanceBoundries: action.status
      });

    case "HANDLE_PRIMARY_OWNER":
      return (0, _extends33.default)({}, state, {
        isPrimaryOwner: action.isPrimaryOwner
      });

    case "VALIDATE_DATES":
      var _validationData = validateDates(state.form, action.propertyOne);
      return (0, _extends33.default)({}, state, {
        isDatesValid: _validationData
      });

    case "VALIDATE_COLLECTION":
      var _validationData = validateCollection(state.form);
      return (0, _extends33.default)({}, state, {
        hasDemandError: _validationData
      });

    case "ADD_REQUIRED":
      var b = state.validationData.required.required.indexOf(action.property);
      if (b === -1) {
        state.validationData.required.required.push(action.property);
      }

      return (0, _extends33.default)({}, state);

    case "REMOVE_REQUIRED":
      var a = state.validationData.required.required.indexOf(action.property);
      var b = state.validationData.required.current.indexOf(action.property);

      if (a != -1) {
        state.validationData.required.required.splice(a, 1);
      }

      if (b != -1) {
        state.validationData.required.current.splice(b, 1);
      }

      return (0, _extends33.default)({}, state);

    case "FLOOR_NUMBERS":
      return (0, _extends33.default)({}, state, {
        noOfFloors: action.noOfFloors
      });

    case "ADD_FLOOR_REQUIRED":
      var b = state.validatePropertyFloor.required.required.indexOf(action.property);
      if (b === -1) {
        state.validatePropertyFloor.required.required.push(action.property);
      }

      return (0, _extends33.default)({}, state);

    case "REMOVE_FLOOR_REQUIRED":
      var a = state.validatePropertyFloor.required.required.indexOf(action.property);
      var b = state.validatePropertyFloor.required.current.indexOf(action.property);

      console.log("isthere", a);
      if (a !== -1) {
        state.validatePropertyFloor.required.required.splice(a, 1);
      }

      if (b !== -1) {
        state.validatePropertyFloor.required.current.splice(b, 1);
      }

      return (0, _extends33.default)({}, state);

    case "PUSH_ONE":
      if (!state.form.hasOwnProperty(action.formArray)) {
        state.form[action.formArray] = [];
      }

      return (0, _extends33.default)({}, state, {
        form: (0, _extends33.default)({}, state.form, (0, _defineProperty3.default)({}, action.formArray, [].concat((0, _toConsumableArray3.default)(state.form[action.formArray]), [state.form[action.formData]])))
      });

    case "RESET_FORM":
      return (0, _extends33.default)({}, state, {
        form: {},
        hasGuidanceBoundries: false,
        validationData: {
          required: {
            current: [],
            required: []
          },
          pattern: {
            current: [],
            required: []
          }
        }
      });

    case "RESET_OBJECT":
      return (0, _extends33.default)({}, state, {
        form: (0, _extends33.default)({}, state.form, (0, _defineProperty3.default)({}, action.object, null)),
        isOwnerValid: action.isSectionValid,
        isFloorValid: action.isSectionValid,
        validatePropertyOwner: action.validatePropertyOwner,
        validatePropertyFloor: action.validatePropertyFloor
      });

    case "EMPTY_PROPERTY":
      return (0, _extends33.default)({}, state, {
        form: (0, _extends33.default)({}, state.form, (0, _defineProperty3.default)({}, action.property, null)),
        validationData: action.validationData,
        isFormValid: action.isFormValid
      });

    case "UPDATE_OBJECT":
      state.form[action.objectName][state.editIndex] = state.form[action.object];

      return (0, _extends33.default)({}, state, {
        form: (0, _extends33.default)({}, state.form, (0, _defineProperty3.default)({}, action.objectName, state.form[action.objectName].map(function (e, i) {
          return e;
        })))
      });

    case "EDIT_OBJECT":
      return (0, _extends33.default)({}, state, {
        form: (0, _extends33.default)({}, state.form, (0, _defineProperty3.default)({}, action.objectName, action.object)),
        isOwnerValid: action.isSectionValid,
        isFloorValid: action.isSectionValid
      });

    case "EDIT_INDEX":
      return (0, _extends33.default)({}, state, {
        editIndex: action.index
      });

    case "DELETE_OBJECT":
      return (0, _extends33.default)({}, state, {
        form: (0, _extends33.default)({}, state.form, (0, _defineProperty3.default)({}, action.property, [].concat((0, _toConsumableArray3.default)(state.form[action.property].slice(0, action.index)), (0, _toConsumableArray3.default)(state.form[action.property].slice(action.index + 1)))))
      });

    case "SET_FORM":
      return (0, _extends33.default)({}, state, {
        form: action.data,
        files: action.files || [],
        fieldErrors: action.fieldErrors,
        validationData: action.validationData,
        isFormValid: action.isFormValid
      });

    case "SET_FORM_DATA":
      return (0, _extends33.default)({}, state, {
        form: action.formData || {}
      });
    case "SET_OWNER_STATE":
      return (0, _extends33.default)({}, state, {
        validatePropertyOwner: action.validatePropertyOwner
      });

    case "SET_FLOOR_STATE":
      return (0, _extends33.default)({}, state, {
        validatePropertyFloor: action.validatePropertyFloor
      });

    case "SET_FLOOR_NUMBER":
      console.log("noOfFloors", action.noOfFloors);
      return (0, _extends33.default)({}, state, {
        noOfFloors: action.noOfFloors
      });

    case "HANDLE_CHANGE":
      _validationData = undefined;
      _validationData = validate(action.isRequired, action.pattern, action.property, action.value, state.validationData, action.errorMsg);
      return (0, _extends33.default)({}, state, {
        form: (0, _extends33.default)({}, state.form, (0, _defineProperty3.default)({}, action.property, action.value)),
        fieldErrors: (0, _extends33.default)({}, state.fieldErrors, (0, _defineProperty3.default)({}, action.property, _validationData.errorText)),
        validationData: _validationData.validationData,
        isFormValid: _validationData.isFormValid
      });

    case "FILE_UPLOAD":
      var filearray = [];
      filearray = [].concat((0, _toConsumableArray3.default)(state.files));
      filearray.push(action.files);
      return (0, _extends33.default)({}, state, {
        files: filearray
      });

    case "FILE_EMPTY":
      return (0, _extends33.default)({}, state, {
        files: []
      });

    case "FILE_REMOVE":
      filearray = [];
      filearray = [].concat((0, _toConsumableArray3.default)(state.files));
      var _idx = -1;
      for (var _i = 0; _i < filearray.length; _i++) {
        if (filearray[_i].name === action.removefiles) {
          _idx = _i;
          break;
        }
      }
      if (_idx !== -1) {
        //remove the index idx object
        filearray.splice(_idx, 1);
      }
      return (0, _extends33.default)({}, state, {
        files: filearray
      });

    case "FILE_UPLOAD_BY_CODE":
      //this is used add file for particular field
      var filesArray = [];
      filesArray = state.files ? [].concat((0, _toConsumableArray3.default)(state.files)) : [];
      var field = filesArray.find(function (field) {
        return field.code == action.code;
      });
      var files = [];
      if (field) {
        action.files.map(function (file) {
          var isExists = field.files.find(function (existingFile) {
            return existingFile.name === file.name && existingFile.size === file.size;
          });
          if (!isExists)
            //check file is not exists in the array
            files.push(file);
        });
        field.files = [].concat((0, _toConsumableArray3.default)(field.files), (0, _toConsumableArray3.default)(files));
        files = [].concat((0, _toConsumableArray3.default)(field.files));
      } else {
        filesArray.push({ code: action.code, files: action.files });
        files = action.files;
      }

      _validationData = validateFileField(action.isRequired, action.code, files, state.validationData, action.errorMsg);

      return (0, _extends33.default)({}, state, {
        files: filesArray,
        fieldErrors: (0, _extends33.default)({}, state.fieldErrors, (0, _defineProperty3.default)({}, action.code, _validationData.errorText)),
        validationData: _validationData.validationData,
        isFormValid: _validationData.isFormValid
      });

    case "FILE_REMOVE_BY_CODE":
      //this is used to remove file by code {code:'YourFieldCode', files:[{...}]}
      filearray = [];
      filearray = state.files ? [].concat((0, _toConsumableArray3.default)(state.files)) : [];

      var _validationData;
      var codePos = filearray.map(function (field) {
        return field.code;
      }).indexOf(action.code);
      var _idx = -1;

      if (codePos > -1) {
        var files = filearray[codePos].files;
        for (var _i2 = 0; _i2 < files.length; _i2++) {
          if (files[_i2].name === action.name) {
            _idx = _i2;
            break;
          }
        }

        if (_idx !== -1) {
          //remove the index idx object
          files.splice(_idx, 1);
        }

        _validationData = validateFileField(action.isRequired, action.code, files, state.validationData, action.errorMsg);

        return (0, _extends33.default)({}, state, {
          files: filearray,
          fieldErrors: (0, _extends33.default)({}, state.fieldErrors, (0, _defineProperty3.default)({}, action.code, _validationData.errorText)),
          validationData: _validationData.validationData,
          isFormValid: _validationData.isFormValid
        });
      } else return (0, _extends33.default)({}, state);

    case "HANDLE_CHANGE_NEXT_ONE":
      _validationData = undefined;
      _validationData = validate(action.isRequired, action.pattern, action.propertyOne, action.value, state.validationData);
      return (0, _extends33.default)({}, state, {
        form: (0, _extends33.default)({}, state.form, (0, _defineProperty3.default)({}, action.property, (0, _extends33.default)({}, state.form[action.property], (0, _defineProperty3.default)({}, action.propertyOne, action.value)))),
        fieldErrors: (0, _extends33.default)({}, state.fieldErrors, (0, _defineProperty3.default)({}, action.property, (0, _extends33.default)({}, state.fieldErrors[action.property], (0, _defineProperty3.default)({}, action.propertyOne, _validationData.errorText)))),
        validationData: _validationData.validationData,
        isFormValid: _validationData.isFormValid
      });

    case "HANDLE_CHANGE_OWNER":
      var validatePropertyOwner = void 0;
      console.log("state", state);
      validatePropertyOwner = validate2(action.isRequired, action.pattern, action.propertyOne, action.value, state.validatePropertyOwner);
      console.log(validatePropertyOwner);
      return (0, _extends33.default)({}, state, {
        form: (0, _extends33.default)({}, state.form, (0, _defineProperty3.default)({}, action.property, (0, _extends33.default)({}, state.form[action.property], (0, _defineProperty3.default)({}, action.propertyOne, action.value)))),
        fieldErrors: (0, _extends33.default)({}, state.fieldErrors, (0, _defineProperty3.default)({}, action.property, (0, _extends33.default)({}, state.fieldErrors[action.property], (0, _defineProperty3.default)({}, action.propertyOne, validatePropertyOwner.errorText)))),
        validatePropertyOwner: validatePropertyOwner.validatePropertyOwner,
        isOwnerValid: validatePropertyOwner.isOwnerValid
      });

    case "HANDLE_CHANGE_FLOOR":
      var validatePropertyFloor = void 0;
      console.log("state", state);
      validatePropertyFloor = validate3(action.isRequired, action.pattern, action.propertyOne, action.value, state.validatePropertyFloor, state.form);
      console.log(validatePropertyFloor);
      return (0, _extends33.default)({}, state, {
        form: (0, _extends33.default)({}, state.form, (0, _defineProperty3.default)({}, action.property, (0, _extends33.default)({}, state.form[action.property], (0, _defineProperty3.default)({}, action.propertyOne, action.value)))),
        fieldErrors: (0, _extends33.default)({}, state.fieldErrors, (0, _defineProperty3.default)({}, action.property, (0, _extends33.default)({}, state.fieldErrors[action.property], (0, _defineProperty3.default)({}, action.propertyOne, validatePropertyFloor.errorText)))),
        validatePropertyFloor: validatePropertyFloor.validatePropertyFloor,
        isFloorValid: validatePropertyFloor.isFloorValid
      });

    case "HANDLE_CHANGE_NEXT_TWO":
      var _validationData = undefined;
      _validationData = validate(action.isRequired, action.pattern, action.propertyTwo, action.value, state.validationData);
      return (0, _extends33.default)({}, state, {
        form: (0, _extends33.default)({}, state.form, (0, _defineProperty3.default)({}, action.property, (0, _extends33.default)({}, state.form[action.property], (0, _defineProperty3.default)({}, action.propertyOne, (0, _extends33.default)({}, state.form[action.property][action.propertyOne], (0, _defineProperty3.default)({}, action.propertyTwo, action.value)))))),
        fieldErrors: (0, _extends33.default)({}, state.fieldErrors, (0, _defineProperty3.default)({}, action.propertyTwo, _validationData.errorText)),
        validationData: _validationData.validationData,
        isFormValid: _validationData.isFormValid
      });

    case "ADD_MANDATORY":
      var obj = state.validationData;
      if (!obj.required.required.includes(action.property)) {
        obj.required.required.push(action.property);
        if (action.pattern.toString().length > 0) obj.pattern.required.push(action.property);
        return (0, _extends33.default)({}, state, {
          validationData: obj
        });
      } else {
        return (0, _extends33.default)({}, state);
      }

    case "ADD_MANDATORY_FIELDS":
      var obj = (0, _extends33.default)({}, state.validationData);
      var fieldErrors = (0, _extends33.default)({}, state.fieldErrors);
      var _validationData = (0, _extends33.default)({}, state.validationData);

      for (var i = 0; i < action.fields.length; i++) {
        var field = action.fields[i];
        if (!obj.required.required.includes(field.property)) {
          obj.required.required.push(field.property);
          if (field.pattern.toString().length > 0) obj.pattern.required.push(field.property);
          _validationData = validate(field.isRequired, field.pattern, field.property, field.value, obj, field.errorMsg);
          fieldErrors[field.property] = _validationData.errorText;
        }
      }

      return (0, _extends33.default)({}, state, {
        fieldErrors: fieldErrors,
        validationData: _validationData.validationData,
        isFormValid: _validationData.isFormValid
      });

    case "ADD_MANDATORY_LATEST":
      var obj = state.validationData;
      if (!obj.required.required.includes(action.property)) {
        obj.required.required.push(action.property);
        if (action.pattern.toString().length > 0) obj.pattern.required.push(action.property);
        _validationData = validate(action.isRequired, action.pattern, action.property, action.value, obj, action.errorMsg);
        return (0, _extends33.default)({}, state, {
          fieldErrors: (0, _extends33.default)({}, state.fieldErrors, (0, _defineProperty3.default)({}, action.code, _validationData.errorText)),
          validationData: _validationData.validationData,
          isFormValid: _validationData.isFormValid
        });
      } else {
        return (0, _extends33.default)({}, state);
      }

    case "REMOVE_MANDATORY":
      var obj = state.validationData;
      if (obj.required.required.includes(action.property)) {
        var rindex = obj.required.required.indexOf(action.property);
        obj.required.required.splice(rindex, 1);
        if (obj.required.current.includes(action.property)) {
          var cindex = obj.required.current.indexOf(action.property);
          obj.required.current.splice(cindex, 1);
        }
        if (action.pattern.toString().length > 0) {
          var pindex = obj.pattern.required.indexOf(action.property);
          obj.pattern.required.splice(pindex, 1);
        }
        return (0, _extends33.default)({}, state, {
          validationData: obj
        });
      } else {
        return (0, _extends33.default)({}, state);
      }

    case "REMOVE_MANDATORY_LATEST":
      var obj = state.validationData;
      if (obj.required.required.includes(action.property)) {
        var _rindex = obj.required.required.indexOf(action.property);
        obj.required.required.splice(_rindex, 1);
        if (obj.required.current.includes(action.property)) {
          var _cindex = obj.required.current.indexOf(action.property);
          obj.required.current.splice(_cindex, 1);
        }
        if (action.pattern.toString().length > 0) {
          var _pindex = obj.pattern.required.indexOf(action.property);
          obj.pattern.required.splice(_pindex, 1);
        }
        _validationData = validate(action.isRequired, action.pattern, action.property, action.value, obj, action.errorMsg);
        return (0, _extends33.default)({}, state, {
          fieldErrors: (0, _extends33.default)({}, state.fieldErrors, (0, _defineProperty3.default)({}, action.code, _validationData.errorText)),
          validationData: _validationData.validationData,
          isFormValid: _validationData.isFormValid
        });
      } else {
        return (0, _extends33.default)({}, state);
      }

    case "PUSH_ONE_ARRAY":
      if (!state.form.hasOwnProperty(action.formObject)) {
        state.form[action.formObject] = {};
        state.form[action.formObject][action.formArray] = [];
      } else if (!state.form[action.formObject]) {
        alert("Boom2");
        state.form[action.formObject] = {};
        state.form[action.formObject][action.formArray] = [];
      } else if (!state.form[action.formObject][action.formArray]) {
        state.form[action.formObject][action.formArray] = [];
        //console.log(state.form[action.formObject]);
      }

      return (0, _extends33.default)({}, state, {
        form: (0, _extends33.default)({}, state.form, (0, _defineProperty3.default)({}, action.formObject, (0, _extends33.default)({}, state.form[action.formObject], (0, _defineProperty3.default)({}, action.formArray, [].concat((0, _toConsumableArray3.default)(state.form[action.formObject][action.formArray]), [state.form[action.formData]])))))
      });

    case "RESET_STATE":
      return {
        form: {},
        hasGuidanceBoundries: false,
        files: [],
        fieldErrors: {},
        validationData: action.validationData,
        validatePropertyOwner: action.validatePropertyOwner,
        validatePropertyFloor: action.validatePropertyFloor,
        msg: "",
        dialogOpen: false,
        snackbarOpen: false,
        isFormValid: false,
        showTable: false,
        buttonText: "Search",
        isDatesValid: {
          error: false,
          type: ""
        },
        isPrimaryOwner: action.isPrimaryOwner
      };

    case "FIELD_ERRORS":
      return (0, _extends33.default)({}, state, {
        fieldErrors: action.errors
      });

    case "SHOW_TABLE":
      return (0, _extends33.default)({}, state, {
        showTable: action.state
      });

    case "BUTTON_TEXT":
      return (0, _extends33.default)({}, state, {
        buttonText: action.text
      });

    case "TOGGLE_DAILOG_AND_SET_TEXT":
      return (0, _extends33.default)({}, state, {
        msg: action.msg,
        dialogOpen: action.dailogState
      });

    case "TOGGLE_SNACKBAR_AND_SET_TEXT":
      return (0, _extends33.default)({}, state, {
        toastMsg: action.toastMsg,
        snackbarOpen: action.snackbarState,
        isSuccess: action.isSuccess || false,
        isError: action.isError || false
      });

    case "SET_LOADING_STATUS":
      return (0, _extends33.default)({}, state, {
        loadingStatus: action.loadingStatus
      });

    default:
      return state;
  }
};