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

var API_KEY = "AIzaSyBN01pR2wGavj2_q3v4-vFgQzmcx-gllk0";

var MapLocation = compose(withProps({
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&v=3.exp&libraries=geometry,drawing,places",
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
          center: refs.map.getCenter()
        });
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
    { ref: props.onMapMounted, defaultZoom: 13, center: props.currLoc, onBoundsChanged: props.onBoundsChanged },
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
    props.dragInfoBox && _react2.default.createElement(
      "div",
      { className: "dragInfoBox" },
      " ",
      _react2.default.createElement(
        "span",
        null,
        "Move this pin to select your location"
      ),
      " "
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
      props.setLocation(marker.position.lat(), marker.position.lng(), index);
      return _react2.default.createElement(Marker, {
        key: index,
        position: marker.position,
        draggable: true,
        icon: props.icon,
        onDragEnd: function onDragEnd(e) {
          props.setLocation(e.latLng.lat(), e.latLng.lng());
        }
      });
    }) : _react2.default.createElement(Marker, {
      position: props.center,
      icon: props.icon,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
      onDragEnd: function onDragEnd(e) {
        props.setLocation(e.latLng.lat(), e.latLng.lng());
      }
    }),
    props.showMyLoc && _react2.default.createElement(Marker, { position: props.currLoc, icon: props.icon })
  );
});

exports.default = MapLocation;