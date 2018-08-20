"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
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

var _components = require("components");

var _Location_pin = require("assets/Location_pin.svg");

var _Location_pin2 = _interopRequireDefault(_Location_pin);

var _actions = require("egov-ui-kit/redux/form/actions");

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

require("./index.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var pickBtn = {
  lineHeight: "38px",
  display: "block",
  margin: 0,
  backgroundColor: "#f5a623",
  color: "#ffffff",
  fontFamily: "Roboto",
  fontSize: "7px",
  height: 38,
  fontWeight: 500,
  fontStyle: "normal",
};

var add = {};

var TrackLocation = (function(_Component) {
  (0, _inherits3.default)(TrackLocation, _Component);

  function TrackLocation(props) {
    (0, _classCallCheck3.default)(this, TrackLocation);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TrackLocation.__proto__ || Object.getPrototypeOf(TrackLocation)).call(this, props));

    _this.getMyLocation = function() {
      var currentLocation = _this.props.currentLocation;

      if (!(0, _isEmpty2.default)(currentLocation)) {
        var lat = currentLocation.lat,
          lng = currentLocation.lng;

        _this.setState({
          currLoc: { lat: parseFloat(lat), lng: parseFloat(lng) },
        });
      } else if (navigator.geolocation) {
        // can be resused
        navigator.geolocation.getCurrentPosition(
          function(position) {
            _this.setState({
              currLoc: { lat: position.coords.latitude, lng: position.coords.longitude },
            });
          },
          function(error) {
            console.log(error.code);
          }
        );
      }
    };

    _this.setPickedLocation = function(lati, long) {
      add.lat = lati;
      add.lng = long;
    };

    _this.onClickPick = function() {
      _this.convertToAddress(add);
      _this.setPrevPageFlag();
      _this.props.history.goBack();
    };

    _this.convertToAddress = function(add) {
      var lat = add.lat,
        lng = add.lng;

      _this.setState({
        currLoc: {},
      });
      lat && _this.props.handleFieldChange(_this.props.formKey, "latitude", parseFloat(lat).toFixed(6));
      lng && _this.props.handleFieldChange(_this.props.formKey, "longitude", parseFloat(lng).toFixed(6));
      var geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat: lat, lng: lng } }, function(results, status) {
        if (status === "OK") {
          if (results[0]) {
            //Results[0] gives the nearest address
            _this.props.handleFieldChange(_this.props.formKey, "address", results[0].formatted_address);
          }
        }
      });
    };

    _this.onCLickMapBackBtn = function() {
      _this.setPrevPageFlag();
      _this.props.history.goBack();
    };

    _this.setPrevPageFlag = function() {
      if (_this.props.formKey === "propertyTax") {
        sessionStorage.setItem("backFromPTMap", true);
      }
    };

    _this.state = {
      showMyAddress: false,
      currLoc: {},
      pickedLoc: {},
    };
    return _this;
  }

  (0, _createClass3.default)(TrackLocation, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        var myLocation = { lat: 12.9279, lng: 77.6271 };
        //To set the map to any defined location.
        if (this.state.showMyAddress === true && myLocation) {
          this.setState({
            currLoc: myLocation,
          });
        }
      },

      //For Compass Click -- set map to current location
    },
    {
      key: "render",
      value: function render() {
        var currLoc = this.state.currLoc;
        var location = this.props.location;

        var _currloc = !(0, _isEmpty2.default)(currLoc) ? currLoc : (0, _isEmpty2.default)(location) ? { lat: 12.972442, lng: 77.580643 } : location;
        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            { className: "back-btn" },
            _react2.default.createElement(_components.Icon, {
              id: "map-back-btn",
              style: {
                height: 24,
                width: 24,
                color: "#484848",
              },
              action: "navigation",
              name: "arrow-back",
              onClick: this.onCLickMapBackBtn,
            })
          ),
          _react2.default.createElement(_components.MapLocation, {
            currLoc: _currloc,
            setLocation: this.setPickedLocation,
            getMyLoc: this.getMyLocation,
            icon: _Location_pin2.default,
            hideTerrainBtn: true,
            dragInfoBox: false,
            viewLocation: false,
          }),
          _react2.default.createElement(
            "div",
            { className: "btn-without-bottom-nav" },
            _react2.default.createElement(_components.Button, {
              id: "map-pick-button",
              className: "pick",
              label: "Pick",
              style: pickBtn,
              primary: true,
              labelColor: "#ffffff",
              onClick: this.onClickPick,
            })
          )
        );
      },
    },
  ]);
  return TrackLocation;
})(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var formKey = window.location.href.split("?")[1];
  var form = state.form[formKey];
  var fields = (form && form.fields) || {};
  var currentLocation = state.app.currentLocation || {};
  var location = {};
  if (fields.latitude && fields.latitude.value) location = { lat: parseFloat(fields.latitude.value), lng: parseFloat(fields.longitude.value) };
  return { location: location, formKey: formKey, currentLocation: currentLocation };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleFieldChange: function handleFieldChange(formKey, fieldKey, value) {
      return dispatch((0, _actions.handleFieldChange)(formKey, fieldKey, value));
    },
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TrackLocation);
