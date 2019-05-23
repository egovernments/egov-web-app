import React from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Banner from "./components/Banner";
import About from "./components/About";
import Explore from "./components/Explore";
import How from "./components/How";
import Testimonials from "./components/Testimonials";
import WhatNew from "./components/WhatNew";
import Footer from "./components/Footer";


class Home extends React.Component {
  render()
  {
    return(
      <div>
        <Header/>
        <Menu/>
        <Banner/>
        <About/>
        <Explore/>
        <How/>
        <Testimonials/>
        <WhatNew/>
        <Footer/>
      </div>
    );
  }
}

export default Home;
