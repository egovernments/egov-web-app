"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("@material-ui/core/styles");

var _Table = require("@material-ui/core/Table");

var _Table2 = _interopRequireDefault(_Table);

var _TableBody = require("@material-ui/core/TableBody");

var _TableBody2 = _interopRequireDefault(_TableBody);

var _TableCell = require("@material-ui/core/TableCell");

var _TableCell2 = _interopRequireDefault(_TableCell);

var _TableHead = require("@material-ui/core/TableHead");

var _TableHead2 = _interopRequireDefault(_TableHead);

var _TablePagination = require("@material-ui/core/TablePagination");

var _TablePagination2 = _interopRequireDefault(_TablePagination);

var _TableRow = require("@material-ui/core/TableRow");

var _TableRow2 = _interopRequireDefault(_TableRow);

var _TableSortLabel = require("@material-ui/core/TableSortLabel");

var _TableSortLabel2 = _interopRequireDefault(_TableSortLabel);

var _Toolbar = require("@material-ui/core/Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Paper = require("@material-ui/core/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _Checkbox = require("@material-ui/core/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _IconButton = require("@material-ui/core/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Delete = require("@material-ui/icons/Delete");

var _Delete2 = _interopRequireDefault(_Delete);

var _FilterList = require("@material-ui/icons/FilterList");

var _FilterList2 = _interopRequireDefault(_FilterList);

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let counter = 0;
// function createData(name, calories, fat, carbs, protein) {
//   counter += 1;
//   return { id: counter, name, calories, fat, carbs, protein };
// }

function getSorting(order, orderBy) {
  return order === "desc" ? function (a, b) {
    return b[orderBy] < a[orderBy] ? -1 : 1;
  } : function (a, b) {
    return a[orderBy] < b[orderBy] ? -1 : 1;
  };
}

var TableHeader = function (_React$Component) {
  (0, _inherits3.default)(TableHeader, _React$Component);

  function TableHeader() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TableHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).call.apply(_ref, [this].concat(args))), _this), _this.createSortHandler = function (property) {
      return function (event) {
        _this.props.onRequestSort(event, property);
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TableHeader, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          onSelectAllClick = _props.onSelectAllClick,
          order = _props.order,
          orderBy = _props.orderBy,
          numSelected = _props.numSelected,
          rowCount = _props.rowCount,
          rowCheckBox = _props.rowCheckBox,
          columnData = _props.columnData;


      return _react2.default.createElement(
        _TableHead2.default,
        null,
        _react2.default.createElement(
          _TableRow2.default,
          null,
          rowCheckBox && _react2.default.createElement(
            _TableCell2.default,
            { padding: "checkbox" },
            _react2.default.createElement(_Checkbox2.default, { indeterminate: numSelected > 0 && numSelected < rowCount, checked: numSelected === rowCount, onChange: onSelectAllClick })
          ),
          columnData.map(function (column) {
            return _react2.default.createElement(
              _TableCell2.default,
              {
                key: column.id,
                numeric: column.numeric,
                padding: column.disablePadding ? "none" : "default",
                sortDirection: orderBy === column.id ? order : false,
                className: "tableHeadStyle"
              },
              _react2.default.createElement(
                _TableSortLabel2.default,
                {
                  active: orderBy === column.id,
                  direction: order,
                  onClick: _this2.createSortHandler(column.id),
                  className: "table-tooltip-styles"
                },
                column.label
              )
            );
          }, this)
        )
      );
    }
  }]);
  return TableHeader;
}(_react2.default.Component);

TableHeader.propTypes = {
  numSelected: _propTypes2.default.number.isRequired,
  onRequestSort: _propTypes2.default.func.isRequired,
  onSelectAllClick: _propTypes2.default.func.isRequired,
  order: _propTypes2.default.string.isRequired,
  orderBy: _propTypes2.default.string.isRequired,
  rowCount: _propTypes2.default.number.isRequired
};

var toolbarStyles = function toolbarStyles(theme) {
  return {
    root: {
      paddingRight: theme.spacing.unit
    },
    highlight: theme.palette.type === "light" ? {
      color: theme.palette.secondary.main,
      backgroundColor: (0, _colorManipulator.lighten)(theme.palette.secondary.light, 0.85)
    } : {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.secondary.dark
    },
    spacer: {
      flex: "1 1 100%"
    },
    actions: {
      color: theme.palette.text.secondary
    },
    title: {
      flex: "0 0 auto"
    }
  };
};

var EnhancedTableToolbar = function EnhancedTableToolbar(props) {
  var numSelected = props.numSelected,
      classes = props.classes;


  return _react2.default.createElement(
    _Toolbar2.default,
    {
      className: (0, _classnames2.default)(classes.root, (0, _defineProperty3.default)({}, classes.highlight, numSelected > 0))
    },
    _react2.default.createElement(
      "div",
      { className: classes.title },
      numSelected > 0 ? _react2.default.createElement(
        _Typography2.default,
        { color: "inherit", variant: "subheading" },
        numSelected,
        " selected"
      ) : _react2.default.createElement(
        _Typography2.default,
        { variant: "title", id: "tableTitle" },
        "Nutrition"
      )
    ),
    _react2.default.createElement("div", { className: classes.spacer }),
    _react2.default.createElement(
      "div",
      { className: classes.actions },
      numSelected > 0 ? _react2.default.createElement(
        Tooltip,
        { title: "Delete" },
        _react2.default.createElement(
          _IconButton2.default,
          { "aria-label": "Delete" },
          _react2.default.createElement(_Delete2.default, null)
        )
      ) : _react2.default.createElement(
        Tooltip,
        { title: "Filter list" },
        _react2.default.createElement(
          _IconButton2.default,
          { "aria-label": "Filter list" },
          _react2.default.createElement(_FilterList2.default, null)
        )
      )
    )
  );
};

EnhancedTableToolbar.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  numSelected: _propTypes2.default.number.isRequired
};

EnhancedTableToolbar = (0, _styles.withStyles)(toolbarStyles)(EnhancedTableToolbar);

var styles = function styles(theme) {
  return {
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3,
      backgroundColor: "#f8f8f8"
    },
    table: {
      minWidth: 1020,
      backgroundColor: "#f8f8f8"
    },
    tableWrapper: {
      overflowX: "auto",
      backgroundColor: "#f8f8f8"
    }
  };
};

var TableUi = function (_React$Component2) {
  (0, _inherits3.default)(TableUi, _React$Component2);

  function TableUi(props) {
    (0, _classCallCheck3.default)(this, TableUi);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (TableUi.__proto__ || Object.getPrototypeOf(TableUi)).call(this, props));

    _this3.handleRequestSort = function (event, property) {
      var orderBy = property;
      var order = "desc";

      if (_this3.state.orderBy === property && _this3.state.order === "desc") {
        order = "asc";
      }
      _this3.setState({ order: order, orderBy: orderBy });
    };

    _this3.handleSelectAllClick = function (event, checked) {
      if (checked) {
        _this3.setState(function (state) {
          return { selected: state.data.map(function (n) {
              return n.id;
            }) };
        });
        return;
      }
      _this3.setState({ selected: [] });
    };

    _this3.handleClick = function (event, id) {
      var selected = _this3.state.selected;

      var selectedIndex = selected.indexOf(id);
      var newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }

      _this3.setState({ selected: newSelected });
    };

    _this3.handleChangePage = function (event, page) {
      _this3.setState({ page: page });
    };

    _this3.handleChangeRowsPerPage = function (event) {
      _this3.setState({ rowsPerPage: event.target.value });
    };

    _this3.isSelected = function (id) {
      return _this3.state.selected.indexOf(id) !== -1;
    };

    var _this3$props = _this3.props,
        actionOnRow = _this3$props.actionOnRow,
        orderby = _this3$props.orderby;

    _this3.state = {
      order: "asc",
      orderBy: orderby,
      Action: actionOnRow,
      selected: [],
      page: 0,
      rowsPerPage: 5
    };
    return _this3;
  }

  (0, _createClass3.default)(TableUi, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          classes = _props2.classes,
          rowCheckBox = _props2.rowCheckBox,
          rowData = _props2.rowData,
          columnData = _props2.columnData,
          orderby = _props2.orderby,
          tableHeading = _props2.tableHeading;
      var _state = this.state,
          order = _state.order,
          selected = _state.selected,
          rowsPerPage = _state.rowsPerPage,
          page = _state.page,
          orderBy = _state.orderBy;

      var data = [].concat((0, _toConsumableArray3.default)(rowData));

      var emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
      return _react2.default.createElement(
        _Paper2.default,
        { className: classes.root },
        rowCheckBox && _react2.default.createElement(EnhancedTableToolbar, { numSelected: selected.length }),
        _react2.default.createElement(
          "div",
          { className: classes.tableWrapper },
          _react2.default.createElement(
            _Table2.default,
            { className: (0, _extends3.default)({}, classes.table, { tableStyle: "material-table" }), "aria-labelledby": "tableTitle" },
            _react2.default.createElement(TableHeader, {
              numSelected: selected.length,
              order: order,
              rowCheckBox: rowCheckBox,
              orderBy: orderBy,
              onSelectAllClick: this.handleSelectAllClick,
              onRequestSort: this.handleRequestSort,
              rowCount: data.length,
              columnData: columnData,
              className: "table-header"
            }),
            _react2.default.createElement(
              _TableBody2.default,
              null,
              data.sort(getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(function (n, index) {
                var isSelected = _this4.isSelected(n.id);
                return _react2.default.createElement(
                  _TableRow2.default,
                  {
                    hover: true
                    // onClick={(event) => this.handleClick(event, n.id)}
                    , role: "checkbox",
                    "aria-checked": isSelected,
                    tabIndex: -1,
                    key: n.id,
                    selected: isSelected,
                    className: "material-table-row"
                  },
                  rowCheckBox && _react2.default.createElement(
                    _TableCell2.default,
                    { padding: "checkbox" },
                    _react2.default.createElement(_Checkbox2.default, { checked: isSelected })
                  ),
                  Object.values(n).map(function (i, ind) {
                    return _react2.default.createElement(
                      _TableCell2.default,
                      { key: ind, numeric: true },
                      i
                    );
                  })
                );
              }),
              emptyRows > 0 && _react2.default.createElement(
                _TableRow2.default,
                { style: { height: 49 * emptyRows } },
                _react2.default.createElement(_TableCell2.default, { colSpan: 6 })
              )
            )
          )
        ),
        _react2.default.createElement(_TablePagination2.default, {
          component: "div",
          count: data.length,
          rowsPerPage: rowsPerPage,
          page: page,
          backIconButtonProps: {
            "aria-label": "Previous Page"
          },
          nextIconButtonProps: {
            "aria-label": "Next Page"
          },
          onChangePage: this.handleChangePage,
          onChangeRowsPerPage: this.handleChangeRowsPerPage,
          className: "material-table-pagination"
        })
      );
    }
  }]);
  return TableUi;
}(_react2.default.Component);

TableUi.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(TableUi);