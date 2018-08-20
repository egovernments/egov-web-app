"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _WizardComponent = require("./components/WizardComponent");

var _WizardComponent2 = _interopRequireDefault(_WizardComponent);

var _components = require("components");

var _actions = require("egov-ui-kit/redux/form/actions");

var _Forms = require("./components/Forms");

var _ReviewForm = require("modules/citizen/PropertyTax/ReviewForm");

var _ReviewForm2 = _interopRequireDefault(_ReviewForm);

var _FloorsDetails = require("./components/Forms/FloorsDetails");

var _FloorsDetails2 = _interopRequireDefault(_FloorsDetails);

var _PlotDetails = require("./components/Forms/PlotDetails");

var _PlotDetails2 = _interopRequireDefault(_PlotDetails);

var _assessInfoFormManager = require("./utils/assessInfoFormManager");

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _MultipleOwnerInfo = require("./components/Forms/MultipleOwnerInfo");

var _MultipleOwnerInfo2 = _interopRequireDefault(_MultipleOwnerInfo);

var _reactRedux = require("react-redux");

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _utils = require("egov-ui-kit/redux/form/utils");

var _api = require("egov-ui-kit/utils/api");

var _commons = require("egov-ui-kit/utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _range = require("lodash/range");

var _range2 = _interopRequireDefault(_range);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormWizard = function (_Component) {
  (0, _inherits3.default)(FormWizard, _Component);

  function FormWizard() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FormWizard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FormWizard.__proto__ || Object.getPrototypeOf(FormWizard)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selected: 0,
      ownerInfoArr: [],
      showOwners: false,
      formValidIndexArray: [],
      ownersCount: 0,
      draftRequest: {
        "draft": {
          "tenantId": localStorage.getItem("tenant-id"),
          "userId": (0, _get2.default)(JSON.parse(localStorage.getItem("user-info")), "id"),
          "draftRecord": {}
        }
      }
    }, _this.updateDraftinLocalStorage = function (draftInfo) {
      localStorage.setItem("draftId", draftInfo.id);
      _this.setState({
        draftRequest: { draft: draftInfo }
      });
    }, _this.callDraft = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var formArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var _this$state, draftRequest, selected, form, draftResponse, draftInfo, _draftResponse, _draftInfo;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$state = _this.state, draftRequest = _this$state.draftRequest, selected = _this$state.selected;
                // if (formArray) {

                form = _this.props.form;

                if (draftRequest.draft.id) {
                  _context.next = 17;
                  break;
                }

                draftRequest.draft.draftRecord = (0, _extends3.default)({
                  selectedTabIndex: selected + 1
                }, form);
                _context.prev = 4;
                _context.next = 7;
                return (0, _api.httpRequest)("pt-services-v2/drafts/_create", "_cretae", [], draftRequest);

              case 7:
                draftResponse = _context.sent;
                draftInfo = draftResponse.drafts[0];

                _this.updateDraftinLocalStorage(draftInfo);
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](4);

                alert(_context.t0);

              case 15:
                _context.next = 29;
                break;

              case 17:
                draftRequest.draft.draftRecord = (0, _extends3.default)({
                  selectedTabIndex: selected + 1
                }, form);
                _context.prev = 18;
                _context.next = 21;
                return (0, _api.httpRequest)("pt-services-v2/drafts/_update", "_update", [], draftRequest);

              case 21:
                _draftResponse = _context.sent;
                _draftInfo = _draftResponse.drafts[0];

                _this.updateDraftinLocalStorage(_draftInfo);
                _context.next = 29;
                break;

              case 26:
                _context.prev = 26;
                _context.t1 = _context["catch"](18);

                alert(_context.t1);

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[4, 12], [18, 26]]);
      }));

      return function () {
        return _ref2.apply(this, arguments);
      };
    }(), _this.configOwner = function (ownersCount) {
      return (0, _form2.default)({ formKey: "ownerInfo", copyName: "ownerInfo_" + ownersCount, path: "PropertyTaxPay" })(_Forms.OwnerInformation);
    }, _this.addOwner = function () {
      var _this$state2 = _this.state,
          ownerInfoArr = _this$state2.ownerInfoArr,
          ownersCount = _this$state2.ownersCount;

      var OwnerInfoHOC = _this.configOwner(ownersCount);
      _this.setState({
        ownerInfoArr: [].concat((0, _toConsumableArray3.default)(ownerInfoArr), [{ index: ownersCount, Component: OwnerInfoHOC }]),
        ownersCount: ownersCount + 1
      });
    }, _this.configOwnersDetailsFromDraft = function (ownerFormKeys) {
      var ownerDetails = [];
      var ownersCount = -1;
      ownerFormKeys.forEach(function (key) {
        var currentOwnerIndex = key.split("_")[1];
        if (parseInt(currentOwnerIndex) > ownersCount) ownersCount = currentOwnerIndex;
        var ownerInfo = _this.configOwner(currentOwnerIndex);
        ownerDetails.push({ index: ownersCount, Component: ownerInfo });
      });
      return {
        ownerDetails: ownerDetails,
        totalowners: ownersCount
      };
    }, _this.fetchDraftDetails = function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(draftId) {
        var _this$state3, draftRequest, ownerInfoArr, draftsResponse, currentDraft, ownerFormKeys, _this$configOwnersDet, ownerDetails, totalowners, activeTab;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$state3 = _this.state, draftRequest = _this$state3.draftRequest, ownerInfoArr = _this$state3.ownerInfoArr;
                _context2.prev = 1;
                _context2.next = 4;
                return (0, _api.httpRequest)("pt-services-v2/drafts/_search", "_search", [{ key: "userId", value: 23278 }], draftRequest);

              case 4:
                draftsResponse = _context2.sent;
                currentDraft = draftsResponse.drafts.find(function (res) {
                  return res.id === draftId;
                });
                ownerFormKeys = Object.keys(currentDraft.draftRecord).filter(function (formName) {
                  return formName.indexOf("ownerInfo") !== -1;
                });
                _this$configOwnersDet = _this.configOwnersDetailsFromDraft(ownerFormKeys), ownerDetails = _this$configOwnersDet.ownerDetails, totalowners = _this$configOwnersDet.totalowners;
                activeTab = (0, _get2.default)(currentDraft, "draftRecord.selectedTabIndex", 0);

                _this.setState({
                  ownerInfoArr: ownerDetails,
                  ownersCount: totalowners,
                  formValidIndexArray: (0, _range2.default)(0, activeTab),
                  selected: activeTab
                }, function () {
                  _this.props.updatePTForms(currentDraft.draftRecord);
                  _this.onTabClick(activeTab);
                });
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](1);

                console.log(_context2.t0);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[1, 12]]);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.getAssessmentId = function (queryString) {
      console.log("queryString", queryString);
      var assessmentString = queryString.indexOf("?") !== -1 && queryString.split("?")[1].split("&").find(function (params) {
        return params.split("=")[0] === "assessmentId";
      });
      return assessmentString && assessmentString.split("=")[1];
    }, _this.handleRemoveOwner = function (index, formKey) {
      var ownerInfoArr = _this.state.ownerInfoArr;

      var updatedOwnerArr = [].concat((0, _toConsumableArray3.default)(ownerInfoArr));
      updatedOwnerArr.splice(ownerInfoArr.findIndex(function (ownerData) {
        return ownerData.index === index;
      }), 1);
      _this.setState({
        ownerInfoArr: updatedOwnerArr
      });
      _this.props.deleteForm(formKey);
    }, _this.renderPlotAndFloorDetails = function (fromReviewPage) {
      var _this$props$form = _this.props.form,
          basicInformation = _this$props$form.basicInformation,
          plotDetails = _this$props$form.plotDetails,
          floorDetails_0 = _this$props$form.floorDetails_0;

      if (plotDetails && floorDetails_0 && floorDetails_0.fields.builtArea) {
        var uom = plotDetails.fields && plotDetails.fields.measuringUnit && plotDetails.fields.measuringUnit.value;
        floorDetails_0.fields.builtArea.floatingLabelText = "Built Area(" + uom + ")";
      }

      if (basicInformation && basicInformation.fields.typeOfUsage.value && basicInformation.fields.typeOfBuilding.value) {
        var pathFormKeyObject = (0, _assessInfoFormManager.getPlotAndFloorFormConfigPath)(basicInformation.fields.typeOfUsage.value, basicInformation.fields.typeOfBuilding.value);
        return !(0, _isEmpty2.default)(pathFormKeyObject) ? _react2.default.createElement(
          "div",
          null,
          pathFormKeyObject.hasPlot && _react2.default.createElement(_PlotDetails2.default, { component: pathFormKeyObject.plotForm, disabled: fromReviewPage }),
          pathFormKeyObject.hasFloor && _react2.default.createElement(_FloorsDetails2.default, { componentDetails: pathFormKeyObject.floorObject, disabled: fromReviewPage })
        ) : null;
      } else {
        return null;
      }
    }, _this.getConfigFromCombination = function (combination, fetchConfigurationFn) {
      var configObject = fetchConfigurationFn(combination);
      return configObject;
    }, _this.getSelectedCombination = function (form, formKey, fieldKeys) {
      return form[formKey] && form[formKey].fields && fieldKeys.reduce(function (result, current) {
        if (form[formKey].fields[current].value) {
          result += form[formKey].fields[current].value;
        } else {
          result = "";
        }
        return result;
      }, "");
    }, _this.getOwnerDetails = function (ownerType) {
      var selected = _this.state.selected;

      var isReviewPage = selected === 3;
      switch (ownerType) {
        case "IND":
          return _react2.default.createElement(_Forms.OwnerInfoHOC, { disabled: isReviewPage });
        case "MUL":
          return _react2.default.createElement(_MultipleOwnerInfo2.default, {
            addOwner: _this.addOwner,
            handleRemoveOwner: _this.handleRemoveOwner,
            ownerDetails: _this.state.ownerInfoArr,
            disabled: isReviewPage
          });
        case "Institution":
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_Forms.InstitutionHOC, { disabled: isReviewPage }),
            _react2.default.createElement(_Forms.InstitutionAuthorityHOC, { cardTitle: _react2.default.createElement(
                "div",
                null,
                "Details of authorised person"
              ), disabled: isReviewPage })
          );
        default:
          return null;
      }
    }, _this.renderStepperContent = function (selected, fromReviewPage) {
      var _this3 = _this,
          renderPlotAndFloorDetails = _this3.renderPlotAndFloorDetails,
          getOwnerDetails = _this3.getOwnerDetails;

      switch (selected) {
        case 0:
          return _react2.default.createElement(_Forms.PropertyAddressHOC, { disabled: fromReviewPage });
        case 1:
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_Forms.UsageInformationHOC, { disabled: fromReviewPage }),
            renderPlotAndFloorDetails(fromReviewPage)
          );
        case 2:
          var ownerType = _this.getSelectedCombination(_this.props.form, "ownershipType", ["typeOfOwnership"]);
          //const OwnerConfig = this.getConfigFromCombination("Institution", getOwnerInfoFormConfigPath);
          // const { ownerForm: Institution } = OwnerConfig;
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_Forms.OwnershipTypeHOC, { disabled: fromReviewPage }),
            getOwnerDetails(ownerType)
          );
        case 3:
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_ReviewForm2.default, {
              updateIndex: _this.updateIndex,
              stepZero: _this.renderStepperContent(0, fromReviewPage),
              stepOne: _this.renderStepperContent(1, fromReviewPage),
              stepTwo: _this.renderStepperContent(2, fromReviewPage)
            })
          );
        default:
          return null;
      }
    }, _this.updateIndex = function (index) {
      var _this4 = _this,
          callDraft = _this4.callDraft,
          pay = _this4.pay,
          estimate = _this4.estimate;
      var _this$state4 = _this.state,
          selected = _this$state4.selected,
          formValidIndexArray = _this$state4.formValidIndexArray;
      var _this$props = _this.props,
          setRoute = _this$props.setRoute,
          displayFormErrorsAction = _this$props.displayFormErrorsAction,
          form = _this$props.form;

      switch (selected) {
        //validating property address is validated
        case 0:
          var isProperyAddressFormValid = (0, _utils.validateForm)(form.propertyAddress);
          if (isProperyAddressFormValid) {
            callDraft();
            _this.setState({ selected: index, formValidIndexArray: [].concat((0, _toConsumableArray3.default)(formValidIndexArray), [selected]) });
          } else {
            displayFormErrorsAction("propertyAddress");
          }
          break;
        //validating basic information,plotdetails and if plot details having floors
        case 1:
          var basicInformation = form.basicInformation,
              plotDetails = form.plotDetails;

          if (basicInformation) {
            var isBasicInformationFormValid = (0, _utils.validateForm)(basicInformation);
            if (isBasicInformationFormValid) {
              if (plotDetails) {
                var isPlotDetailsFormValid = (0, _utils.validateForm)(plotDetails);
                if (isPlotDetailsFormValid) {
                  if ((0, _get2.default)(plotDetails, "fields.floorCount")) {
                    var floorValidation = true;
                    for (var variable in form) {
                      if (variable.search("customSelect") !== -1 || variable.search("floorDetails") !== -1) {
                        var isDynamicFormValid = (0, _utils.validateForm)(form[variable]);
                        if (!isDynamicFormValid) {
                          displayFormErrorsAction(variable);
                          floorValidation = false;
                        }
                      }
                    }
                    if (floorValidation) {
                      callDraft();
                      _this.setState({ selected: index, formValidIndexArray: [].concat((0, _toConsumableArray3.default)(formValidIndexArray), [selected]) });
                    }
                  } else {
                    callDraft();
                    _this.setState({ selected: index, formValidIndexArray: [].concat((0, _toConsumableArray3.default)(formValidIndexArray), [selected]) });
                  }
                } else {
                  displayFormErrorsAction("plotDetails");
                }
              }
            } else {
              displayFormErrorsAction("basicInformation");
            }
          }
          break;
        case 2:
          var ownershipType = form.ownershipType;

          if (ownershipType) {
            var isOwnershipTypeFormValid = (0, _utils.validateForm)(ownershipType);
            if (isOwnershipTypeFormValid) {
              var ownershipTypeSelected = (0, _get2.default)(ownershipType, "fields.typeOfOwnership.value");
              if (ownershipTypeSelected === "IND") {
                var ownerInfo = form.ownerInfo;

                var isOwnerInfoFormValid = (0, _utils.validateForm)(ownerInfo);
                if (isOwnerInfoFormValid) {
                  callDraft();
                  _this.setState({ selected: index, formValidIndexArray: [].concat((0, _toConsumableArray3.default)(formValidIndexArray), [selected]) });
                } else {
                  displayFormErrorsAction("ownerInfo");
                }
              } else if (ownershipTypeSelected === "MUL") {
                var ownerValidation = true;
                for (var _variable in form) {
                  if (_variable.search("ownerInfo_") !== -1) {
                    var _isDynamicFormValid = (0, _utils.validateForm)(form[_variable]);
                    if (!_isDynamicFormValid) {
                      displayFormErrorsAction(_variable);
                      ownerValidation = false;
                    }
                  }
                }
                if (ownerValidation) {
                  callDraft();
                  _this.setState({ selected: index, formValidIndexArray: [].concat((0, _toConsumableArray3.default)(formValidIndexArray), [selected]) });
                }
              } else if (ownershipTypeSelected === "Institution") {
                var institutionDetails = form.institutionDetails,
                    institutionAuthority = form.institutionAuthority;

                var isInstitutionDetailsFormValid = (0, _utils.validateForm)(institutionDetails);
                var institutionFormValid = true;
                if (!isInstitutionDetailsFormValid) {
                  displayFormErrorsAction("institutionDetails");
                  institutionFormValid = false;
                }
                var isInstitutionAuthorityFormValid = (0, _utils.validateForm)(institutionAuthority);
                if (!isInstitutionAuthorityFormValid) {
                  displayFormErrorsAction("institutionAuthority");
                  institutionFormValid = false;
                }
                if (institutionFormValid) {
                  callDraft();
                  _this.setState({ selected: index, formValidIndexArray: [].concat((0, _toConsumableArray3.default)(formValidIndexArray), [selected]) });
                }
              }
            } else {
              displayFormErrorsAction("ownershipType");
            }
          }

          estimate();

          break;
        case 3:
          pay();
          // setRoute("/property-tax/payment-success");
          break;
      }
      // if (index <= 3) {
      //   this.setState({ selected: index });
      // } else if (index === 4) {
      //   // setRoute("/property-tax/payment-success");
      // }
    }, _this.estimate = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var prepareFormData, estimateResponse;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              prepareFormData = _this.props.prepareFormData;
              _context3.prev = 1;
              _context3.next = 4;
              return (0, _api.httpRequest)("pt-calculator-v2/propertytax/_estimate", "_estimate", [], { CalculationCriteria: [{ assessmentYear: "2018-2-19", tenantId: localStorage.getItem("tenant-id"), property: prepareFormData.Properties[0] }] });

            case 4:
              estimateResponse = _context3.sent;

              console.log(estimateResponse);
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);

              alert(_context3.t0);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2, [[1, 8]]);
    })), _this.pay = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var prepareFormData, createPropertyResponse;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              prepareFormData = _this.props.prepareFormData;
              _context4.prev = 1;
              _context4.next = 4;
              return (0, _api.httpRequest)("pt-services-v2/property/_create", "_create", [], { Properties: prepareFormData.Properties });

            case 4:
              createPropertyResponse = _context4.sent;

              console.log(createPropertyResponse);
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);

              alert(_context4.t0);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this2, [[1, 8]]);
    })), _this.onTabClick = function (index) {
      var formValidIndexArray = _this.state.formValidIndexArray;
      // form validation checks needs to be written here

      if (formValidIndexArray.indexOf(index)) {
        _this.setState({ selected: index });
      } else {
        alert("Please fill required tabs");
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FormWizard, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var search = this.props.location.search;

      var assessmentId = this.getAssessmentId(search);
      var draftId = assessmentId || (0, _commons.fetchFromLocalStorage)("draftId");
      if (draftId) this.fetchDraftDetails(draftId);
      this.addOwner();
    }
  }, {
    key: "render",
    value: function render() {
      var renderStepperContent = this.renderStepperContent;
      var _state = this.state,
          selected = _state.selected,
          ownerInfoArr = _state.ownerInfoArr,
          formValidIndexArray = _state.formValidIndexArray;

      var fromReviewPage = selected === 3;
      return _react2.default.createElement(
        "div",
        { className: "wizard-form-main-cont" },
        _react2.default.createElement(_WizardComponent2.default, {
          content: renderStepperContent(selected, fromReviewPage),
          onTabClick: this.onTabClick,
          selected: selected,
          formValidIndexArray: formValidIndexArray,
          updateIndex: this.updateIndex,
          backLabel: "GO BACK",
          nextLabel: selected === 3 ? "PAY" : "NEXT",
          ownerInfoArr: ownerInfoArr
        })
      );
    }
  }]);
  return FormWizard;
}(_react.Component);
// import { getOwnerInfoFormConfigPath } from "./utils/ownerInfoFormManager";


var mapStateToProps = function mapStateToProps(state) {
  var _ref6 = state || {},
      form = _ref6.form,
      common = _ref6.common;

  return { form: form, prepareFormData: common.prepareFormData };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    deleteForm: function deleteForm(formKey) {
      return dispatch((0, _actions.deleteForm)(formKey));
    },
    setRoute: function setRoute(route) {
      return dispatch((0, _actions2.setRoute)(route));
    },
    displayFormErrorsAction: function displayFormErrorsAction(formKey) {
      return dispatch((0, _actions.displayFormErrors)(formKey));
    },
    updatePTForms: function updatePTForms(forms) {
      return dispatch((0, _actions.updatePTForms)(forms));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FormWizard);