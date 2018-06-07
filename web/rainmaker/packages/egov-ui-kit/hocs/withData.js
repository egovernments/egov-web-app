"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _actions = require("egov-ui-kit/redux/auth/actions");

var _actions2 = require("egov-ui-kit/redux/complaints/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withData = function withData(Component) {
  var Wrapper = function (_React$Component) {
    (0, _inherits3.default)(Wrapper, _React$Component);

    function Wrapper() {
      (0, _classCallCheck3.default)(this, Wrapper);
      return (0, _possibleConstructorReturn3.default)(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).apply(this, arguments));
    }

    (0, _createClass3.default)(Wrapper, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _props = this.props,
            searchUser = _props.searchUser,
            fetchComplaintCategories = _props.fetchComplaintCategories;

        fetchComplaintCategories();
        searchUser();
      }
    }, {
      key: "render",
      value: function render() {
        var _props2 = this.props,
            searchUser = _props2.searchUser,
            fetchCurrentLocation = _props2.fetchCurrentLocation,
            fetchComplaintCategories = _props2.fetchComplaintCategories,
            rest = (0, _objectWithoutProperties3.default)(_props2, ["searchUser", "fetchCurrentLocation", "fetchComplaintCategories"]);

        return _react2.default.createElement(Component, rest);
      }
    }]);
    return Wrapper;
  }(_react2.default.Component);

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      fetchComplaintCategories: function fetchComplaintCategories() {
        return dispatch((0, _actions2.fetchComplaintCategories)());
      },
      searchUser: function searchUser() {
        return dispatch((0, _actions.searchUser)());
      }
    };
  };

  return (0, _reactRedux.connect)(null, mapDispatchToProps)(Wrapper);
};

exports.default = withData;