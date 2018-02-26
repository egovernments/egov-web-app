import React, { Component } from "react";
import { Image } from "../../../../components";

const styles = {
  container: {
    position: "relative",
    height: `200px`,
    backgroundImage: `url(https://amedia.britannica.com/700x450/53/176353-004-58581F75.jpg)`,
  },
  logo: {
    position: "absolute",
    left: "40%",
    top: "25%",
  },
};

class Banner extends Component {
  render() {
    return (
      <div style={styles.container} className="row">
        <div />
        <Image style={styles.logo} circular={true} source="https://placeimg.com/100/100/tech" />
      </div>
    );
  }
}

export default Banner;
