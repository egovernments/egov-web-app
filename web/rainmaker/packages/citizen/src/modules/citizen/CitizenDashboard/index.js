import React, { Component } from "react";
import SearchService from "./components/SearchService";
import ServiceList from "./components/ServiceList";
import { Screen } from "modules/common";
import Label from "egov-ui-kit/utils/translationNode";
import ServicesNearby from "./components/ServicesNearby";
import Notifications from "./components/Notifications";
import "./index.css";

const notifications = [
  {
    title: "Pay your Property Tax Dues before 31st March and get 10% rebate",
    buttons: [
      {
        label: "PAY NOW",
      },
    ],
    route: "property-tax",
    dueTime: "1 Day ago",
  },
  {
    title: "Trade License for Varna Textiles has been approved. Please pay your license fees and download your license certificate",
    buttons: [
      {
        label: "PAY NOW",
      },
    ],
    route: "tradelicense-citizen/home",
    dueTime: "1 Day ago",
  },
  {
    title: "Your complaint for Streetlight not working has been resolved. Please provide your valuable feedback.",
    buttons: [
      {
        label: "RATE",
      },
      {
        label: "RE-OPEN",
      },
    ],
    dueTime: "1 Day ago",
  },
];

class CitizenDashboard extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <SearchService />
        <div className="citizen-dashboard-cont">
          <Label
            label="DASHBOARD_CITIZEN_SERVICES_LABEL"
            fontSize={16}
            fontWeight={900}
            color="rgba(0, 0, 0, 0.87"
            containerStyle={{ paddingTop: 16, paddingBottom: 8 }}
          />
          <ServiceList history={history} />
          <Label
            label="DASHBOARD_LOCAL_INFORMATION_LABEL"
            fontSize={16}
            fontWeight={900}
            color="rgba(0, 0, 0, 0.87"
            containerStyle={{ paddingTop: 16, paddingBottom: 8 }}
          />
          <ServicesNearby />
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16 }}>
            <Label label="DASHBOARD_WHATS_NEW_LABEL" fontSize={16} fontWeight={900} color="rgba(0, 0, 0, 0.8700000047683716)" />
            <Label label="DASHBOARD_VIEW_ALL_LABEL" color="#fe7a51" fontSize={14} />
          </div>
          <Notifications notifications={notifications} history={history} />
        </div>
      </div>
    );
  }
}

export default CitizenDashboard;
