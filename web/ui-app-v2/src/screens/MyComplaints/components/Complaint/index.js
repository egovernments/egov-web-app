import React from "react";
import { Image, Card, Icon } from "../../../../components";
import FlatButton from "material-ui/FlatButton";
import { withRouter } from "react-router-dom";
import "./index.css";

const imageStyles = {
  minHeight: "106px",
};
const getStatusAndChangeColor = (status) => {
  let style = {};
  switch (status) {
    case "OPEN":
      style = {
        color: "#d84f41",
      };
      break;
    case "CLOSE":
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

const Complaint = ({ index, item, history }) => {
  return (
    <div id={"complaint-" + index} className="complaints-card-main-cont">
      <Card
        card={{ padding: 0 }}
        className="complaint-card"
        textChildren={
          <div className="complaint-card-wrapper">
            <div className="complaint-header-cont">
              <span className="complaint-header text-bold dark-color">{item.header}</span>
              <FlatButton
                onClick={(e) => {
                  if (item.status == "ASSIGNED") {
                    history.push("/complaint-details?status=assigned");
                  } else if (item.status == "REJECTED") {
                    history.push("/complaint-details?status=rejected");
                  }
                }}
                className="complaint-track-button"
                backgroundColor="transparent"
                label={"Track"}
                style={{
                  border: "1px solid #f5a623",
                  height: "auto",
                  lineHeight: "auto",
                  padding: "5px 5px",
                  minWidth: "inherit",
                }}
                labelStyle={{
                  color: "#f5a623",
                  padding: 0,
                  letterSpacing: "0.3px",
                }}
                hoverColor="none"
              />
            </div>
            <div className="complaint-address-cont">
              <Icon action="maps" name="place" />
              <span className="complaint-address">{item.address}</span>
            </div>
            <div className="complaint-status-cont">
              <span className="complaint-status-text dark-color text-bold">
                Status :
                <span className="text-bold" style={getStatusAndChangeColor(item.status)}>{` ${item.status}`}</span>
              </span>
            </div>
            <div className="complaint-image-cont">
              {item.images.map((image, index) => {
                return (
                  <div className="complaint-image-wrapper" key={index}>
                    <Image style={imageStyles} className="complaint-image" width="100%" height={46} source={image.source} />{" "}
                  </div>
                );
              })}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default withRouter(Complaint);
