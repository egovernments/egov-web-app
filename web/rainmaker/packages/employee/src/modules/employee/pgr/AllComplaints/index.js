import React, { Component } from "react";
import { Tabs, Card, TextField, Icon, Button } from "components";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { Screen } from "modules/common";
import { Complaints } from "modules/common";
import { fetchComplaints } from "egov-ui-kit/redux/complaints/actions";
import Label from "egov-ui-kit/utils/translationNode";
import { transformComplaintForComponent, fetchFromLocalStorage } from "egov-ui-kit/utils/commons";
import { httpRequest } from "egov-ui-kit/utils/api";
import { connect } from "react-redux";
import orderby from "lodash/orderBy";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import "./index.css";

class AllComplaints extends Component {
  state = {
    complaintNo: "",
    mobileNo: "",
    complaints: [],
    search: false,
    value: 0,
  };

  componentDidMount = async () => {
    let { role, userInfo, numCSRComplaint, numEmpComplaint, renderCustomTitle } = this.props;
    let rawRole = userInfo && userInfo.roles && userInfo.roles[0].code.toUpperCase();
    //const numberOfComplaints = role === "employee" ? numEmpComplaint : role === "csr" ? numCSRComplaint : 0;
    if (rawRole === "PGR-ADMIN") {
      this.props.history.push("/report/rainmaker-pgr/DepartmentWiseReport");
    } else {
      let { fetchComplaints } = this.props;
      fetchComplaints([{ key: "status", value: "assigned,open,reassignrequested" }], true, true);
      const complaintCountRequest = [
        { key: "tenantId", value: fetchFromLocalStorage("tenant-id") },
        { key: "status", value: role === "csr" ? "assigned,open,reassignrequested" : "assigned,reassignrequested" },
      ];
      let payloadCount = await httpRequest("rainmaker-pgr/v1/requests/_count", "_search", complaintCountRequest);
      payloadCount ? (payloadCount.count ? renderCustomTitle(payloadCount.count) : renderCustomTitle("0")) : renderCustomTitle("0");
    }
  };

  // componentWillReceiveProps = (nextProps) => {
  //   const { role, numCSRComplaint, numEmpComplaint, renderCustomTitle } = this.props;
  //   if (!isEqual(this.props.transformedComplaints, nextProps.transformedComplaints)) {
  //     const numberOfComplaints = role === "employee" ? nextProps.numEmpComplaint : role === "csr" ? nextProps.numCSRComplaint : 0;
  //     renderCustomTitle(numberOfComplaints);
  //   }
  // };

  onComplaintClick = (complaintNo) => {
    this.props.history.push(`/complaint-details/${complaintNo}`);
  };

  onComplaintChange = (e) => {
    const inputValue = e.target.value;
    this.setState({ complaintNo: inputValue });
  };

  onMobileChange = (e) => {
    const inputValue = e.target.value;
    this.setState({ mobileNo: inputValue });
  };

  onSearch = () => {
    const { complaintNo, mobileNo } = this.state;
    const { fetchComplaints } = this.props;
    let queryObj = [];
    if (complaintNo) {
      queryObj.push({ key: "serviceRequestId", value: complaintNo });
    }
    if (mobileNo) {
      queryObj.push({ key: "phone", value: mobileNo });
    }

    if (complaintNo || mobileNo) {
      fetchComplaints(queryObj, true, true);
    }
    this.setState({ search: true });
  };

  clearSearch = () => {
    const { fetchComplaints } = this.props;
    fetchComplaints([{ key: "status", value: "assigned,open,reassignrequested" }]);
    this.setState({ mobileNo: "", complaintNo: "", search: false });
  };

  onChange = (value) => {
    this.setState({ value });
  };

  render() {
    const { loading, history } = this.props;
    const { mobileNo, complaintNo, search } = this.state;
    const tabStyle = {
      letterSpacing: "0.6px",
    };

    const { onComplaintClick } = this;
    const { assignedComplaints, unassignedComplaints, employeeComplaints, role, transformedComplaints } = this.props;
    const hintTextStyle = {
      letterSpacing: "0.7px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      width: "90%",
      overflow: "hidden",
    };
    return role === "ao" ? (
      <Tabs
        className="employee-complaints-tab"
        onChange={this.onChange}
        tabs={[
          {
            label: (
              <div className="inline-Localization-text">
                <Label
                  labelClassName="unassigned-label-text"
                  color={this.state.value === 0 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)"}
                  bold={true}
                  label={`ES_ALL_COMPLAINTS_UNASSIGNED_TAB_LABEL`}
                  labelStyle={tabStyle}
                />
                <Label
                  color={this.state.value === 0 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)"}
                  bold={true}
                  label={`(${unassignedComplaints.length})`}
                  labelStyle={tabStyle}
                />
              </div>
            ),
            children: (
              <Screen loading={loading}>
                <div className="tab1-content form-without-button-cont-generic">
                  <Complaints
                    noComplaintMessage={"ES_MYCOMPLAINTS_NO_COMPLAINTS_TO_ASSIGN"}
                    onComplaintClick={onComplaintClick}
                    complaints={unassignedComplaints}
                    complaintLocation={true}
                    role={role}
                    heightOffset="116px"
                  />
                </div>
              </Screen>
            ),
          },
          {
            label: (
              <div className="inline-Localization-text">
                <Label
                  labelClassName="assigned-label-text"
                  color={this.state.value === 1 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)"}
                  bold={true}
                  label={`ES_ALL_COMPLAINTS_ASSIGNED_TAB_LABEL`}
                  labelStyle={tabStyle}
                />
                <Label
                  color={this.state.value === 1 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)"}
                  bold={true}
                  label={`(${assignedComplaints.length})`}
                  labelStyle={tabStyle}
                />
              </div>
            ),
            children: (
              <Screen loading={loading}>
                <div className="tab2-content form-without-button-cont-generic">
                  <Complaints
                    noComplaintMessage={"ES_MYCOMPLAINTS_NO_ASSIGNED_COMPLAINTS"}
                    onComplaintClick={onComplaintClick}
                    complaints={assignedComplaints}
                    complaintLocation={true}
                    role={role}
                    heightOffset="116px"
                  />
                </div>
              </Screen>
            ),
          },
        ]}
      />
    ) : role === "csr" ? (
      <Screen loading={loading}>
        <div className="form-without-button-cont-generic">
          <Card
            id="complaint-search-card"
            className="complaint-search-main-card"
            textChildren={
              <div className="complaint-search-cont clearfix">
                <div className="col-xs-12" style={{ paddingLeft: 8 }}>
                  <Label label="Search Complaint" fontSize={16} dark={true} bold={true} />
                </div>
                <div className="col-sm-3 col-xs-12" style={{ paddingLeft: 8, paddingRight: 40 }}>
                  <TextField
                    id="mobile-no"
                    name="mobile-no"
                    type="number"
                    value={mobileNo}
                    hintText={<Label label="CORE_COMMON_MOBILE_NUMBER_PLACEHOLDER" color="#b3b3b3" fontSize={16} labelStyle={hintTextStyle} />}
                    floatingLabelText={<Label key={0} label="ES_CREATECOMPLAINT_MOBILE_NUMBER" color="#03b0c6" fontSize="12px" />}
                    onChange={(e, value) => this.onMobileChange(e)}
                    underlineStyle={{ bottom: 7 }}
                    underlineFocusStyle={{ bottom: 7 }}
                    hintStyle={{ width: "100%" }}
                  />
                </div>
                <div className="col-sm-3 col-xs-12" style={{ paddingLeft: 8 }}>
                  <TextField
                    id="complaint-no"
                    name="complaint-no"
                    value={complaintNo}
                    hintText={<Label label="ES_MYCOMPLAINTS_COMPLAINT_NO" color="#b3b3b3" fontSize={16} labelStyle={hintTextStyle} />}
                    floatingLabelText={<Label key={1} label="CS_COMPLAINT_SUBMITTED_COMPLAINT_NO" color="#03b0c6" fontSize="12px" />}
                    onChange={(e, value) => this.onComplaintChange(e)}
                    underlineStyle={{ bottom: 7 }}
                    underlineFocusStyle={{ bottom: 7 }}
                    hintStyle={{ width: "100%" }}
                  />
                </div>
                <div className="col-sm-6 col-xs-12 csr-action-buttons" style={{ marginTop: 10, paddingRight: 8 }}>
                  <Button
                    label={<Label buttonLabel={true} label="ES_MYCOMPLAINTS_SEARCH_BUTTON" />}
                    style={{ marginRight: 28, width: "36%" }}
                    backgroundColor="#fe7a51"
                    labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fff" }}
                    buttonStyle={{ border: 0 }}
                    onClick={() => this.onSearch()}
                  />
                  <Button
                    label={<Label buttonLabel={true} color="#fe7a51" label="ES_MYCOMPLAINTS_CLEAR_SEARCH_BUTTON" />}
                    labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fe7a51" }}
                    buttonStyle={{ border: "1px solid #fe7a51" }}
                    style={{ width: "36%" }}
                    onClick={() => this.clearSearch()}
                  />
                </div>
              </div>
            }
          />
        </div>
        <div className="form-without-button-cont-generic">
          <Complaints
            noComplaintMessage={search ? "ES_NO_SEARCH_RESULTS" : "ES_MYCOMPLAINTS_NO_COMPLAINTS_ASSIGNED"}
            onComplaintClick={onComplaintClick}
            complaints={transformedComplaints}
            role={role}
            complaintLocation={true}
          />
        </div>
        <div className="floating-button-cont csr-add-button">
          <FloatingActionButton
            id="mycomplaints-add"
            onClick={(e) => {
              history.push("/create-complaint");
            }}
            className="floating-button"
            backgroundColor="#fe7a51"
          >
            <Icon action="content" name="add" />
          </FloatingActionButton>
        </div>
      </Screen>
    ) : (
      <Screen loading={loading}>
        <div className="form-without-button-cont-generic">
          <Complaints
            noComplaintMessage={"ES_MYCOMPLAINTS_NO_COMPLAINTS_ASSIGNED"}
            onComplaintClick={onComplaintClick}
            complaints={employeeComplaints}
            role={role}
            complaintLocation={true}
          />
        </div>
      </Screen>
    );
  }
}

const roleFromUserInfo = (roles = [], role) => {
  const roleCodes = roles.map((role) => {
    return role.code;
  });
  return roleCodes && roleCodes.length && roleCodes.indexOf(role) > -1 ? true : false;
};

const displayStatus = (status = "") => {
  let statusObj = {};
  if (status.includes("Overdue")) {
    statusObj.status = status; //Replace by localisation label
    statusObj.statusMessage = "";
  }
  if (status.includes("left")) {
    statusObj.status = status; //Replace by localisation label
    statusObj.statusMessage = "";
  }
  return statusObj;
};

const mapStateToProps = (state) => {
  const { complaints, common } = state || {};
  const { categoriesById, byId } = complaints;
  const { fetchSuccess } = complaints;
  const loading = !isEmpty(categoriesById) ? (fetchSuccess ? false : true) : true;
  const { citizenById, employeeById } = common || {};
  const { userInfo } = state.auth;
  const role = roleFromUserInfo(userInfo.roles, "GRO") ? "ao" : roleFromUserInfo(userInfo.roles, "CSR") ? "csr" : "employee";
  let transformedComplaints = transformComplaintForComponent(complaints, role, employeeById, citizenById, categoriesById, displayStatus);
  let assignedComplaints = [],
    unassignedComplaints = [],
    employeeComplaints = [];
  if (role === "ao") {
    assignedComplaints = orderby(
      transformedComplaints.filter((complaint) => complaint.complaintStatus === "ASSIGNED"),
      ["latestCreationTime"],
      ["asc"]
    );
    unassignedComplaints = orderby(
      transformedComplaints.filter((complaint) => complaint.complaintStatus === "UNASSIGNED"),
      ["latestCreationTime"],
      ["asc"]
    );
  } else {
    employeeComplaints = orderby(
      transformedComplaints.filter((complaint) => complaint.complaintStatus === "ASSIGNED" || complaint.rawStatus === "reassignrequested"),
      ["latestCreationTime"],
      ["asc"]
    );
  }
  transformedComplaints = orderby(transformedComplaints, ["latestCreationTime"], ["desc"]);
  const numEmpComplaint = employeeComplaints.length;
  const numCSRComplaint = transformedComplaints.length;
  return { assignedComplaints, unassignedComplaints, numEmpComplaint, numCSRComplaint, employeeComplaints, role, loading, transformedComplaints };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria, hasUsers, overWrite) => dispatch(fetchComplaints(criteria, hasUsers, overWrite)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllComplaints);
