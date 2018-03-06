import React, { Component } from "react";
import { Card, Label } from "../../../../components";
import { Image } from "../../../../components";
import complaintImage from "../../../../assets/people.jpg";
import FlatButton from "material-ui/FlatButton";
import "./index.css";
import Location from "material-ui/svg-icons/maps/place";

const getStatusAndChangeColor = (status) => {
  let style = {};
  switch (status) {
    case "OPEN":
      style = {
        color: "#d84f41",
      };
      break;
    case "CLOSED":
      style = {
        color: "#55970a",
      };
      break;
    default:
      style = {
        color: "#484848",
      };
  }
  return style;
};

const Complaint = ({ index, item }) => {
  return (
    <div id={"complaint-" + index} className="complaints-card-main-cont home-page-content-card-margin">
      <Card
        card={{
          style: {
            backgroundColor: "#ffffff",
          },
        }}
        text={{
          style: {
            paddingTop: 0,
            paddingBottom: 0,
          },
        }}
        textChildren={
          <div className="complaint-card-wrapper">
            <div className="complaint-header-cont">
              <Label label={item.header} className="complaint-header" />
              <FlatButton
                className="track"
                backgroundColor="transparent"
                label={"Track"}
                style={{
                  border: "1px solid orange",
                  height: "auto",
                  lineHeight: "auto",
                  padding: "5px 5px",
                }}
                labelStyle={{
                  color: "orange",
                  padding: 0,
                }}
                hoverColor="none"
              />
            </div>
            <div className="complaint-address-cont">
              <Location className="location-marker" />
              <Label label={item.address} className="complaint-address" />
            </div>
            <div className="complaint-status-cont">
              <span className="complaint-status-text">
                Status :
                <span style={getStatusAndChangeColor(item.status)}>{` ${item.status}`}</span>
              </span>
            </div>
            <div className="complaint-image-cont">
              {item.images.map((image, index) => {
                return <Image key={index} className="complaint-image" width="32%" height={46} source={image.source} />;
              })}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Complaint;
