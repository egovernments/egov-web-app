import React, { Component } from "react";
import SearchService from "./components/SearchService";
import ServiceList from "./components/ServiceList";
import "./index.css";

class CitizenDashboard extends Component {
  render() {
    return (
      <div style={{ padding: 8, marginTop: 60 }}>
        <SearchService />
        <ServiceList />
      </div>
    );
  }
}

export default CitizenDashboard;
