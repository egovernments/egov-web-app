import React from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.css";

const CarouselUI = ({ items, centerSlidePercentage, centerMode }) => {
  return (
    <Carousel showArrows={false} showThumbs={false} showStatus={false} centerMode={centerMode} centerSlidePercentage={centerSlidePercentage}>
      {items.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </Carousel>
  );
};

export default CarouselUI;
