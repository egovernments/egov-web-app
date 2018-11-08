import React, { Component } from "react";
import { Card, TextField, Button } from "components";
import { fetchComplaints } from "egov-ui-kit/redux/complaints/actions";
import Label from "egov-ui-kit/utils/translationNode";
import { Complaints, Screen } from "modules/common";
import { transformComplaintForComponent, fetchFromLocalStorage } from "egov-ui-kit/utils/commons";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import "./index.css";

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

class SearchScreen extends Component {
  state = {
    complaintNo: "",
    mobileNo: "",
    complaints: [],
    search: false,
    value: 0,
  };

  componentDidMount = async () => {
    let { fetchComplaints } = this.props;
    fetchComplaints([{ key: "status", value: "assigned,open,reassignrequested" }], true, true);
  };

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
    const hintTextStyle = {
      letterSpacing: "0.7px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      width: "90%",
      overflow: "hidden",
    };
    const { loading, history, transformedComplaints, role } = this.props;
    const { mobileNo, complaintNo, search } = this.state;
    const { onComplaintClick } = this;
    return (
      <Screen>
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
                    hintText={
                      <Label
                        label="CORE_COMMON_MOBILE_NUMBER_PLACEHOLDER"
                        color="rgba(0, 0, 0, 0.3799999952316284)"
                        fontSize={16}
                        labelStyle={hintTextStyle}
                      />
                    }
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
                    hintText={
                      <Label
                        label="ES_MYCOMPLAINTS_COMPLAINT_NO"
                        color="rgba(0, 0, 0, 0.3799999952316284)"
                        fontSize={16}
                        labelStyle={hintTextStyle}
                      />
                    }
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
          <div>
            <Complaints
              noComplaintMessage={search ? "ES_NO_SEARCH_RESULTS" : "ES_MYCOMPLAINTS_NO_COMPLAINTS_ASSIGNED"}
              onComplaintClick={onComplaintClick}
              complaints={transformedComplaints}
              role={role}
              complaintLocation={true}
            />
          </div>
        </div>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const { complaints, common } = state || {};
  const { categoriesById, byId } = complaints;
  const { fetchSuccess } = complaints;
  const loading = !isEmpty(categoriesById) ? (fetchSuccess ? false : true) : true;
  const { citizenById, employeeById } = common || {};
  const { userInfo } = state.auth;
  const role = roleFromUserInfo(userInfo.roles, "GRO") ? "ao" : roleFromUserInfo(userInfo.roles, "CSR") ? "csr" : "employee";
  let transformedComplaints = transformComplaintForComponent(complaints, role, employeeById, citizenById, categoriesById, displayStatus);

  return { role, loading, transformedComplaints };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComplaints: (criteria, hasUsers, overWrite) => dispatch(fetchComplaints(criteria, hasUsers, overWrite)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
