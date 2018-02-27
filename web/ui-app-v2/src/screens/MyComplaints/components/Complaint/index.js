import React, { Component } from "react";
import { Card } from "../../../../components";
import { Image } from "../../../../components";
import complaintImage from "../../../../assets/people.jpg";
import FlatButton from "material-ui/FlatButton";
import "./index.css";
import Location from "material-ui/svg-icons/maps/place";

const Complaint = ({ item }) => {
  const iconStyle = {
    marginRight: 24,
    height: "24px",
    width: "24px",
  };
  return (
    <div className="complaints-card-main-cont home-page-content-card-margin">
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
              <span className="complaint-header">{item.header}</span>
              <FlatButton
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
              <span className="complaint-address">{item.address}</span>
            </div>
            <div className="complaint-status-cont">
              <span className="complaint-status-text">
                Status :
                <span style={item.status === "CLOSED" ? { color: "#55970a" } : { color: "#d84f41" }}>{` ${item.status}`}</span>
              </span>
            </div>
            <div className="complaint-image-cont">
              {item.images.map((image, index) => {
                console.log(image);
                return <Image key={index} className="complaint-image" width="31%" height={46} source={image.source} />;
              })}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Complaint;
