import React, { Component } from "react";
import { Card } from "../../components";
import Location from "material-ui/svg-icons/maps/place";
import "./index.css";
import ProfileSection from "../../components/ProfileSection";
import img from "../../assets/people.jpg";
import Icon from "../../components/Icon";
// import IconButton from "material-ui/IconButton";

class Profile extends Component {
  render() {
    return (
      <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
        <div style={{ position: "relative" }}>
          <ProfileSection
            className="profileSection"
            imgStyle={imgStyle}
            cardStyles={cardStyles}
            imgSrc={img}
            nameStyle={nameStyle}
            locationStyle={locationStyle}
          />
          <Icon style={addIconStyle} action="image" name="add-a-photo" />
        </div>
        <div className="cardContainer" style={cardContainers}>
          <Card
            card={{
              style: {
                margin: "3%",
              },
            }}
            textChildren={
              <div className="cardWrapper">
                <div className="left">
                  <label>Name</label>
                  <br />
                  <span>Jaswinder</span>
                </div>
              </div>
            }
          />
          <Card
            card={{
              style: {
                margin: "3%",
              },
            }}
            textChildren={
              <div className="cardWrapper">
                <div className="left">
                  <label style={{ display: "block", marginBottom: "2%" }}>Address </label>
                  <span>#12,Model town,Ludhiana</span>
                </div>
                <div className="right">
                  <Location />
                </div>
              </div>
            }
          />
        </div>
      </div>
    );
  }
}

export default Profile;

const cardContainers = {
  backgroundColor: " #f2f2f2",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "350px",
  border: "1px solid #e6e6e6",
};

const imgStyle = { borderRadius: "50%", width: "35%", height: 116 };
const cardStyles = {
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 auto",
  paddingTop: 30,
  paddingBottom: 30,
  backgroundColor: "#e0e0e0",
};
const nameStyle = {
  display: "none",
};
const iconStyle = {
  height: "18px",
  width: "18px",
  paddingTop: 12,
};

const locationStyle = {
  display: "none",
};

const addIconStyle = {
  backgroundColor: "#73b332",
  position: "absolute",
  right: "30%",
  bottom: "20px",
};
