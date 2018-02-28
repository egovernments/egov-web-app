import React, { Component } from "react";
import { Card } from "../../components";
import Location from "material-ui/svg-icons/maps/place";
import "./index.css";
const cardContainers = {
  backgroundColor: " #f2f2f2",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "350px",
  border: "1px solid #e6e6e6",
};
class Profile extends Component {
  render() {
    return (
      <div className="col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8">
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
