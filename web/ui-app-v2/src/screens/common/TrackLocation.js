import React, { Component } from "react";
import { MapLocation } from "../../components";
import Button from "../../components/Button";
import pinIcon from "../../assets/Location_pin.svg";
import _ from "lodash";

const searchBoxStyles = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `91.1%`,
  height: `45px`,
  marginTop: `106px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `16px`,
  outline: `none`,
  textOverflow: `ellipses`,
  fontFamily: "Roboto",
  letterSpacing: "0px",
  textAlign: "left",
  color: "#484848",
  paddingLeft: 48,
};
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
    };
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
  setPickedLocation(lat, lng, index) {
    if (_.isUndefined(index)) index = 0;
    console.log(lat, lng, index);
  }
  onClickPick() {
    console.log("picked");
  }
  onCLickMapBackBtn = () => {
    // Redirect back from where you came.
  };

  render() {
    var _currloc = { lat: parseFloat(this.state.currLoc.lat), lng: parseFloat(this.state.currLoc.lng) };
    return (
      <div>
        <MapLocation
          currLoc={_currloc}
          searchBoxStyles={searchBoxStyles}
          setLocation={this.setPickedLocation}
          getMyLoc={this.getMyLocation}
          icon={pinIcon}
          hideTerrainBtn={true}
          dragInfoBox={false}
          showMyLoc={this.state.showMyLoc}
        />
        <div
          style={{
            width: "100%",
            position: "fixed",
            bottom: 56,
            height: 56,
            padding: "9px 16px 0 16px",
            backgroundColor: "rgb(255, 255, 255, 0.63)",
            boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.1), 0 -2px 5px 0 rgba(0, 0, 0, 0)",
          }}
        >
          <Button className="pick" label={"Pick"} style={pickBtn} primary={true} labelColor="#ffffff" onClick={this.onClickPick} />
        </div>
      </div>
    );
  }
}

export default TrackLocation;
