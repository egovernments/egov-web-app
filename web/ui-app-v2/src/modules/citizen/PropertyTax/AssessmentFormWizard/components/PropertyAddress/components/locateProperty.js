import React, { Component } from "react";
import { connect } from "react-redux";
import { MapLocation, Button, Icon } from "components";
import pinIcon from "assets/Location_pin.svg";
import { handleFieldChange } from "redux/form/actions";
import isEmpty from "lodash/isEmpty";
// import "./index.css";

const pickBtn = {
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

class LocateProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMyAddress: false,
      currLoc: {},
      pickedLoc: {},
    };
  }

  componentDidMount() {
    var myLocation = { lat: 12.9279, lng: 77.6271 };
    //To set the map to any defined location.
    if (this.state.showMyAddress === true && myLocation) {
      this.setState({
        currLoc: myLocation,
      });
    }
  }

  //For Compass Click -- set map to current location
  getMyLocation = () => {
    const { currentLocation } = this.props;
    if (!isEmpty(currentLocation)) {
      const { lat, lng } = currentLocation;
      this.setState({
        currLoc: { lat: parseFloat(lat), lng: parseFloat(lng) },
      });
    } else if (navigator.geolocation) {
      // can be resused
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            currLoc: { lat: position.coords.latitude, lng: position.coords.longitude },
          });
        },
        function(error) {
          console.log(error.code);
        }
      );
    }
  };

  setPickedLocation = (lati, long) => {
    add.lat = lati;
    add.lng = long;
  };

  onClickPick = () => {
    this.convertToAddress(add);
    sessionStorage.setItem("backFromPTMap", true);
    this.props.history.goBack();
  };

  convertToAddress = (add) => {
    const { lat, lng } = add;
    this.setState({
      currLoc: {},
    });
    // lat && this.props.handleFieldChange(this.props.formKey, "latitude", parseFloat(lat).toFixed(6));
    // lng && this.props.handleFieldChange(this.props.formKey, "longitude", parseFloat(lng).toFixed(6));
    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat: lat, lng: lng } }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          //Results[0] gives the nearest address
          // this.props.handleFieldChange(this.props.formKey, "address", results[0].formatted_address);
          console.log(results[0].formatted_address);
        }
      }
    });
  };

  onCLickMapBackBtn = () => {
    sessionStorage.setItem("backFromPTMap", true);
    this.props.history.goBack();
  };

  render() {
    let { currLoc } = this.state;
    const { location } = this.props;
    var _currloc = { lat: 12.972442, lng: 77.580643 };
    return (
      <div>
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
            onClick={this.onCLickMapBackBtn}
          />
        </div>
        <MapLocation
          currLoc={_currloc}
          setLocation={this.setPickedLocation}
          getMyLoc={this.getMyLocation}
          icon={pinIcon}
          hideTerrainBtn={true}
          dragInfoBox={false}
          viewLocation={false}
        />
        <div className="pickBtn">
          <Button
            id="map-pick-button"
            className="pick"
            label={"Pick"}
            style={pickBtn}
            primary={true}
            labelColor="#ffffff"
            onClick={this.onClickPick}
          />
        </div>
      </div>
    );
  }
}

export default LocateProperty;
