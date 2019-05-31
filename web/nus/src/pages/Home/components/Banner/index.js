import React from "react";
import Slider from "react-slick";
import sliderbanner from "../../../../assets/slider-banner.jpg";
import bannertwo from "../../../../assets/banner2.jpeg";
import bannerthree from "../../../../assets/banner3.jpeg";
//import color from "@material-ui/core/colors/lightBlue";
import "./index.css";
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
      margin: "0px 0px 0px 10px",
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
              <div className="mainDiv">
                <div className="head">National Urban Stack</div>
                <div className="content">
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
              <div className="mainDiv">
                <div className="head">National Urban Stack</div>
                <div className="content">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries.
                </div>
              </div>
              <img style={{ width: "100%", height: "400px" }} src={bannertwo} />
            </div>
          </div>
          <div style={{ padding: "0" }}>
            <div style={{ position: "relative" }}>
              <div className="mainDiv">
                <div className="head">National Urban Stack</div>
                <div className="content">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries.
                </div>
              </div>
              <img
                style={{ width: "100%", height: "400px" }}
                src={bannerthree}
              />
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
export default Banner;
