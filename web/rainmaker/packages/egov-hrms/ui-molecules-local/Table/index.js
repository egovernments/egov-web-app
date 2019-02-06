"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _muiDatatables = require("mui-datatables");

var _muiDatatables2 = _interopRequireDefault(_muiDatatables);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = function (_React$Component) {
  (0, _inherits3.default)(Table, _React$Component);

  function Table() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Table);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Table.__proto__ || Object.getPrototypeOf(Table)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false,
      data: [],
      columns: [],
      customSortOrder: "asc"
    }, _this.formatData = function (data, columns) {
      return data && [].concat((0, _toConsumableArray3.default)(data)).reduce(function (acc, curr) {
        var dataRow = [];
        Object.keys(columns).forEach(function (column) {
          var columnValue = (0, _get2.default)(curr, "" + column, "");
          if ((0, _get2.default)(columns, column + ".format", "")) {
            columnValue = columns[column].format(curr);
          }
          dataRow.push(columnValue);
        });
        var updatedAcc = [].concat((0, _toConsumableArray3.default)(acc));
        updatedAcc.push(dataRow);
        return updatedAcc;
      }, []);
    }, _this.updateTable = function (data, columns) {
      var updatedData = _this.formatData(data, columns);
      _this.setState({
        data: updatedData,
        columns: Object.keys(columns)
      });
    }, _this.onColumnSortChange = function (columnName, i) {
      var _this$state = _this.state,
          customSortOrder = _this$state.customSortOrder,
          data = _this$state.data;
      var customSortColumn = _this.props.customSortColumn;
      var column = customSortColumn.column,
          sortingFn = customSortColumn.sortingFn;

      if (columnName === column) {
        var updatedData = sortingFn((0, _cloneDeep2.default)(data), "", customSortOrder);
        _this.setState({
          data: updatedData.data,
          customSortOrder: updatedData.currentOrder
        });
      }
    }, _this.handleClickOpen = function (data) {
      _this.setState({ open: true });
    }, _this.handleClose = function () {
      _this.setState({ open: false });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Table, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var data = nextProps.data,
          columns = nextProps.columns;

      this.updateTable(data, columns);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          data = _props.data,
          columns = _props.columns;

      this.updateTable(data, columns);
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          data = _state.data,
          columns = _state.columns;
      var _props2 = this.props,
          options = _props2.options,
          title = _props2.title;

      return _react2.default.createElement(
        "div",
        { className: "hr-table-container" },
        _react2.default.createElement(_muiDatatables2.default, {
          title: title,
          data: data,
          columns: columns,
          options: {
            selectableRows: false
          }
        })
      );
    }
  }]);
  return Table;
}(_react2.default.Component);

Table.propTypes = {
  columns: _propTypes2.default.object.isRequired,
  data: _propTypes2.default.array.isRequired,
  title: _propTypes2.default.string.isRequired,
  options: _propTypes2.default.object.isRequired
};

exports.default = Table;