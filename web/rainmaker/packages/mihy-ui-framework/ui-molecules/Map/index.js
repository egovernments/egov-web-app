"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _recompose = require("recompose");

var _reactGoogleMaps = require("react-google-maps");

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require("react-google-maps/lib/components/addons/InfoBox"),
    InfoBox = _require.InfoBox;
// import InputAdornment from '@material-ui/core/InputAdornment';
// import TextField from '@material-ui/core/TextField';
// import Icon from '@material-ui/core/Icon';
// import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";


var _require2 = require("react-google-maps/lib/components/places/SearchBox"),
    SearchBox = _require2.SearchBox;

var getMapKey = function getMapKey(env) {
  return process.env.hasOwnProperty("REACT_APP_" + env + "_API_KEY") ? process.env["REACT_APP_" + env + "_API_KEY"] : process.env.REACT_APP_MAP_API_KEY;
};

var API_KEY = getMapKey(process.env.REACT_APP_ENV);

// const addressBoxCloseIconSymbol = {
//   position: "relative",
//   top: "8px",
//   color: "black",
//   right: "8px",
//   width: "8px",
//   height: "8px"
// };

var addressBoxStyle = {
  // opacity: 0.6,
  borderRadius: "2px",
  // -webkit-backdrop-filter:" blur(1px)",
  backdropFilter: "blur(1px)",
  backgroundColor: "white",
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.24)",
  fontSize: "10px !important",
  fontWeight: "normal",
  fontstyle: "normal",
  fontStretch: "normal",
  lineHeight: 1.4,
  letterSpacing: "normal",
  textAlign: "left",
  color: "black",
  padding: "10px 18px 10px 12px",
  width: "330px",
  zIndex: "100000"
};

var bounds = void 0;
var gMap = {};

var MyMapComponent = (0, _recompose.compose)((0, _recompose.withProps)({
  // googleMapURL: `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`,
  googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=" + API_KEY,
  loadingElement: _react2.default.createElement("div", { style: { height: "100%" } }),
  containerElement: _react2.default.createElement("div", { style: { height: "100%", minWidth: "300px" } }),
  mapElement: _react2.default.createElement("div", { style: { height: "100%" } })
}), (0, _recompose.lifecycle)({
  componentWillMount: function componentWillMount() {
    var _this = this;

    var setLocation = this.props.setLocation;

    this.setState({
      // bounds: null,
      center: { lat: 21.7679, lng: 78.8718 },
      // markers: [],
      onMapMounted: function onMapMounted(ref) {
        gMap.map = ref;
      },
      onBoundsChanged: function onBoundsChanged() {
        _this.setState({
          // bounds: gMap.map.getBounds(),
          center: gMap.map.getCenter()
        });
      },
      onSearchBoxMounted: function onSearchBoxMounted(ref) {
        gMap.searchBox = ref;
      },
      onPlacesChanged: function onPlacesChanged() {
        var places = gMap.searchBox.getPlaces();
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
        var nextCenter = (0, _get2.default)(nextMarkers, "0.position", _this.state.center);

        // console.log(nextMarkers);
        setLocation(nextMarkers);

        _this.setState({
          center: nextCenter
          // markers: nextMarkers
        });
        gMap.map.fitBounds(bounds);
      }
    });
  },
  componentDidMount: function componentDidMount() {
    this.reRender(this.props);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!(0, _isEqual2.default)(this.props, nextProps)) {
      this.reRender(nextProps);
    }
  },
  reRender: function reRender(props, rndBool) {
    var _this2 = this;

    var dontZoomFar = function dontZoomFar() {
      // Don't zoom in too far on only one marker
      if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        var extendPoint1 = new window.google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
        var extendPoint2 = new window.google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
        bounds.extend(extendPoint1);
        bounds.extend(extendPoint2);
      }
    };
    if (props.isDirectionShown && (0, _get2.default)(window, "google.maps", undefined)) {
      var DirectionsService = new window.google.maps.DirectionsService();
      bounds = new window.google.maps.LatLngBounds();
      var waypts = [];

      var fitBound = function fitBound() {
        // Create bounds from markers
        if (gMap.map) {
          bounds.extend(new window.google.maps.LatLng(props.destination.lat - 0.01, props.destination.lng + 0.01));
          for (var index in waypts) {
            var latlng = new window.google.maps.LatLng(waypts[index].location.lat(), waypts[index].location.lng());
            bounds.extend(latlng);
          }

          dontZoomFar();
          gMap.map.fitBounds(bounds);
        }
        // Adjusting zoom here doesn't work :/
      };
      var getDestinationDirection = function getDestinationDirection() {
        DirectionsService.route({
          origin: new window.google.maps.LatLng(props.source.lat, props.source.lng),
          destination: new window.google.maps.LatLng(props.destination.lat, props.destination.lng),
          travelMode: window.google.maps.TravelMode.DRIVING,
          waypoints: waypts,
          optimizeWaypoints: true
        }, function (result, status) {
          if (status === window.google.maps.DirectionsStatus.OK) {
            _this2.setState({
              directions: result,
              waypoints: waypts
            });
            bounds.union(result.routes[0].bounds);
            fitBound();
          }
        });
      };
      getDestinationDirection();
    } else if (props.currLoc && (0, _get2.default)(window, "google.maps", undefined)) {
      var currLoc = props.currLoc;

      bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(currLoc.lat, currLoc.lng));
      if (props.entityTypes && props.entityTypes.length > 0) {
        var entityTypes = props.entityTypes;

        for (var index in entityTypes) {
          var latlng = new window.google.maps.LatLng(entityTypes[index].position.lat, entityTypes[index].position.lng);
          bounds.extend(latlng);
        }
      }
      dontZoomFar();
      gMap.map.fitBounds(bounds);
    }
  }
}), _reactGoogleMaps.withScriptjs, _reactGoogleMaps.withGoogleMap)(function (props) {
  // console.log(props);
  return _react2.default.createElement(
    _reactGoogleMaps.GoogleMap,
    {
      ref: props.onMapMounted,
      defaultZoom: props.zoomLevel ? props.zoomLevel : 10,
      defaultCenter: (0, _isEmpty2.default)(props.defaultCenter) ? { lat: 21.7679, lng: 78.8718 } : props.defaultCenter
      // center={props.defaultCenter}
      , options: {
        mapTypeControl: false,
        draggable: true,
        fullscreenControl: false,
        scaleControl: true,
        scrollwheel: true,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_BOTTOM
        }
      },
      onBoundsChanged: props.onBoundsChanged
    },
    _react2.default.createElement(
      SearchBox,
      {
        ref: props.onSearchBoxMounted,
        bounds: props.bounds,
        controlPosition: google.maps.ControlPosition.TOP_LEFT,
        onPlacesChanged: props.onPlacesChanged
      },
      _react2.default.createElement("input", {
        type: "text",
        placeholder: "Pick your location",
        style: {
          boxSizing: "border-box",
          border: "1px solid transparent",
          width: "96%",
          height: "50px",
          marginTop: "16px",
          padding: "0 12px",
          borderRadius: "3px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
          fontSize: "14px",
          outline: "none",
          textOverflow: "ellipses",
          marginLeft: "8px"
        }
      })
    ),
    props.currLoc && _react2.default.createElement(_reactGoogleMaps.Marker, { position: props.currLoc, draggable: true, onDragEnd: function onDragEnd(e) {
        props.onMarkerChanged(e.latLng.lat(), e.latLng.lng());
      }, icon: props.currentLocationIcon }),
    props.isDirectionShown && props.directions && _react2.default.createElement(_reactGoogleMaps.DirectionsRenderer, {
      directions: props.directions,
      options: {
        preserveViewport: true,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#4f72ec",
          strokeOpacity: 0,
          strokeWeight: 3,
          icons: [{
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillOpacity: 1,
              scale: 3
            },
            offset: "0",
            repeat: "1px"
          }]
        }
      }
    }),
    props.isEntityTypeShown && props.entityTypes.map(function (entity, entityKey) {
      if (entity.isLabelShown) {
        return _react2.default.createElement(
          _reactGoogleMaps.Marker,
          {
            key: entityKey
            // labelVisible={entity.labelStatus}
            // zIndex={1000}
            , position: (0, _extends3.default)({}, entity.position)
            // labelAnchor={new window.google.maps.Point(0, 0)}
            // labelStyle={addressBoxStyle}
            , onClick: function onClick() {
              return props.onInfoBoxToggle(entity.id);
            },
            icon: entity.icon,
            animation: window.google.maps.Animation.DROP
          },
          entity.labelStatus && _react2.default.createElement(
            InfoBox
            // visible={entity.labelStatus}
            // onCloseClick={()=>props.onToggleOpen(entity.id,{},false)}
            ,
            { options: { closeBoxURL: "", enableEventPropagation: true }
            },
            _react2.default.createElement(
              "div",
              { style: addressBoxStyle },
              entity.component
            )
          )
        );
      } else {
        return _react2.default.createElement(_reactGoogleMaps.Marker, {
          position: (0, _extends3.default)({}, entity.position),
          key: entityKey,
          icon: entity.icon ? entity.icon : props.entityIcon,
          onClick: function onClick() {
            return props.onInfoBoxToggle(entity.id);
          }
        });
      }
    })
  );
});

exports.default = MyMapComponent;