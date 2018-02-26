import React, { Component } from "react";
import { Image } from "../../../../components";

const styles = {
  logo: {
    display: "block",
    margin: "0 auto",
  },
};

class Banner extends Component {
  render() {
    return (
      <div className="row">
        <Image source="https://placeimg.com/600/300/arch" />
      </div>
    );
  }
}

export default Banner;
