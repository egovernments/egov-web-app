import React, { Component } from "react";
import { Tabs, Label, Button, Icon } from "../../../components";
import Screen from "../../common/Screen";
import Complaints from "../../common/Complaints";
import Garbage_1 from "../../../assets/images/Garbage_1.jpg";
import Garbage_2 from "../../../assets/images/Garbage_2.jpg";
import Garbage_3 from "../../../assets/images/Garbage_3.jpg";
import Potholes_1 from "../../../assets/images/Potholes_1.png";
import Potholes_2 from "../../../assets/images/Potholes_2.jpg";
import Potholes_3 from "../../../assets/images/Potholes_3.jpg";
import "./index.css";

class AllComplaints extends Component {
  constructor(props) {
    super(props);
    this.allComplaints = [
      {
        reassign: false,
        header: "Potholes on the road",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "2 days left",
        complaintStatus: "UNASSIGNED",
        assignedTo: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Potholes_1,
          },
          {
            source: Potholes_2,
          },
          {
            source: Potholes_3,
          },
        ],
      },
      {
        reassign: true,
        header: "Garbage",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "Overdue by 1 day",
        complaintStatus: "UNASSIGNED",
        assignedTo: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Garbage_1,
          },
          {
            source: Garbage_2,
          },
          {
            source: Garbage_3,
          },
        ],
      },
      {
        reassign: false,
        header: "Potholes on the road",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "2 days left",
        complaintStatus: "UNASSIGNED",
        assignedTo: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Potholes_1,
          },
          {
            source: Potholes_2,
          },
          {
            source: Potholes_3,
          },
        ],
      },
      {
        reassign: false,
        header: "Garbage",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "Overdue by 1 day",
        complaintStatus: "ASSIGNED",
        assignedTo: "Jasbir Singh",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Garbage_1,
          },
          {
            source: Garbage_2,
          },
          {
            source: Garbage_3,
          },
        ],
      },
      {
        reassign: false,
        header: "Potholes on the road",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "2 days left",
        complaintStatus: "ASSIGNED",
        assignedTo: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Potholes_1,
          },
          {
            source: Potholes_2,
          },
          {
            source: Potholes_3,
          },
        ],
      },
    ];

    this.employeeComplaints = [
      {
        reassign: false,
        header: "Potholes on the road",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "2 days left",
        complaintStatus: "ASSIGNED",
        assignee: "Dharmendra Pal",
        submittedBy: "Shivani",
        escalatedTo: "Dept 1 Head",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Potholes_1,
          },
          {
            source: Potholes_2,
          },
          {
            source: Potholes_3,
          },
        ],
      },
      {
        reassign: true,
        header: "Garbage",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "Overdue by 1 day",
        complaintStatus: "ASSIGNED",
        submittedBy: "Shrinivas",
        assignee: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Garbage_1,
          },
          {
            source: Garbage_2,
          },
          {
            source: Garbage_3,
          },
        ],
      },
      {
        reassign: false,
        header: "Potholes on the road",
        date: "18-Mar-18",
        address: "Koramangla",
        status: "2 days left",
        complaintStatus: "ASSIGNED",
        submittedBy: "Rajeev",
        assignee: "Dharmendra Pal",
        complaintNo: "ARN 180311-05",
        images: [
          {
            source: Potholes_1,
          },
          {
            source: Potholes_2,
          },
          {
            source: Potholes_3,
          },
        ],
      },
    ];
  }

  state = {
    complaints: [],
    role: "ao",
  };

  componentDidMount() {
    let { allComplaints, employeeComplaints } = this;
    const filteredComplaints =
      this.state.role === "ao"
        ? allComplaints.filter((complaint) => {
            return complaint.complaintStatus === "UNASSIGNED";
          })
        : employeeComplaints;
    this.setState({
      complaints: filteredComplaints,
    });
  }

  handleTabChange = (label) => {
    let { allComplaints } = this;
    const filteredComplaints = allComplaints.filter((complaint) => {
      return complaint.complaintStatus === label.props.label.split(" ")[0];
    });

    this.setState({ complaints: filteredComplaints });
  };

  render() {
    let { escalated } = this;
    const tabStyle = {
      letterSpacing: "0.6px",
    };
    return this.state.role === "ao" ? (
      <Tabs
        onActive={this.handleTabChange}
        tabs={[
          {
            label: <Label color={"#ffffff"} bold={true} label="UNASSIGNED (10)" labelStyle={tabStyle} />,
            children: (
              <Screen>
                <div className="tab1-content">
                  <Complaints complaints={this.state.complaints} complaintLocation={true} role={this.state.role} />
                </div>
              </Screen>
            ),
          },
          {
            label: <Label color={"#ffffff"} bold={true} label="ASSIGNED (12)" labelStyle={tabStyle} />,
            children: (
              <Screen>
                <div className="tab2-content">
                  <Complaints complaints={this.state.complaints} complaintLocation={true} role={this.state.role} />
                </div>
              </Screen>
            ),
          },
        ]}
      />
    ) : (
      <Screen>
        <Complaints complaints={this.state.complaints} role={this.state.role} complaintLocation={true} />
      </Screen>
    );
  }
}

export default AllComplaints;
