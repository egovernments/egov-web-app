"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var _reactRedux = require("react-redux");

var _commons = require("egov-ui-kit/utils/commons");

var _components = require("components");

var _arrowDropDown = require("material-ui/svg-icons/navigation/arrow-drop-down");

var _arrowDropDown2 = _interopRequireDefault(_arrowDropDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CityPickerDialog = function (_Component) {
  (0, _inherits3.default)(CityPickerDialog, _Component);

  function CityPickerDialog() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CityPickerDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CityPickerDialog.__proto__ || Object.getPrototypeOf(CityPickerDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = { results: [], searchTerm: "", open: false }, _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              document.getElementById("person-city").addEventListener("focus", function () {
                this.blur();
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.prepareResultsForDisplay = function () {
      var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return results.map(function (result, index) {
        var mappedResult = {};
        mappedResult.key = result.key;
        mappedResult.primaryText = result.text;
        mappedResult.id = result.key;
        return mappedResult;
      });
    }, _this.onCityFieldClicked = function () {
      _this.setState({
        open: true,
        searchTerm: ""
      });
    }, _this.onClose = function () {
      _this.setState({ open: false });
    }, _this.onItemClick = function (item, index) {
      var key = item.key;

      if (key) {
        var _this$props = _this.props,
            fieldKey = _this$props.fieldKey,
            onChange = _this$props.onChange;

        onChange(fieldKey, key);
        _this.onClose();
      }
    }, _this.autoSuggestCallback = function () {
      var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var searchTerm = arguments[1];

      if (results.length === 0) {
        results.push({ key: "", text: "No City Found" });
      }
      _this.setState({ results: results, searchTerm: searchTerm });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CityPickerDialog, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.getElementById("person-city").removeEventListener("focus", null);
    }
  }, {
    key: "render",
    value: function render() {
      var autoSuggestCallback = this.autoSuggestCallback,
          prepareResultsForDisplay = this.prepareResultsForDisplay,
          onClose = this.onClose,
          onCityFieldClicked = this.onCityFieldClicked,
          onItemClick = this.onItemClick;
      var _state = this.state,
          results = _state.results,
          searchTerm = _state.searchTerm,
          open = _state.open;
      var _props = this.props,
          field = _props.field,
          cities = _props.cities;

      var displayInitialList = searchTerm.length === 0 ? true : false;
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { onClick: onCityFieldClicked },
          _react2.default.createElement(_components.TextFieldIcon, (0, _extends3.default)({}, field, {
            errorStyle: { bottom: "0px" },
            value: (0, _commons.getCityNameByCode)((field || {}).value, cities),
            id: "person-city",
            iconPosition: "after",
            Icon: _arrowDropDown2.default
          }))
        ),
        _react2.default.createElement(
          _components.Dialog,
          {
            className: "citipicker-dialog",
            titleStyle: { textAlign: "left", padding: "24px 16px" },
            handleClose: onClose,
            bodyStyle: { padding: "0px", overflowX: "hidden", maxHeight: "100%", minHeight: "100px" },
            title: "Choose City",
            modal: false,
            open: open,
            autoScrollBodyContent: true,
            onRequestClose: onClose,
            style: {
              paddingTop: "0",
              marginTop: "-30px",
              bottom: "0",
              height: "auto"
            },
            isClose: true
          },
          _react2.default.createElement(_components.AutoSuggest, {
            id: "city-picker-search",
            dataSource: cities,
            searchInputText: "Search",
            searchKey: "text",
            autoFocus: true,
            callback: autoSuggestCallback
          }),
          _react2.default.createElement(_components.List, {
            onItemClick: onItemClick,
            innerDivStyle: { paddingLeft: "50px" },
            listItemStyle: { borderBottom: "1px solid #eee" },
            items: displayInitialList ? prepareResultsForDisplay(cities) : prepareResultsForDisplay(results)
          })
        )
      );
    }
  }]);
  return CityPickerDialog;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var cities = state.common.cities || [];
  return { cities: cities };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(CityPickerDialog);