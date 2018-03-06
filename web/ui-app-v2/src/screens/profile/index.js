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
        <div className="profileCardContainer">
          <Card
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
          <Button primary={true} label="next" fullWidth={true} style={{ marginTop: "20px" }} />
        </div>
      </div>
    );
  }
}

export default Profile;

const imgStyle = { width: "40%", height: 143 };

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

const addIconStyle = {
  backgroundColor: "#73b332",
  position: "absolute",
  right: "30%",
  bottom: "20px",
};
