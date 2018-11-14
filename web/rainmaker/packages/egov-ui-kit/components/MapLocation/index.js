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

var styles = [{
  featureType: "administrative",
  elementType: "geometry.fill",
  stylers: [{
    color: "#d6e2e6"
  }]
}, {
  featureType: "administrative",
  elementType: "geometry.stroke",
  stylers: [{
    color: "#cfd4d5"
  }]
}, {
  featureType: "administrative",
  elementType: "labels.text.fill",
  stylers: [{
    color: "#7492a8"
  }]
}, {
  featureType: "administrative.neighborhood",
  elementType: "labels.text.fill",
  stylers: [{
    lightness: 25
  }]
}, {
  featureType: "landscape.man_made",
  elementType: "geometry.fill",
  stylers: [{
    color: "#dde2e3"
  }]
}, {
  featureType: "landscape.man_made",
  elementType: "geometry.stroke",
  stylers: [{
    color: "#cfd4d5"
  }]
}, {
  featureType: "landscape.natural",
  elementType: "geometry.fill",
  stylers: [{
    color: "#dde2e3"
  }]
}, {
  featureType: "landscape.natural",
  elementType: "labels.text.fill",
  stylers: [{
    color: "#7492a8"
  }]
}, {
  featureType: "landscape.natural.terrain",
  elementType: "all",
  stylers: [{
    visibility: "off"
  }]
}, {
  featureType: "poi",
  elementType: "geometry.fill",
  stylers: [{
    color: "#dde2e3"
  }]
}, {
  featureType: "poi",
  elementType: "labels.text.fill",
  stylers: [{
    color: "#588ca4"
  }]
}, {
  featureType: "poi",
  elementType: "labels.icon",
  stylers: [{
    saturation: -100
  }]
}, {
  featureType: "poi.park",
  elementType: "geometry.fill",
  stylers: [{
    color: "#a9de83"
  }]
}, {
  featureType: "poi.park",
  elementType: "geometry.stroke",
  stylers: [{
    color: "#bae6a1"
  }]
}, {
  featureType: "poi.sports_complex",
  elementType: "geometry.fill",
  stylers: [{
    color: "#c6e8b3"
  }]
}, {
  featureType: "poi.sports_complex",
  elementType: "geometry.stroke",
  stylers: [{
    color: "#bae6a1"
  }]
}, {
  featureType: "road",
  elementType: "labels.text.fill",
  stylers: [{
    color: "#41626b"
  }]
}, {
  featureType: "road",
  elementType: "labels.icon",
  stylers: [{
    saturation: -45
  }, {
    lightness: 10
  }, {
    visibility: "on"
  }]
}, {
  featureType: "road.highway",
  elementType: "geometry.fill",
  stylers: [{
    color: "#c1d1d6"
  }]
}, {
  featureType: "road.highway",
  elementType: "geometry.stroke",
  stylers: [{
    color: "#a6b5bb"
  }]
}, {
  featureType: "road.highway",
  elementType: "labels.icon",
  stylers: [{
    visibility: "on"
  }]
}, {
  featureType: "road.highway.controlled_access",
  elementType: "geometry.fill",
  stylers: [{
    color: "#9fb6bd"
  }]
}, {
  featureType: "road.arterial",
  elementType: "geometry.fill",
  stylers: [{
    color: "#ffffff"
  }]
}, {
  featureType: "road.local",
  elementType: "geometry.fill",
  stylers: [{
    color: "#ffffff"
  }]
}, {
  featureType: "transit",
  elementType: "labels.icon",
  stylers: [{
    saturation: -70
  }]
}, {
  featureType: "transit.line",
  elementType: "geometry.fill",
  stylers: [{
    color: "#b4cbd4"
  }]
}, {
  featureType: "transit.line",
  elementType: "labels.text.fill",
  stylers: [{
    color: "#588ca4"
  }]
}, {
  featureType: "transit.station",
  elementType: "all",
  stylers: [{
    visibility: "off"
  }]
}, {
  featureType: "transit.station",
  elementType: "labels.text.fill",
  stylers: [{
    color: "#008cb5"
  }, {
    visibility: "on"
  }]
}, {
  featureType: "transit.station.airport",
  elementType: "geometry.fill",
  stylers: [{
    saturation: -100
  }, {
    lightness: -5
  }]
}, {
  featureType: "water",
  elementType: "geometry.fill",
  stylers: [{
    color: "#a6cbe3"
  }]
}];

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
      defaultZoom: 18,
      center: props.currLoc ? props.currLoc : props.center,
      onBoundsChanged: props.onBoundsChanged,
      draggable: true,
      defaultOptions: {
        styles: styles
      }
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
    }) : _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { className: "markerInfoBox" },
        _react2.default.createElement(
          "div",
          {
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.8700000047683716)",
              textAlign: "center",
              padding: "7px 10px"
            }
          },
          _react2.default.createElement(
            "div",
            { style: { color: "#fff" } },
            "Move pin to adjust"
          )
        ),
        _react2.default.createElement("div", {
          style: {
            width: "0px",
            height: "0px",
            left: 0,
            right: 0,
            margin: "auto",
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "15px solid rgba(0, 0, 0, 0.87)",
            position: "absolute"
          }
        })
      ),
      _react2.default.createElement(Marker, {
        position: props.viewLocation ? props.currLoc : props.center,
        icon: props.icon,
        draggable: false,
        animation: window.google.maps.Animation.DROP
      })
    ),
    props.setLocation && props.setLocation(props.lat, props.lng)
  );
});

exports.default = MapLocation;