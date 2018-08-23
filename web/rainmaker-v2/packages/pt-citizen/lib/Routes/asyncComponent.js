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

exports.default = asyncComponent;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncComponent(getComponent) {
    var AsyncComponent = function (_Component) {
        (0, _inherits3.default)(AsyncComponent, _Component);

        function AsyncComponent() {
            var _ref;

            var _temp, _this, _ret;

            (0, _classCallCheck3.default)(this, AsyncComponent);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AsyncComponent.__proto__ || Object.getPrototypeOf(AsyncComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = { Component: AsyncComponent.Component }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
        }

        (0, _createClass3.default)(AsyncComponent, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                var _this2 = this;

                if (!this.state.Component) {
                    getComponent().then(function (Component) {
                        AsyncComponent.Component = Component;
                        _this2.setState({ Component: Component });
                    });
                }
            }
        }, {
            key: "render",
            value: function render() {
                var Component = this.state.Component;

                if (Component) {
                    return _react2.default.createElement(Component, this.props);
                }
                return null;
            }
        }]);
        return AsyncComponent;
    }(_react.Component);

    AsyncComponent.Component = null;

    return AsyncComponent;
}