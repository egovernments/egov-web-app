import React from "react";
import _ from "lodash";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import "./index.css";
import Icon from "../Icon";

const { compose, withProps, lifecycle, withStateHandlers } = require("recompose");
const { withScriptjs, withGoogleMap, GoogleMap, Marker } = require("react-google-maps");
const API_KEY = "AIzaSyBN01pR2wGavj2_q3v4-vFgQzmcx-gllk0";

const MapLocation = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="map-container" />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 12.972442, lng: 77.580643 },
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      this.setState({
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
  <GoogleMap ref={props.onMapMounted} defaultZoom={13} center={props.currLoc} onBoundsChanged={props.onBoundsChanged}>
    <div className="back-btn">
      <Icon
        id="map-back-btn"
        style={{
          height: 24,
          width: 24,
          color: "#484848",
        }}
        action="navigation"
        name={"arrow-back"}
        onClick={props.onCLickMapBackBtn}
      />
    </div>
    <div className="search-icon">
      <Icon
        id="searchIcon"
        style={{
          height: 24,
          width: 24,
          color: "#484848",
        }}
        action="action"
        name={"search"}
      />
    </div>
    <div className="myLoc">
      <Icon
        id="my-location"
        style={{
          background: "#969696",
          borderRadius: "50%",
          padding: "12px",
          height: 55,
          width: 55,
          color: "rgb(255, 255, 255)",
        }}
        action="maps"
        name={"my-location"}
        onClick={props.getMyLoc}
      />
    </div>
    {props.dragInfoBox && (
      <div className="dragInfoBox">
        {" "}
        <span>Move this pin to select your location</span>{" "}
      </div>
    )}
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input type="text" placeholder="Search address" style={props.searchBoxStyles} />
    </SearchBox>

    {props.markers.length > 0 ? (
      props.markers.map((marker, index) => {
        props.setLocation(marker.position.lat(), marker.position.lng(), index);
        return (
          <Marker
            key={index}
            position={marker.position}
            draggable={true}
            icon={props.icon}
            onDragEnd={(e) => {
              props.setLocation(e.latLng.lat(), e.latLng.lng());
            }}
          />
        );
      })
    ) : (
      <Marker
        position={props.center}
        icon={props.icon}
        draggable={true}
        animation={window.google.maps.Animation.DROP}
        onDragEnd={(e) => {
          props.setLocation(e.latLng.lat(), e.latLng.lng());
        }}
      />
    )}
    {props.showMyLoc && <Marker position={props.currLoc} icon={props.icon} />}
  </GoogleMap>
));

export default MapLocation;
