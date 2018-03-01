import React, { Component } from "react";
import { Card, Button, Label, Icon } from "../../components";
import Track from "material-ui/svg-icons/maps/my-location";
import FlatButton from "material-ui/FlatButton";
import "./index.css";
import ProfileSection from "../../components/ProfileSection";
import img from "../../assets/people.jpg";

class Profile extends Component {
  handleLocation = () => {
    window.location.pathname = "/map";
  };
  onClickAddPic = () => {
    console.log("clicked");
  };

  render() {
    return (
      <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8" style={{ padding: "0px" }}>
        <div style={{ position: "relative" }}>
          <ProfileSection className="profileSection" imgStyle={imgStyle} cardStyles={cardStyles} imgSrc={img} />
          <Icon style={addIconStyle} action="image" name="add-a-photo" onClick={this.onClickAddPic} />
        </div>
        <div className="profileCardContainer" style={profileCardContainer}>
          <Card
            card={{
              style: {
                margin: "3%",
              },
            }}
            textChildren={
              <div className="wrapper">
                <div className="left">
                  <Label className="label" label={"Name"} color={"#6090ae"} />
                  <Label className="name" label={"Jaswinder"} color={"#484848"} />
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
              <div className="wrapper">
                <div className="left">
                  <Label className="label" label={"Address"} color={"#6090ae"} />
                  <Label className="name" label={"#12,Model town,Ludhiana"} color={"#484848"} />
                </div>
                <div className="right">
                  <Icon onClick={this.handleLocation} name="my-location" action="maps" color="#73aacc" />
                </div>
              </div>
            }
          />
          <Button primary={true} label="next" style={{ width: "95%", margin: "28% 2% 5% 2%" }} />
        </div>
      </div>
    );
  }
}

export default Profile;

const profileCardContainer = {
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

const iconStyle = {
  height: "18px",
  width: "18px",
  paddingTop: 12,
};

const addIconStyle = {
  backgroundColor: "#73b332",
  position: "absolute",
  right: "30%",
  bottom: "20px",
};

const labelStyle = {};
