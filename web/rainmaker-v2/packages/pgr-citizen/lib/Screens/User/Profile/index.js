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

var _common = require("modules/common");

var _ProfileForm = require("./components/ProfileForm");

var _ProfileForm2 = _interopRequireDefault(_ProfileForm);

var _download = require("egov-ui-kit/assets/images/download.png");

var _download2 = _interopRequireDefault(_download);

var _actions = require("egov-ui-kit/redux/form/actions");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProfileFormHOC = (0, _form2.default)({ formKey: "profile" })(_ProfileForm2.default);

var Profile = function (_Component) {
  (0, _inherits3.default)(Profile, _Component);

  function Profile() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Profile);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Profile.__proto__ || Object.getPrototypeOf(Profile)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      openUploadSlide: false
    }, _this.setProfilePic = function () {
      var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var imageUri = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var fileUpload = _this.props.fileUpload;

      _this.removeProfilePic();
      fileUpload("profile", "photo", { module: "rainmaker-pgr", file: file, imageUri: imageUri }, true);
    }, _this.removeProfilePic = function () {
      var removeFile = _this.props.removeFile;

      removeFile("profile", "photo", 0);
    }, _this.onClickAddPic = function (isOpen) {
      _this.setState({
        openUploadSlide: isOpen
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Profile, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          profilePic = _props.profilePic,
          loading = _props.loading;
      var openUploadSlide = this.state.openUploadSlide;
      var setProfilePic = this.setProfilePic,
          onClickAddPic = this.onClickAddPic,
          removeProfilePic = this.removeProfilePic;


      return _react2.default.createElement(
        _common.Screen,
        { loading: loading, className: "citizen-profile-screen" },
        _react2.default.createElement(
          "div",
          { className: "profile-container" },
          _react2.default.createElement(ProfileFormHOC, { onClickAddPic: onClickAddPic, img: _download2.default, profilePic: profilePic })
        ),
        openUploadSlide && _react2.default.createElement(_common.UploadDrawer, { removeFile: removeProfilePic, setProfilePic: setProfilePic, onClickAddPic: onClickAddPic, openUploadSlide: openUploadSlide })
      );
    }
  }]);
  return Profile;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var formKey = "profile";
  var form = state.form[formKey] || {};
  var images = form && form.files && form.files["photo"] || [];
  var loading = images.reduce(function (loading, file) {
    return loading || file.loading;
  }, false) || false;

  return {
    profilePic: images.length && images[0].imageUri || _download2.default,
    loading: loading
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fileUpload: function fileUpload(formKey, fieldKey, module, fileObject) {
      return dispatch((0, _actions.fileUpload)(formKey, fieldKey, module, fileObject));
    },
    removeFile: function removeFile(formKey, fieldKey, index) {
      return dispatch((0, _actions.removeFile)(formKey, fieldKey, index));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Profile);