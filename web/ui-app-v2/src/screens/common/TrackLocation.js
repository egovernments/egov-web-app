import React, { Component } from "react";
import MapLocation from "../../components/MapLocation";
import Button from "../../components/Button";
import pinIcon from "../../assets/mapPin.png";
import _ from "lodash";

class TrackLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMyAddress: false,
      currLoc: {},
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
    // window.onload = function() {
    //   var startPos;
    //   var geoSuccess = function(position) {
    //     startPos = position;
    //     console.log(startPos);
    //   };
    //   var geoError = function(error) {
    //     console.log("Error occurred. Error code: " + error.code);
    //   };
    //   navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    // };
  }

  setPickedLocation(lat, lng, index) {
    if (_.isUndefined(index)) index = 0;
    console.log(lat, lng, index);
  }

  getMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var currLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
          alert(JSON.stringify(currLoc));
        },
        function(error) {
          //use error.code to determine what went wrong
        }
      );
    }
  }
  onClickPick() {
    console.log("picked");
  }

  render() {
    var _currloc = { lat: parseFloat(this.state.currLoc.lat), lng: parseFloat(this.state.currLoc.lng) };
    console.log(_currloc);
    return (
      <div>
        <MapLocation
          currLoc={_currloc}
          styles={styles}
          setLocation={this.setPickedLocation}
          getMyLoc={this.getMyLocation}
          icon={pinIcon}
          hideTerrainBtn={true}
        />
        <div style={{ width: "100%", position: "absolute", bottom: 56 }}>
          <Button className="close" label={"Close"} style={closeBtn} backgroundColor="#969696" labelColor="#ffffff" />
          <Button className="pick" label={"Pick"} style={pickBtn} primary={true} labelColor="#ffffff" onClick={this.onClickPick} />
        </div>
      </div>
    );
  }
}

export default TrackLocation;

const styles = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `91.1%`,
  height: `45px`,
  marginTop: `74px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
};

const closeBtn = {
  width: "40.6%",
  height: "56px",
  lineHeight: "56px",
  backgroundColor: "#969696",
  marginLeft: "5.7%",
  marginRight: "2.8%",
  marginTop: 10,
  color: "#ffffff",
  fontFamily: "Roboto",
  fontSize: "7px",
  fontWeight: 500,
  fontStyle: "normal",
};
const pickBtn = { width: "40.6%", marginTop: 10, backgroundColor: "#f5a623", marginRight: "5.7%", marginLeft: "2.8%", color: "#ffffff" };
