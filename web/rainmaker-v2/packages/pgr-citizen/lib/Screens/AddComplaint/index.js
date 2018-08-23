"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _reactRedux = require("react-redux");

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _AddComplaintForm = require("./components/AddComplaintForm");

var _AddComplaintForm2 = _interopRequireDefault(_AddComplaintForm);

var _actions = require("egov-ui-kit/redux/form/actions");

var _common = require("modules/common");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComplaintFormHOC = (0, _form2.default)({ formKey: "complaint" })(_AddComplaintForm2.default);

var AddComplaints = function (_Component) {
  (0, _inherits3.default)(AddComplaints, _Component);

  function AddComplaints() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AddComplaints);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AddComplaints.__proto__ || Object.getPrototypeOf(AddComplaints)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillReceiveProps = function (nextProps) {
      var _this$props = _this.props,
          form = _this$props.form,
          handleFieldChange = _this$props.handleFieldChange;

      if (form && !form.fields.address.value) {
        if (nextProps.currentLocation && nextProps.currentLocation.address) {
          var _nextProps$currentLoc = nextProps.currentLocation,
              lat = _nextProps$currentLoc.lat,
              lng = _nextProps$currentLoc.lng,
              address = _nextProps$currentLoc.address;

          handleFieldChange("complaint", "latitude", lat);
          handleFieldChange("complaint", "longitude", lng);
          handleFieldChange("complaint", "address", address);
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AddComplaints, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          categories = _props.categories,
          localizationLabels = _props.localizationLabels;

      return _react2.default.createElement(
        _common.Screen,
        null,
        _react2.default.createElement(ComplaintFormHOC, { categories: categories, localizationLabels: localizationLabels })
      );
    }
  }]);
  return AddComplaints;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var _state$app = state.app,
      localizationLabels = _state$app.localizationLabels,
      currentLocation = _state$app.currentLocation;

  var form = state.form["complaint"];
  var categories = state.complaints.categoriesById;
  return { categories: categories, form: form, localizationLabels: localizationLabels, currentLocation: currentLocation };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleFieldChange: function handleFieldChange(formKey, fieldKey, value) {
      return dispatch((0, _actions.handleFieldChange)(formKey, fieldKey, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AddComplaints);