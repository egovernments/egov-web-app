import React from "react";
import _ from "lodash";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import "./index.css";

const { compose, withProps, lifecycle, withStateHandlers } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap, Marker } = require("react-google-maps");
const API_KEY = "AIzaSyBN01pR2wGavj2_q3v4-vFgQzmcx-gllk0";

const MapLocation = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="container" />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 12.972442, lng: 77.580643 },
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      var self = this;
      var lati;
      var long;

      this.setState({
        bounds: null,
        markers: [],
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
        },
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach((place) => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map((place) => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, "0.position", this.state.center);
          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          refs.map.fitBounds(bounds);
        },
      });
    },
  }),
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      }),
    }
  ),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap ref={props.onMapMounted} defaultZoom={13} center={props.currLoc} onBoundsChanged={props.onBoundsChanged} gestureHandling={"greedy"}>
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input type="text" placeholder="Search address" style={props.styles} />
    </SearchBox>
    {props.markers.map((marker, index) => {
      props.setLocation(marker.position.lat(), marker.position.lng(), index);
      return (
        <Marker
          key={index}
          position={marker.position}
          draggable={true}
          onDragEnd={(e) => {
            props.setLocation(e.latLng.lat(), e.latLng.lng());
          }}
        />
      );
    })}
    <Marker position={props.currLoc} icon={props.icon} />
  </GoogleMap>
));

export default MapLocation;
