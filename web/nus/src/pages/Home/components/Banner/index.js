import React from "react";
import Slider from "react-slick";
import sliderbanner from "../../../../assets/slider-banner.jpg";
import banner2 from "../../../../assets/banner2.jpeg";
import banner3 from "../../../../assets/banner3.jpeg";
//import color from "@material-ui/core/colors/lightBlue";

class Banner extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      margin: "0px px 0px 10px",
      paddingTop: "15px",
      paddingRight: "15px",
      paddingleft: "15px",
      paddingBottom: "15px"
    };
    return (
      <div>
        <Slider {...settings}>
          <div style={{ padding: "0", overflow: "hidden" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "50px",
                  top: "100px",
                  width: "400px",
                  height: "150px",
                  background: "#ffffff",
                  padding: "16px"
                }}
              >
                <div
                  style={{
                    color: "black",
                    textAlign: "left",
                    fontSize: "34px",
                    fontFamily: "Montserrat"
                  }}
                >
                  National Urban Stack
                </div>
                <div
                  style={{
                    color: "black",
                    textAlign: "left",
                    fontSize: "14px",
                    fontFamily: "Montserrat"
                  }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries.
                </div>
              </div>
              <img
                style={{
                  width: "100%",
                  height: "400px",
                  marginBottom: "20px",
                  left: "0px",
                  top: "142px"
                  // width: "1000px",
                  // height: "400px"
                }}
                src={sliderbanner}
              />
            </div>
          </div>
          <div style={{ padding: "0" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "50px",
                  top: "100px",
                  width: "400px",
                  height: "150px",
                  background: "#ffffff",
                  padding: "16px"
                }}
              >
                <div
                  style={{
                    color: "black",
                    textAlign: "left",
                    fontSize: "34px",
                    fontFamily: "Montserrat"
                  }}
                >
                  National Urban Stack
                </div>
                <div
                  style={{
                    color: "black",
                    textAlign: "left",
                    fontSize: "14px",
                    fontFamily: "Montserrat"
                  }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries.
                </div>
              </div>
              <img style={{ width: "100%", height: "400px" }} src={banner2} />
            </div>
          </div>
          <div style={{ padding: "0" }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "50px",
                  top: "100px",
                  width: "400px",
                  height: "150px",
                  background: "#ffffff",
                  padding: "16px"
                }}
              >
                <div
                  style={{
                    color: "black",
                    textAlign: "left",
                    fontSize: "34px",
                    fontFamily: "Montserrat"
                  }}
                >
                  National Urban Stack
                </div>
                <div
                  style={{
                    color: "black",
                    textAlign: "left",
                    fontSize: "14px",
                    fontFamily: "Montserrat"
                  }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries.
                </div>
              </div>
              <img style={{ width: "100%", height: "400px" }} src={banner3} />
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

export default Banner;
