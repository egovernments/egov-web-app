import React, { Component } from "react";
import { Icon } from "components";
import { AssessPay } from "modules/common";

const list1items = {
  icon: <Icon action="communication" name="business" />,
  label: "Assess New Property",
};

class PTHome extends Component {
  render() {
    const { history } = this.props;
    return <AssessPay list1items={list1items} hasbreadCrumbs={false} history={history} />;
  }
}

export default PTHome;
