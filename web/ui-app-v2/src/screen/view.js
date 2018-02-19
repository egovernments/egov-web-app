import React, { Component } from "react";
import { Button } from "../components";
import renderGroups from "./render-groups";

class View extends Component {
  componentDidMount() {
    const { search, searchUrl } = this.props;
    search(searchUrl);
  }

  render() {
    const { groups } = this.props;
    return <div className="row">{renderGroups(groups, "view")}</div>;
  }
}

export default View;
