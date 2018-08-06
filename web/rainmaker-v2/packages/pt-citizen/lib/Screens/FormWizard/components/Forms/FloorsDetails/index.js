"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _components = require("components");

var _reactRedux = require("react-redux");

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _CustomSelectForm = require("../CustomSelectForm");

var _CustomSelectForm2 = _interopRequireDefault(_CustomSelectForm);

var _GenericForm = require("../../GenericForm");

var _GenericForm2 = _interopRequireDefault(_GenericForm);

var _actions = require("egov-ui-kit/redux/form/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FloorDetails = function (_React$Component) {
  (0, _inherits3.default)(FloorDetails, _React$Component);

  function FloorDetails() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FloorDetails);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FloorDetails.__proto__ || Object.getPrototypeOf(FloorDetails)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      floors: _this.cacheFloors ? _this.cacheFloors : []
    }, _this.configureFloors = function (props) {
      var noFloors = props.noFloors,
          componentDetails = props.componentDetails,
          disabled = props.disabled;
      var floors = _this.state.floors;

      var updatedFloors = [].concat((0, _toConsumableArray3.default)(Array(parseInt(noFloors)))).map(function (item, key) {
        var units = [];
        var date = new Date();
        var formKey = componentDetails.copyName + "_" + key + "_unit_" + date.getTime();
        units.push({
          component: (0, _form2.default)((0, _extends3.default)({}, componentDetails, { copyName: formKey, disabled: disabled }))(_GenericForm2.default),
          formKey: formKey
        });
        return {
          floorId: key,
          floorDropDown: (0, _form2.default)({ formKey: "customSelect", makeCopy: true, copyName: "customSelect_" + key, path: "PropertyTaxPay", disabled: disabled })(_CustomSelectForm2.default),
          units: units
        };
      });
      _this.setState({
        floors: noFloors > 0 ? [].concat((0, _toConsumableArray3.default)(floors), (0, _toConsumableArray3.default)(updatedFloors)) : []
      });
      // this.updatedFloorsInCache(floors)
    }, _this.renderFloors = function (floors, noFloors) {
      var _this2 = _this,
          renderUnits = _this2.renderUnits;
      var disabled = _this.props.disabled;

      return floors.map(function (floor, key) {
        var floorId = floor.floorId,
            FloorDropDown = floor.floorDropDown,
            units = floor.units;

        return _react2.default.createElement(_components.Card, {
          key: key,
          textChildren: _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(FloorDropDown, { noFloors: noFloors }),
            _react2.default.createElement(
              "div",
              { className: "col-xs-12" },
              renderUnits(units, floorId)
            )
          )
        });
      });
    }, _this.handleAddUnit = function (floorIndex) {
      var componentDetails = _this.props.componentDetails;
      var floors = _this.state.floors;
      //Naming Units with timestamp to maintain uniqueness, untill any other alternative way is found.

      var date = new Date();
      var formKey = componentDetails.copyName + "_" + floorIndex + "_unit_" + date.getTime();
      floors[floorIndex].units.push({
        component: (0, _form2.default)((0, _extends3.default)({}, componentDetails, { copyName: formKey }))(_GenericForm2.default),
        formKey: formKey
      });
      _this.setState({
        floors: floors
      });
      // this.updatedFloorsInCache(floors)
    }, _this.handleRemoveUnit = function (floorIndex, unitIndex, formKey) {
      var floors = _this.state.floors;

      floors[floorIndex].units.splice(unitIndex, 1);
      _this.props.removeForm(formKey);
      _this.setState({
        floors: floors
      });
      // this.updatedFloorsInCache(floors)
    }, _this.renderUnits = function (units, floorId) {
      var disabled = _this.props.disabled;
      var _this3 = _this,
          handleAddUnit = _this3.handleAddUnit,
          handleRemoveUnit = _this3.handleRemoveUnit;

      return _react2.default.createElement(
        "div",
        null,
        units.map(function (unit, key) {
          var Unit = unit.component;
          return _react2.default.createElement(Unit, {
            key: key,
            className: disabled ? "grayout" : "",
            handleRemoveItem: key !== 0 ? function () {
              return handleRemoveUnit(floorId, key, unit.formKey);
            } : undefined,
            disabled: disabled
          });
        }),
        _react2.default.createElement(
          "div",
          { className: "pt-add-owner-btn", onClick: function onClick() {
              return _this.handleAddUnit(floorId);
            }, style: { color: "#fe7a51", float: "right", cursor: "pointer" } },
          "+ ADD ONE MORE UNIT"
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  // cacheFloors=JSON.parse(localStorage.getItem("floors"));


  (0, _createClass3.default)(FloorDetails, [{
    key: "componentDidMount",


    // updatedFloorsInCache=(floors)=>{
    //   localStorage.setItem("floors",JSON.stringify(floors))
    // }

    value: function componentDidMount() {
      this.configureFloors(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.noFloors !== this.props.noFloors) {
        this.configureFloors(nextProps);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var renderFloors = this.renderFloors;
      var floors = this.state.floors;
      var noFloors = this.props.noFloors;

      return _react2.default.createElement(
        "div",
        null,
        renderFloors(floors, noFloors)
      );
    }
  }]);
  return FloorDetails;
}(_react2.default.Component);
// import DynamicForm from "../../DynamicForm";


var mapStateToProps = function mapStateToProps(_ref2) {
  var form = _ref2.form;
  var plotDetails = form.plotDetails;

  var noFloors = parseInt((0, _get2.default)(plotDetails, "fields.floorCount.value")) || 0;
  return { noFloors: noFloors };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    removeForm: function removeForm(formKey) {
      return dispatch((0, _actions.removeForm)(formKey));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FloorDetails);