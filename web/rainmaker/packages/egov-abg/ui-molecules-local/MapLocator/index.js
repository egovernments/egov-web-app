"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _uiAtomsLocal = require("../../ui-atoms-local");

var _abgAppConfig = require("../../ui-config/abg-app-config");

var _uiAtoms = require("egov-ui-framework/ui-atoms");

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

require("./index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pickBtn = {
  display: "block"
};

var add = {};

var MapLocator = function (_Component) {
  (0, _inherits3.default)(MapLocator, _Component);

  function MapLocator(props) {
    (0, _classCallCheck3.default)(this, MapLocator);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MapLocator.__proto__ || Object.getPrototypeOf(MapLocator)).call(this, props));

    _this.getMyLocation = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          _this.setState({
            currLoc: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        }, function (error) {
          console.log(error.code);
        });
      }
    };

    _this.setPickedLocation = function (lati, long) {
      add.lat = lati;
      add.lng = long;
    };

    _this.closeMapPopup = function () {
      _this.props.handleField("apply", "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.mapsDialog", "props.open", false);
    };

    _this.onClickPick = function () {
      _this.props.handleField("apply", "components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocGISCoord.children.gisTextField", "props.value", add.lat + ", " + add.lng);
      _this.props.prepareFinalObject("noc.address.latitude", add.lat);
      _this.props.prepareFinalObject("noc.address.longitude", add.lng);

      _this.closeMapPopup();
      // this.convertToAddress(add);
      // this.setPrevPageFlag();
      // this.props.history.goBack();
    };

    _this.convertToAddress = function (add) {
      var lat = add.lat,
          lng = add.lng;

      _this.setState({
        currLoc: {}
      });
      lat && _this.props.handleFieldChange(_this.props.formKey, "latitude", parseFloat(lat).toFixed(6));
      lng && _this.props.handleFieldChange(_this.props.formKey, "longitude", parseFloat(lng).toFixed(6));
      var geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat: lat, lng: lng } }, function (results, status) {
        if (status === "OK") {
          if (results[0]) {
            //Results[0] gives the nearest address
            _this.props.handleFieldChange(_this.props.formKey, "address", results[0].formatted_address);
          }
        }
      });
    };

    _this.onCLickMapBackBtn = function () {
      _this.setPrevPageFlag();
      _this.props.history.goBack();
    };

    _this.setPrevPageFlag = function () {
      if (_this.props.formKey === "propertyTax") {
        sessionStorage.setItem("backFromPTMap", true);
      }
    };

    _this.state = {
      showMyAddress: false,
      currLoc: {},
      pickedLoc: {}
    };
    return _this;
  }

  (0, _createClass3.default)(MapLocator, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var myLocation = {};
      //To set the map to any defined location.
      if (this.state.showMyAddress === true && myLocation) {
        this.setState({
          currLoc: myLocation
        });
      }
    }

    //For Compass Click -- set map to current location

  }, {
    key: "render",
    value: function render() {
      var currLoc = this.state.currLoc;
      var location = this.props.location;

      var _currloc = !(0, _isEmpty2.default)(currLoc) ? currLoc : (0, _isEmpty2.default)(location) ? _abgAppConfig.defaultLocation : location;
      return _react2.default.createElement(
        "div",
        { style: { height: "100vh", width: "100vw" } },
        _react2.default.createElement(
          "div",
          { className: "back-btn" },
          _react2.default.createElement(_uiAtoms.Icon, {
            id: "map-back-btn",
            style: {
              width: "200px",
              height: "48px",
              marginRight: "16px"
            },
            variant: "outlined",
            color: "primary",
            action: "navigation",
            name: "arrow-back",
            onClick: this.onCLickMapBackBtn
          })
        ),
        _react2.default.createElement(_uiAtomsLocal.MapLocation, {
          currLoc: _currloc,
          setLocation: this.setPickedLocation,
          getMyLoc: this.getMyLocation
          // icon={pinIcon}
          , hideTerrainBtn: true,
          dragInfoBox: false,
          viewLocation: false
        }),
        _react2.default.createElement(
          "div",
          { className: "responsive-action-button-cont" },
          _react2.default.createElement(_uiAtoms.Button, {
            id: "map-close-button",
            className: "pick responsive-action-button",
            children: "Close",
            style: (0, _extends3.default)({}, pickBtn, {
              width: "200px",
              height: "48px",
              marginRight: "16px"
            }),
            variant: "outlined",
            color: "primary",
            onClick: this.closeMapPopup
          }),
          _react2.default.createElement(_uiAtoms.Button, {
            id: "map-pick-button",
            className: "pick responsive-action-button",
            children: "Pick",
            style: (0, _extends3.default)({}, pickBtn, {
              width: "200px",
              height: "48px",
              marginRight: "16px"
            }),
            variant: "contained",
            color: "primary",
            onClick: this.onClickPick
          })
        )
      );
    }
  }]);
  return MapLocator;
}(_react.Component);

//const mapStateToProps = state => {
// const formKey = window.location.href.split("?")[1];
// const form = state.form[formKey];
// const fields = (form && form.fields) || {};
// const currentLocation = state.app.currentLocation || {};
// var location = {};
// if (fields.latitude && fields.latitude.value)
//   location = {
//     lat: parseFloat(fields.latitude.value),
//     lng: parseFloat(fields.longitude.value)
//   };
// return { location, formKey, currentLocation };
//};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleField: function handleField(formKey, path, props, value) {
      return dispatch((0, _actions.handleScreenConfigurationFieldChange)(formKey, path, props, value));
    },
    prepareFinalObject: function prepareFinalObject(path, value) {
      return dispatch((0, _actions.prepareFinalObject)(path, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(MapLocator);