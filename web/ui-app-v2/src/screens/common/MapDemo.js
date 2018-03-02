import React, { Component } from "react";
import MapLocation from "../../components/MapLocation";
import RaisedButton from "../../components/Button";
import pinIcon from "../../assets/mapPin.png";
import _ from "lodash";

class MapDemo extends Component {
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
  }

  setPickedLocation(lat, lng, index) {
    if (_.isUndefined(index)) index = 0;
    console.log(lat, lng, index);
  }

  onClickPick() {
    console.log("picked");
  }

  render() {
    return (
      <div>
        <MapLocation currLoc={this.state.currLoc} styles={styles} setLocation={this.setPickedLocation} icon={pinIcon} />
        <div style={{ width: "100%" }}>
          <RaisedButton label={"Close"} style={closeBtn} backgroundColor="#969696" labelColor="#ffffff" />
          <RaisedButton label={"Pick"} style={pickBtn} primary={true} labelColor="#ffffff" onClick={this.onClickPick} />
        </div>
      </div>
    );
  }
}

export default MapDemo;

const styles = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `65%`,
  height: `32px`,
  marginTop: `10px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
};

const closeBtn = {
  width: "40.6%",
  // height: "40px",
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
