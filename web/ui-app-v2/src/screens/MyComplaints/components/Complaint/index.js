import React, { Component } from "react";
import { Card, Label, Icon } from "../../../../components";
import { Image } from "../../../../components";
import complaintImage from "../../../../assets/people.jpg";
import FlatButton from "material-ui/FlatButton";
import "./index.css";

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
          
        }}
        textChildren={
          <div className="complaint-card-wrapper">
            <div className="complaint-header-cont">
              <span className="complaint-header">{item.header}</span>
              <FlatButton
                className="complaint-track-button"
                backgroundColor="transparent"
                label={"Track"}
                style={{
                  border: "1px solid orange",
                  height: "auto",
                  lineHeight: "auto",
                  padding: "5px 5px",
                  minWidth: "inherit",
                }}
                labelStyle={{
                  color: "orange",
                  padding: 0,
                  letterSpacing: "1px",
                }}
                hoverColor="none"
              />
            </div>
            <div className="complaint-address-cont">
              <Icon action="maps" name="place" />
              <span className="complaint-address">{item.address}</span>
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
