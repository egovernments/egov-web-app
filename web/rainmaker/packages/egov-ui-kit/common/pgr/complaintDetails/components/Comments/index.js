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

var _form = require("hocs/form");

var _form2 = _interopRequireDefault(_form);

var _components = require("components");

var _translationNode = require("utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _WriteComment = require("../WriteComment");

var _WriteComment2 = _interopRequireDefault(_WriteComment);

var _Avatar = require("material-ui/Avatar");

var _Avatar2 = _interopRequireDefault(_Avatar);

var _download = require("assets/images/download.png");

var _download2 = _interopRequireDefault(_download);

var _commons = require("utils/commons");

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imageStyles = {
  width: "33px",
  height: "33px",
  marginRight: "8px"
};

var WriteCommentHOC = (0, _form2.default)({ formKey: "comment" })(_WriteComment2.default);

var Comments = function (_Component) {
  (0, _inherits3.default)(Comments, _Component);

  function Comments() {
    (0, _classCallCheck3.default)(this, Comments);
    return (0, _possibleConstructorReturn3.default)(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).apply(this, arguments));
  }

  (0, _createClass3.default)(Comments, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          selectedComplaint = _props.selectedComplaint,
          userImage = _props.userImage,
          userId = _props.userId,
          userName = _props.userName,
          role = _props.role,
          isAssignedToEmployee = _props.isAssignedToEmployee,
          transformedCommentList = _props.transformedCommentList;


      var items = transformedCommentList && transformedCommentList.map(function (comment, index) {
        if (comment.role === "Citizen") {
          return {
            leftAvatar: _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(_components.Image, { style: imageStyles, className: "img-circle", size: "medium", source: comment.avatar ? comment.avatar : _download2.default })
            ),
            primaryText: _react2.default.createElement(
              "div",
              { className: "complaint-details-comments-section" },
              _react2.default.createElement(_translationNode2.default, { containerStyle: { marginBottom: "6px" }, fontSize: "10px", label: comment.name ? comment.name : "" }),
              _react2.default.createElement(_translationNode2.default, { containerStyle: { marginBottom: "6px" }, labelStyle: { color: "#767676" }, label: comment.comment }),
              _react2.default.createElement(_translationNode2.default, { labelClassName: "text-right", fontSize: "10px", label: (0, _commons.getDateFromEpoch)(comment.when) })
            )
          };
        } else {
          return {
            primaryText: _react2.default.createElement(
              "div",
              { className: "complaint-details-comments-section", style: { marginRight: "6px" } },
              _react2.default.createElement(_translationNode2.default, { containerStyle: { marginBottom: "6px" }, fontSize: "10px", label: comment.name ? comment.name : "" }),
              _react2.default.createElement(_translationNode2.default, { containerStyle: { marginBottom: "6px" }, labelStyle: { color: "#767676" }, label: comment.comment }),
              _react2.default.createElement(_translationNode2.default, { labelClassName: "text-right", fontSize: "10px", label: (0, _commons.getDateFromEpoch)(comment.when) })
            ),

            rightAvatar: _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(_components.Image, { style: imageStyles, className: "img-circle", size: "medium", source: comment.avatar ? comment.avatar : _download2.default })
            )
          };
        }
      });
      var status = selectedComplaint && selectedComplaint.actions.filter(function (action, index) {
        return action.status;
      });
      var currentstatus = status && status[0].status && status[0].status.toLowerCase();
      return _react2.default.createElement(
        "div",
        null,
        this.props.hasComments || currentstatus && currentstatus.toLowerCase() !== "closed" ? _react2.default.createElement(_components.Card, {
          style: {
            paddingBottom: "0px"
          },
          textChildren: _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              { className: "rainmaker-displayInline" },
              _react2.default.createElement(_components.Icon, { action: "communication", name: "forum", color: "#767676" }),
              _react2.default.createElement(_translationNode2.default, { label: "CS_COMMON_COMMENTS", containerStyle: { marginLeft: "13px" }, labelClassName: "dark-heading" })
            ),
            _react2.default.createElement(_components.List, {
              listContainerStyle: { marginTop: "24px", background: "transparent" },
              listItemStyle: { marginBottom: "-8.5px" },
              items: items
            }),
            isAssignedToEmployee && role === "employee" || role === "citizen" || role === "ao" ? currentstatus && currentstatus.toLowerCase() !== "closed" && _react2.default.createElement(WriteCommentHOC, { userImage: userImage, currentstatus: currentstatus }) : ""
          )
        }) : ""
      );
    }
  }]);
  return Comments;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var complaints = state.complaints,
      common = state.common;
  var employeeById = common.employeeById,
      citizenById = common.citizenById;

  var selectedComplaint = complaints["byId"][decodeURIComponent(window.location.href.split("/").pop())];
  var commentList = selectedComplaint && selectedComplaint.actions.filter(function (action, index) {
    return action.comments && !action.status;
  });
  commentList && commentList.reverse();
  var transformedCommentList = commentList && commentList.map(function (comment, commentIndex) {
    var role = comment.by.split(":")[1];
    var id = comment.by.split(":")[0];
    return {
      role: role,
      avatar: role === "Citizen" ? (0, _commons.getPropertyFromObj)(citizenById, id, "photo", "") : (0, _commons.getPropertyFromObj)(employeeById, id, "photo", ""),
      name: role === "Citizen" ? (0, _commons.getPropertyFromObj)(citizenById, id, "name", "") : (0, _commons.getPropertyFromObj)(employeeById, id, "name", ""),
      comment: comment.comments,
      when: comment.when
    };
  });

  var hasComments = transformedCommentList && transformedCommentList.length ? true : false;
  var userImage = state.auth.userInfo.photo || "";
  var userId = state.auth.userInfo.id || "";
  var userName = state.auth.userInfo.name || "";
  return { selectedComplaint: selectedComplaint, userImage: userImage, userId: userId, userName: userName, transformedCommentList: transformedCommentList, hasComments: hasComments };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Comments);