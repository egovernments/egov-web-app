"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPlotAndFloorDetails = exports.validateUnitandPlotSize = exports.normalizePropertyDetails = exports.getFooterLabel = exports.getHeaderLabel = exports.getCalculationScreenData = exports.getInstituteInfo = exports.getMultipleOwnerInfo = exports.getSingleOwnerInfo = exports.getSelectedCombination = exports.getConfigFromCombination = exports.getImportantDates = exports.getTargetPropertiesDetails = exports.configOwnersDetailsFromDraft = exports.configOwner = exports.updateTotalAmount = exports.callDraft = exports.updateDraftinLocalStorage = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.addOwner = addOwner;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _form = require("../../../hocs/form");

var _form2 = _interopRequireDefault(_form);

var _api = require("../../api");

var _PTCommon = require("../../PTCommon");

var _components = require("../../../components");

var _translationNode = require("../../../utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _assessInfoFormManager = require("../../../config/forms/specs/PropertyTaxPay/utils/assessInfoFormManager");

var _lodash = require("lodash");

var _commons = require("../../../utils/commons");

var _endPoints = require("../../../utils/endPoints");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateDraftinLocalStorage = exports.updateDraftinLocalStorage = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(draftInfo, assessmentNumber, self) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            localStorage.setItem("draftId", draftInfo.id);
            self.setState({
              draftRequest: { draft: draftInfo }
            }, (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
              var _self$state, draftRequest, selected, _self$props, form, prepareFormData, assessmentNo, draftResponse, _draftInfo;

              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!assessmentNumber) {
                        _context.next = 16;
                        break;
                      }

                      _self$state = self.state, draftRequest = _self$state.draftRequest, selected = _self$state.selected;
                      _self$props = self.props, form = _self$props.form, prepareFormData = _self$props.prepareFormData;
                      assessmentNo = assessmentNumber || draftRequest.draft.assessmentNumber;

                      draftRequest.draft = (0, _extends3.default)({}, draftRequest.draft, {
                        assessmentNumber: assessmentNo,
                        draftRecord: (0, _extends3.default)({}, draftRequest.draft.draftRecord, {
                          selectedTabIndex: assessmentNumber ? selected : selected + 1
                        }, form, {
                          assessmentNumber: assessmentNo,
                          prepareFormData: prepareFormData
                        }),
                        prepareFormData: prepareFormData
                      });
                      _context.prev = 5;
                      _context.next = 8;
                      return (0, _api.httpRequest)("pt-services-v2/drafts/_update", "_update", [], draftRequest);

                    case 8:
                      draftResponse = _context.sent;
                      _draftInfo = draftResponse.drafts[0];

                      updateDraftinLocalStorage(_draftInfo);
                      _context.next = 16;
                      break;

                    case 13:
                      _context.prev = 13;
                      _context.t0 = _context["catch"](5);

                      alert(_context.t0);

                    case 16:
                      return _context.abrupt("return");

                    case 17:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, undefined, [[5, 13]]);
            })));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function updateDraftinLocalStorage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var callDraft = exports.callDraft = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(self) {
    var formArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var assessmentNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

    var _self$state2, draftRequest, selected, _self$props2, form, location, common, search, prepareFormData, financialYearFromQuery, selectedownerShipCategoryType, _getInstituteInfo, instiObj, ownerArray, draftResponse, draftInfo, assessmentNo, _draftResponse, _draftInfo2;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _self$state2 = self.state, draftRequest = _self$state2.draftRequest, selected = _self$state2.selected;
            _self$props2 = self.props, form = _self$props2.form, location = _self$props2.location, common = _self$props2.common;
            search = location.search;
            prepareFormData = {
              Properties: [].concat((0, _toConsumableArray3.default)(self.props.prepareFormData.Properties))
            };
            //toggleSpinner();

            if ((0, _lodash.get)(prepareFormData, "Properties[0].propertyDetails[0].institution", undefined)) delete prepareFormData.Properties[0].propertyDetails[0].institution;
            financialYearFromQuery = (0, _PTCommon.getFinancialYearFromQuery)();
            selectedownerShipCategoryType = (0, _lodash.get)(form, "ownershipType.fields.typeOfOwnership.value", "");

            try {
              if (financialYearFromQuery) {
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].financialYear", financialYearFromQuery);
              }
              if (selectedownerShipCategoryType === "SINGLEOWNER") {
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].owners", getSingleOwnerInfo(self));
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].ownershipCategory", (0, _lodash.get)(common, "generalMDMSDataById.SubOwnerShipCategory[" + selectedownerShipCategoryType + "].ownerShipCategory", "INDIVIDUAL"));
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", selectedownerShipCategoryType);
              } else if (selectedownerShipCategoryType === "MULTIPLEOWNERS") {
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].owners", getMultipleOwnerInfo(self));
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].ownershipCategory", (0, _lodash.get)(common, "generalMDMSDataById.SubOwnerShipCategory[" + selectedownerShipCategoryType + "].ownerShipCategory", "INDIVIDUAL"));
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", selectedownerShipCategoryType);
              } else if (selectedownerShipCategoryType.toLowerCase().indexOf("institutional") !== -1) {
                _getInstituteInfo = getInstituteInfo(self), instiObj = _getInstituteInfo.instiObj, ownerArray = _getInstituteInfo.ownerArray;

                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].owners", ownerArray);
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].institution", instiObj);
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].ownershipCategory", (0, _lodash.get)(form, "ownershipType.fields.typeOfOwnership.value", ""));
                (0, _lodash.set)(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", (0, _lodash.get)(form, "institutionDetails.fields.type.value", ""));
              }
            } catch (e) {
              alert(e);
            }

            if (draftRequest.draft.id) {
              _context3.next = 24;
              break;
            }

            draftRequest.draft.tenantId = (0, _PTCommon.getQueryValue)(search, "tenantId") || prepareFormData.Properties[0].tenantId;
            draftRequest.draft.draftRecord = {
              selectedTabIndex: selected + 1,
              prepareFormData: prepareFormData
            };
            _context3.prev = 11;
            _context3.next = 14;
            return (0, _api.httpRequest)("pt-services-v2/drafts/_create", "_cretae", [], draftRequest);

          case 14:
            draftResponse = _context3.sent;
            draftInfo = draftResponse.drafts[0];


            updateDraftinLocalStorage(draftInfo, assessmentNumber, self);
            _context3.next = 22;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](11);

            alert(_context3.t0);

          case 22:
            _context3.next = 38;
            break;

          case 24:
            assessmentNo = assessmentNumber || draftRequest.draft.assessmentNumber;

            draftRequest.draft = (0, _extends3.default)({}, draftRequest.draft, {
              assessmentNumber: assessmentNo,
              tenantId: (0, _PTCommon.getQueryValue)(search, "tenantId") || prepareFormData.Properties[0].tenantId,
              draftRecord: (0, _extends3.default)({}, draftRequest.draft.draftRecord, {
                selectedTabIndex: assessmentNumber ? selected : selected + 1,
                assessmentNumber: assessmentNo,
                prepareFormData: prepareFormData
              }),
              prepareFormData: prepareFormData
            });
            _context3.prev = 26;

            if (selected === 3) {
              draftRequest = (0, _extends3.default)({}, draftRequest, {
                draft: (0, _extends3.default)({}, draftRequest.draft, {
                  isActive: false
                })
              });
            }
            _context3.next = 30;
            return (0, _api.httpRequest)("pt-services-v2/drafts/_update", "_update", [], draftRequest);

          case 30:
            _draftResponse = _context3.sent;
            _draftInfo2 = _draftResponse.drafts[0];


            updateDraftinLocalStorage(_draftInfo2, "", self);
            _context3.next = 38;
            break;

          case 35:
            _context3.prev = 35;
            _context3.t1 = _context3["catch"](26);

            alert(_context3.t1);

          case 38:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[11, 19], [26, 35]]);
  }));

  return function callDraft(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var updateTotalAmount = exports.updateTotalAmount = function updateTotalAmount(value, isFullPayment, errorText) {
  undefined.setState({
    totalAmountToBePaid: value,
    isFullPayment: isFullPayment,
    partialAmountError: errorText
  });
};

var configOwner = exports.configOwner = function configOwner(ownersCount, component) {
  return (0, _form2.default)({ formKey: "ownerInfo", copyName: "ownerInfo_" + ownersCount, path: "PropertyTaxPay", isCoreConfiguration: true })(component);
};

function addOwner() {
  var isMultiple = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var component = arguments[1];
  var self = arguments[2];

  console.log("addOwner");
  var _self$state3 = self.state,
      ownerInfoArr = _self$state3.ownerInfoArr,
      ownersCount = _self$state3.ownersCount;

  var OwnerInfoHOC = configOwner(ownersCount, component);
  self.setState({
    ownerInfoArr: [].concat((0, _toConsumableArray3.default)(ownerInfoArr), [{ index: ownersCount, Component: OwnerInfoHOC }]),
    ownersCount: ownersCount + 1
  }, function () {
    if (isMultiple) {
      addOwner(false, component, self);
    }
  });
}

var configOwnersDetailsFromDraft = exports.configOwnersDetailsFromDraft = function configOwnersDetailsFromDraft(ownerFormKeys, component) {
  var ownerDetails = [];
  var ownersCount = 0;
  ownerFormKeys.forEach(function (key) {
    var currentOwnerIndex = parseInt(key.split("_")[1]);
    if (currentOwnerIndex >= ownersCount) ownersCount = currentOwnerIndex;
    var ownerInfo = configOwner(currentOwnerIndex, component);
    ownerDetails.push({ index: ownersCount, Component: ownerInfo });
  });
  if (!ownerDetails.length) {
    ownersCount = 0;
    var ownerInfo = configOwner(ownersCount, component);
    ownerDetails.push({ index: ownersCount, Component: ownerInfo });
  }
  return {
    ownerDetails: ownerDetails,
    totalowners: ownersCount + 1
  };
};

var convertBuiltUpAreaToSqFt = function convertBuiltUpAreaToSqFt(builtUpArea) {
  var builtUpAreaTransform = builtUpArea * 9;
  return Math.round(builtUpAreaTransform * 100) / 100;
};

var getTargetPropertiesDetails = exports.getTargetPropertiesDetails = function getTargetPropertiesDetails(propertyDetails, self) {
  var search = self.props.location.search;

  var assessmentNumber = (0, _PTCommon.getQueryValue)(search, "assessmentId");
  var selectedPropertyDetails = propertyDetails.filter(function (item) {
    return item.assessmentNumber === assessmentNumber;
  });
  // return the latest proeprty details of the selected year
  var lastIndex = 0;
  if (selectedPropertyDetails[lastIndex].propertySubType === "SHAREDPROPERTY") {
    selectedPropertyDetails[lastIndex].buildUpArea = selectedPropertyDetails[lastIndex] && selectedPropertyDetails[lastIndex].buildUpArea && convertBuiltUpAreaToSqFt(selectedPropertyDetails[lastIndex].buildUpArea);
  }
  selectedPropertyDetails[lastIndex].units = selectedPropertyDetails[lastIndex] && selectedPropertyDetails[lastIndex].units && (0, _PTCommon.convertUnitsToSqFt)(selectedPropertyDetails[lastIndex].units);
  return [selectedPropertyDetails[lastIndex]];
};

var getImportantDates = exports.getImportantDates = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(self) {
    var currentTenantId, financialYearFromQuery, ImpDatesResponse, _ImpDatesResponse$Mdm, Interest, FireCess, Rebate, Penalty, intrest, fireCess, rebate, penalty;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            currentTenantId = self.props.currentTenantId;
            financialYearFromQuery = (0, _PTCommon.getFinancialYearFromQuery)();
            _context4.prev = 2;
            _context4.next = 5;
            return (0, _api.httpRequest)(_endPoints.MDMS.GET.URL, _endPoints.MDMS.GET.ACTION, [], {
              MdmsCriteria: {
                tenantId: currentTenantId,
                moduleDetails: [{
                  moduleName: "PropertyTax",
                  masterDetails: [{
                    name: "Rebate"
                  }, {
                    name: "Penalty"
                  }, {
                    name: "Interest"
                  }, {
                    name: "FireCess"
                  }]
                }]
              }
            });

          case 5:
            ImpDatesResponse = _context4.sent;

            if (ImpDatesResponse && ImpDatesResponse.MdmsRes.PropertyTax) {
              _ImpDatesResponse$Mdm = ImpDatesResponse.MdmsRes.PropertyTax, Interest = _ImpDatesResponse$Mdm.Interest, FireCess = _ImpDatesResponse$Mdm.FireCess, Rebate = _ImpDatesResponse$Mdm.Rebate, Penalty = _ImpDatesResponse$Mdm.Penalty;
              intrest = (0, _PTCommon.findCorrectDateObj)(financialYearFromQuery, Interest);
              fireCess = (0, _PTCommon.findCorrectDateObj)(financialYearFromQuery, FireCess);
              rebate = (0, _PTCommon.findCorrectDateObj)(financialYearFromQuery, Rebate);
              penalty = (0, _PTCommon.findCorrectDateObj)(financialYearFromQuery, Penalty);

              self.setState({
                importantDates: {
                  intrest: intrest,
                  fireCess: fireCess,
                  rebate: rebate,
                  penalty: penalty
                }
              });
            }
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](2);

            alert(_context4.t0);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[2, 9]]);
  }));

  return function getImportantDates(_x8) {
    return _ref4.apply(this, arguments);
  };
}();

var getConfigFromCombination = exports.getConfigFromCombination = function getConfigFromCombination(combination, fetchConfigurationFn) {
  var configObject = fetchConfigurationFn(combination);
  return configObject;
};

var getSelectedCombination = exports.getSelectedCombination = function getSelectedCombination(form, formKey, fieldKeys) {
  return form[formKey] && form[formKey].fields && fieldKeys.reduce(function (result, current) {
    if (form[formKey].fields[current].value) {
      result += form[formKey].fields[current].value;
    } else {
      result = "";
    }
    return result;
  }, "");
};

var getSingleOwnerInfo = exports.getSingleOwnerInfo = function getSingleOwnerInfo(self) {
  var ownerInfo = self.props.form.ownerInfo;

  var ownerObj = {
    documents: [{}]
  };
  Object.keys(ownerInfo.fields).map(function (field) {
    var jsonPath = ownerInfo.fields[field].jsonPath;
    if (jsonPath.toLowerCase().indexOf("document") !== -1) {
      ownerObj.documents[0][jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = (0, _lodash.get)(ownerInfo, "fields." + field + ".value", undefined) || null;
    } else if (jsonPath.toLowerCase().indexOf("gender") !== -1) {
      ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = (0, _lodash.get)(ownerInfo, "fields." + field + ".value", undefined) || "Male";
    } else {
      ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = (0, _lodash.get)(ownerInfo, "fields." + field + ".value", undefined) || null;
    }
  });
  var ownerArray = [ownerObj];
  return ownerArray;
};

var getMultipleOwnerInfo = exports.getMultipleOwnerInfo = function getMultipleOwnerInfo(self) {
  var form = self.props.form;

  return Object.keys(form).filter(function (formkey) {
    return formkey.indexOf("ownerInfo_") !== -1;
  }).reduce(function (acc, curr, currIndex, arr) {
    var ownerData = [].concat((0, _toConsumableArray3.default)(acc));
    var currForm = form[curr];
    var ownerObj = {
      documents: [{}]
    };
    Object.keys(currForm.fields).map(function (field) {
      var jsonPath = currForm.fields[field].jsonPath;
      if (jsonPath.toLowerCase().indexOf("document") !== -1) {
        ownerObj.documents[0][jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = (0, _lodash.get)(form, curr + ".fields." + field + ".value", undefined) || null;
      } else if (jsonPath.toLowerCase().indexOf("gender") !== -1) {
        ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = (0, _lodash.get)(form, curr + ".fields." + field + ".value", undefined) || "Male";
      } else {
        ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = (0, _lodash.get)(form, curr + ".fields." + field + ".value", undefined) || null;
      }
    });
    ownerData.push(ownerObj);
    return ownerData;
  }, []);
};

var getInstituteInfo = exports.getInstituteInfo = function getInstituteInfo(self) {
  var _self$props$form = self.props.form,
      institutionAuthority = _self$props$form.institutionAuthority,
      institutionDetails = _self$props$form.institutionDetails;

  var ownerObj = {};
  var instiObj = {};
  Object.keys(institutionAuthority.fields).map(function (field) {
    var jsonPath = institutionAuthority.fields[field].jsonPath;
    ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = (0, _lodash.get)(institutionAuthority, "fields." + field + ".value", undefined) || null;
  });
  Object.keys(institutionDetails.fields).map(function (field) {
    var jsonPath = institutionDetails.fields[field].jsonPath;
    instiObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = (0, _lodash.get)(institutionDetails, "fields." + field + ".value", undefined) || null;
  });
  instiObj.designation = (0, _lodash.get)(institutionAuthority, "fields.designation.value", "");
  var ownerArray = [ownerObj];
  return { instiObj: instiObj, ownerArray: ownerArray };
};

var getFloorAndUnit = function getFloorAndUnit(floorNo, unitIndex, self) {
  var common = self.props.common;

  var floorName = (0, _lodash.get)(common, "generalMDMSDataById.Floor[" + floorNo + "].name", "");
  return floorName + " Unit - " + unitIndex;
};

var getBillingRate = function getBillingRate(id, responseArr) {
  return responseArr.filter(function (item) {
    return item.id === id;
  })[0].unitRate + "/sq yards";
};

var getCalculationScreenData = exports.getCalculationScreenData = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(billingSlabs, tenantId, self) {
    "pt-calculator-v2/billingslab/_search";
    var prepareFormData, unitsArray, mapIdWithIndex, billingSlabResponse, finalData;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            prepareFormData = self.props.prepareFormData;
            unitsArray = (0, _lodash.get)(prepareFormData, "Properties[0].propertyDetails[0].units");
            mapIdWithIndex = billingSlabs.reduce(function (res, curr) {
              var obj = {
                id: curr.split("|")[0],
                index: curr.split("|")[1]
              };
              res["mappedIds"].push(obj);
              res["idsArray"].push(curr.split("|")[0]);
              return res;
            }, { mappedIds: [], idsArray: [] });
            _context5.prev = 3;
            _context5.next = 6;
            return (0, _api.httpRequest)("pt-calculator-v2/billingslab/_search", "_search", [{ key: "id", value: mapIdWithIndex.idsArray.join(",") }, { key: "tenantId", value: tenantId }]);

          case 6:
            billingSlabResponse = _context5.sent;
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](3);

            alert(_context5.t0.message);

          case 12:
            finalData = mapIdWithIndex.mappedIds.reduce(function (res, curr) {
              var floorNo = unitsArray[curr.index].floorNo;

              if (res.floorObj.hasOwnProperty(floorNo)) {
                res.floorObj[floorNo]++;
              } else {
                res.floorObj[floorNo] = 1;
              }
              var obj = {
                label: getFloorAndUnit(floorNo, res.floorObj[floorNo], self),
                value: getBillingRate(curr.id, billingSlabResponse.billingSlab),
                floorNo: floorNo
              };
              res.data.push(obj);
              return res;
            }, { floorObj: {}, unitIndex: 1, data: [] });

            finalData.data.sort(function (item1, item2) {
              return item1.floorNo - item2.floorNo;
            });
            return _context5.abrupt("return", finalData);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[3, 9]]);
  }));

  return function getCalculationScreenData(_x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

var getHeaderLabel = exports.getHeaderLabel = function getHeaderLabel(selected, role) {
  switch (selected) {
    case 0:
      return _react2.default.createElement(_translationNode2.default, {
        containerStyle: { marginTop: 12 },
        fontSize: "16px",
        color: "#484848",
        label: role === "citizen" ? "PT_FORM1_HEADER_MESSAGE" : "PT_EMP_FORM1_HEADER_MESSAGE"
      });
    case 1:
      return _react2.default.createElement(_translationNode2.default, {
        containerStyle: { marginTop: 12 },
        fontSize: "16px",
        color: "#484848",
        label: role === "citizen" ? "PT_FORM2_HEADER_MESSAGE" : "PT_EMP_FORM2_HEADER_MESSAGE"
      });
    case 2:
      return _react2.default.createElement(_translationNode2.default, {
        containerStyle: { marginTop: 12 },
        fontSize: "16px",
        color: "#484848",
        label: role === "citizen" ? "PT_FORM3_HEADER_MESSAGE" : "PT_EMP_FORM3_HEADER_MESSAGE"
      });
    case 3:
      return _react2.default.createElement(_translationNode2.default, {
        containerStyle: { marginTop: 12 },
        fontSize: "16px",
        color: "#484848",
        label: role === "citizen" ? "PT_FORM4_HEADER_MESSAGE" : "PT_EMP_FORM4_HEADER_MESSAGE"
      });
    case 4:
      return _react2.default.createElement(_translationNode2.default, {
        containerStyle: { marginTop: 12 },
        fontSize: "16px",
        color: "#484848",
        label: role === "citizen" ? "PT_FORM1_HEADER_MESSAGE" : "PT_EMP_FORM5_HEADER_MESSAGE"
      });
  }
};

var getFooterLabel = exports.getFooterLabel = function getFooterLabel(selected) {
  //needs to be in utils
  if (selected === 0) {
    return _react2.default.createElement(
      "div",
      {
        className: "rainmaker-displayInline",
        style: { padding: "12px 0px 12px 16px", border: "1px solid #5aaafa", borderLeft: "5px solid #5aaafa" }
      },
      _react2.default.createElement(_components.Icon, { action: "action", name: "info", color: "#30588c" }),
      _react2.default.createElement(_translationNode2.default, { containerStyle: { marginLeft: 16 }, fontSize: "14px", color: "#484848", label: "PT_FORM1_INFORMATION_MESSAGE" })
    );
  }
};

var normalizePropertyDetails = exports.normalizePropertyDetails = function normalizePropertyDetails(properties, self) {
  var search = self.props.location.search;

  var propertyInfo = (0, _commons.trimObj)(JSON.parse(JSON.stringify(properties)));
  var property = propertyInfo[0] || {};
  var propertyDetails = property.propertyDetails;

  var isReassesment = !!(0, _PTCommon.getQueryValue)(search, "isReassesment");
  var propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId");
  var units = propertyDetails[0] && propertyDetails[0].units ? propertyDetails[0].units.filter(function (item, ind) {
    return item !== null;
  }) : [];
  if (isReassesment && propertyId) {
    property.propertyId = propertyId;
  }
  var sumOfUnitArea = 0;
  units.forEach(function (unit) {
    var unitAreaInSqYd = parseFloat(unit.unitArea) / 9;
    unit.unitArea = Math.round(unitAreaInSqYd * 1000) / 1000;
    sumOfUnitArea += unit.unitArea;
  });
  if (propertyDetails[0].propertySubType === "SHAREDPROPERTY") {
    propertyDetails[0].buildUpArea = sumOfUnitArea;
  }
  propertyDetails[0].units = units;

  if (window.appOverrides) {
    window.appOverrides.submitForm(propertyInfo);
  }

  return propertyInfo;
};

var validateUnitandPlotSize = exports.validateUnitandPlotSize = function validateUnitandPlotSize(plotDetails, form) {
  //needs to be in utils
  var isValid = true;
  Object.keys(form).forEach(function (formKey, ind) {
    if (formKey.startsWith("customSelect_")) {
      var floorCardIndex = formKey.split("_")[1];
      var fields = form[formKey].fields;

      var floorNo = fields.floorName.value;
      var unitTotal = Object.keys(form).reduce(function (unitTotal, key) {
        if (key.startsWith("floorDetails_" + floorCardIndex + "_")) {
          var form1 = form[key];
          if (form1 && form1.fields.builtArea.value) {
            unitTotal += parseFloat(form1.fields.builtArea.value);
          }
        }
        return unitTotal;
      }, 0);
      var plotSizeInFt = parseFloat(plotDetails.fields.plotSize.value) * 9;
      if (unitTotal > plotSizeInFt) {
        alert("Total area of floor " + floorNo + " has exceeded the plot size");
        isValid = false;
      }
    }
  });
  return isValid;
};

var renderPlotAndFloorDetails = exports.renderPlotAndFloorDetails = function renderPlotAndFloorDetails(fromReviewPage, PlotComp, FloorComp, self) {
  var _self$props$form2 = self.props.form,
      basicInformation = _self$props$form2.basicInformation,
      plotDetails = _self$props$form2.plotDetails,
      floorDetails_0 = _self$props$form2.floorDetails_0;

  if (plotDetails && floorDetails_0 && floorDetails_0.fields.builtArea) {
    var uom = plotDetails.fields && plotDetails.fields.measuringUnit && plotDetails.fields.measuringUnit.value;
    floorDetails_0.fields.builtArea.floatingLabelText = "Built Area(" + uom + ")";
  }

  if (basicInformation && basicInformation.fields.typeOfUsage.value && basicInformation.fields.typeOfBuilding.value) {
    var pathFormKeyObject = (0, _assessInfoFormManager.getPlotAndFloorFormConfigPath)(basicInformation.fields.typeOfUsage.value, basicInformation.fields.typeOfBuilding.value);
    return !(0, _lodash.isEmpty)(pathFormKeyObject) ? _react2.default.createElement(
      "div",
      null,
      pathFormKeyObject.hasPlot && _react2.default.createElement(PlotComp, { component: pathFormKeyObject.plotForm, disabled: fromReviewPage }),
      pathFormKeyObject.hasFloor && _react2.default.createElement(FloorComp, { componentDetails: pathFormKeyObject.floorObject, disabled: fromReviewPage })
    ) : null;
  } else {
    return null;
  }
};