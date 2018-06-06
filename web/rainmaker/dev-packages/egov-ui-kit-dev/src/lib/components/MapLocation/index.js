"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _SearchBox = require("react-google-maps/lib/components/places/SearchBox");

var _SearchBox2 = _interopRequireDefault(_SearchBox);

require("./index.css");

var _Icon = require("../Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _common = require("config/common");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require("recompose"),
    compose = _require.compose,
    withProps = _require.withProps,
    lifecycle = _require.lifecycle,
    withStateHandlers = _require.withStateHandlers;

var _require2 = require("react-google-maps"),
    withScriptjs = _require2.withScriptjs,
    withGoogleMap = _require2.withGoogleMap,
    GoogleMap = _require2.GoogleMap,
    Marker = _require2.Marker;

var MapLocation = compose(withProps({
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + _common2.default.MAP_API_KEY + "&v=3.exp&libraries=geometry,drawing,places",
  loadingElement: _react2.default.createElement("div", { style: { height: "100%" } }),
  containerElement: _react2.default.createElement("div", { className: "map-container" }),
  mapElement: _react2.default.createElement("div", { style: { height: "100%" } }),
  center: { lat: 12.972442, lng: 77.580643 }
}), lifecycle({
  componentWillMount: function componentWillMount() {
    var _this = this;

    var refs = {};
    this.setState({
      markers: [],
      onMapMounted: function onMapMounted(ref) {
        refs.map = ref;
      },
      onBoundsChanged: function onBoundsChanged() {
        _this.setState({
          bounds: refs.map.getBounds(),
          center: refs.map.getCenter(),
          lat: refs.map.getCenter().lat(),
          lng: refs.map.getCenter().lng()
        });
        // var geocoder = new window.google.maps.Geocoder();
        // geocoder.geocode({ location: { lat: this.state.lat, lng: this.state.lng } }, (results, status) => {
        //   if (status === "OK") {
        //     if (results[0]) {
        //       this.setState({
        //         address: results[0].formatted_address,
        //       });
        //     }
        //   }
        // });
      },
      onSearchBoxMounted: function onSearchBoxMounted(ref) {
        refs.searchBox = ref;
      },
      onPlacesChanged: function onPlacesChanged() {
        var places = refs.searchBox.getPlaces();
        var bounds = new window.google.maps.LatLngBounds();

        places.forEach(function (place) {
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        var nextMarkers = places.map(function (place) {
          return {
            position: place.geometry.location
          };
        });
        var nextCenter = _lodash2.default.get(nextMarkers, "0.position", _this.state.center);
        _this.setState({
          center: nextCenter,
          markers: nextMarkers
        });
        refs.map.fitBounds(bounds);
      }
    });
  }
}), withStateHandlers(function () {
  return {
    isOpen: false
  };
}, {
  onToggleOpen: function onToggleOpen(_ref) {
    var isOpen = _ref.isOpen;
    return function () {
      return {
        isOpen: !isOpen
      };
    };
  }
}), withScriptjs, withGoogleMap)(function (props) {
  return _react2.default.createElement(
    GoogleMap,
    {
      ref: props.onMapMounted,
      defaultZoom: 13,
      center: props.currLoc ? props.currLoc : props.center,
      onBoundsChanged: props.onBoundsChanged,
      draggable: true
    },
    _react2.default.createElement(
      "div",
      { className: "search-icon" },
      _react2.default.createElement(_Icon2.default, {
        id: "searchIcon",
        style: {
          height: 24,
          width: 24,
          color: "#484848"
        },
        action: "action",
        name: "search"
      })
    ),
    _react2.default.createElement(
      "div",
      { className: "myLoc" },
      _react2.default.createElement(_Icon2.default, {
        id: "my-location",
        style: {
          background: "#969696",
          borderRadius: "50%",
          padding: "12px",
          height: 55,
          width: 55,
          color: "rgb(255, 255, 255)"
        },
        action: "maps",
        name: "my-location",
        onClick: props.getMyLoc
      })
    ),
    _react2.default.createElement(
      _SearchBox2.default,
      {
        ref: props.onSearchBoxMounted,
        bounds: props.bounds,
        controlPosition: window.google.maps.ControlPosition.TOP_LEFT,
        onPlacesChanged: props.onPlacesChanged
      },
      _react2.default.createElement("input", { type: "text", className: "searchBoxStyles", placeholder: "Search address", style: props.searchBoxStyles })
    ),
    props.markers.length > 0 ? props.markers.map(function (marker, index) {
      return _react2.default.createElement(Marker, { key: index, position: props.center, draggable: false, icon: props.icon });
    }) : _react2.default.createElement(Marker, {
      position: props.viewLocation ? props.currLoc : props.center,
      icon: props.icon,
      draggable: false,
      animation: window.google.maps.Animation.DROP
    }),
    props.setLocation && props.setLocation(props.lat, props.lng)
  );
});

exports.default = MapLocation;