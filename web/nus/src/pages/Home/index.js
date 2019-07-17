import React from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Menu from "./components/Menu";
import About from "./components/About";
import Explore from "./components/Explore";
import How from "./components/How";
import Testimonials from "./components/Testimonials";
import WhatNew from "./components/WhatNew";
import Footer from "./components/Footer";
const menuItems = [
  { label: "HOME",target:"#homeSection" },
  { label: "ABOUT US" ,target:"#aboutNusNewSection"},
  { label: "CORE COMPONENTS",target:"#coreComponentsSection" },
  { label: "IMPLEMENTATION PLAN",target:"#implementaionPlanSection" },
  // { label: "TESTIMONIALS" },
  { label: "NEWS & GALLERY",target:"#whatNewSection" },
  { label: "CASE STUDIES",target:"#whatNewSection" }
];

class Home extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: " #F4F7FB",
          display:"flex",
          flexDirection:"column"
        }}
      >
        <Header />
        <Menu menuItems={menuItems} />
        <Banner />
        <About />
        <Explore />
        <How />
        {/*<Testimonials />*/}
        <WhatNew />
        <Footer />
      </div>
    );
  }
}

export default Home;
