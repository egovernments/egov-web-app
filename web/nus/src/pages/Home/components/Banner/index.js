import React from "react";
import Slider from "react-slick";
import banner1 from "../../../../utils/banner1.jpeg";
import banner2 from "../../../../utils/banner2.jpeg";
import banner3 from "../../../../utils/banner3.jpeg";
import color from "@material-ui/core/colors/lightBlue";

class Banner extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000
    };
    return (
      <div>
        <Slider {...settings}>
          <div style={{ padding: "0", overflow: "hidden" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "30px",
                  top: "80px",
                  width: "570px",
                  height: "200px",
                  background: "#ffffff",
                  color: "black",
                  textAlign: "center"
                }}
                National
                Urban
                Stack
              />
              <img style={{ width: "100%", height: "80vh" }} src={banner1} />
            </div>
          </div>
          <div style={{ padding: "0" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "30px",
                  top: "80px",
                  width: "570px",
                  height: "200px",
                  background: "#ffffff"
                }}
              />
              <img style={{ width: "100%", height: "80vh" }} src={banner2} />
            </div>
          </div>
          <div style={{ padding: "0" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "30px",
                  top: "80px",
                  width: "570px",
                  height: "200px",
                  background: "#ffffff"
                }}
              />
              <img style={{ width: "100%", height: "80vh" }} src={banner3} />
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

export default Banner;
