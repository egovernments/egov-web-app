import React, { Component } from "react";
import { Image } from "../../../../components";
import "./index.css";

class Banner extends Component {
  render() {
    return (
      <div className="banner" >
        <div className="overlay" />
        <Image className="logo" circular={true} source="https://lh3.googleusercontent.com/wD-6OqDafrx6DAgJDGarnGF4B6KrG7EGnHBAiWr18drml_IntNgyibMv17OxqifPYb88Y7WQyTCpEmTF7L1PQ3uePpsNuXILtPDl-GKcXqEh3BpSENQEfKT9xxqWTQulUnFD-VpXI9NJtxZYzSnRR9qCX2YPTGdXk0mlMfK8qjBY03-prrF10NzjN3zoAy6XMf8ph40KmWkEAEvzzbn6vtmPiy-st2JYtI6lRi0Tfd4xj74hMn17BNOXF6-evRGjyW8nSdpy21kQ3Oe1Nnt4Z80nt0-2-CAWN5FoMw_IsWkq5ydIA0J0qaYEgHOT_Y9DeOyIogQ7F0yuFwo8JjZWgcw82SOel-oKcDkjzFQwdj2JiJmuiDx64HGTPt6i_VvwWwzTDaDV0jL3rJdAH59e49U5Ffr3xVNF1CvI_77jE0R4S6ck_6ZAlv7bbNjQRUS9N1B-SG7d10cBMcytAhZVyQDPvBXUqxcRl1heJXuwhKufTMb_UbVBoogTIE7HgvR5Zv7zQ0PDqz_MgwemZJ_6Kp5xyGxgwA4V-r6MsaeqzccWoevaTf_lHwt6fA=w1280-h703" />
      </div>
    );
  }
}

export default Banner;
