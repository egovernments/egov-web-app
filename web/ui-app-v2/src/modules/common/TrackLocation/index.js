import React, { Component } from "react";
import { connect } from "react-redux";
import { MapLocation, Button, Icon } from "../../../components";
import pinIcon from "../../../assets/Location_pin.svg";
import { handleFieldChange } from "redux/form/actions";
import _ from "lodash";
import "./index.css";

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

class TrackLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMyAddress: false,
      currLoc: { lat: 12.9715987, lng: 77.5945699998 },
      showMyLoc: false,
      pickedLoc: {},
      formKey: window.location.href.split("?")[1],
    };
    this.formConfig = require("config/forms/complaint").default;
    console.log(window.location.href.split("?")[1], this.state.formKey);
  }

  componentDidMount() {
    var myLocation = { lat: 12.9279, lng: 77.6271 };
    if (this.state.showMyAddress === true && myLocation) {
      this.setState({
        currLoc: myLocation,
      });
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          currLoc: { lat: position.coords.latitude, lng: position.coords.longitude },
        });
      });
    }
  }

  getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            currLoc: { lat: position.coords.latitude, lng: position.coords.longitude },
            showMyLoc: true,
          });
        },
        function(error) {
          //use error.code to determine what went wrong
        }
      );
    }
  };

  setPickedLocation = (lati, long, index) => {
    if (_.isUndefined(index)) index = 0;
    console.log(lati, long, index);

    this.convertToAddress(lati, long);
  };

  convertToAddress = (lati, long) => {
    this.props.handleFieldChange(this.state.formKey, "latitude", lati.toFixed(6));
    this.props.handleFieldChange(this.state.formKey, "longitude", long.toFixed(6));
    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat: lati, lng: long } }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          console.log(results[0].formatted_address);
          this.props.handleFieldChange(this.state.formKey, "address", results[0].formatted_address);
        }
      }
    });
  };

  onClickPick = () => {
    console.log("picked your location");
    window.history.back();
  };

  onCLickMapBackBtn = () => {
    // Redirect back from where you came.
    window.history.back();
  };

  render() {
    var _currloc = { lat: parseFloat(this.state.currLoc.lat), lng: parseFloat(this.state.currLoc.lng) };
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
          showMyLoc={this.state.showMyLoc}
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

const mapStateToProps = (state) => {
  return {
    formKey: window.location.href.split("?")[1],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
  };
};

export default connect(null, mapDispatchToProps)(TrackLocation);
