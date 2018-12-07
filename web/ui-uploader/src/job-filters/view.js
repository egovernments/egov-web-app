import React from "react";
import PropTypes from "prop-types";
import CardUi from "../components/CardUi";
import ButtonUi from "../components/ButtonUi";
import JobStatusFilter from "./UserJobsStatusFilter";
import DateFilter from "./UserJobsDateFilter";
import UserJobsCodeFilter from "./UserJobsCodeFilter";
import RequesterNamesFilter from "./RequesterNamesFilter";
import RequesterFileNamesFilter from "./RequesterFileNamesFilter";

const FiltersView = ({ handleApplyFilter, handleResetFilter }) => {
  return (
    <div>
      <CardUi cardTitle="Uploader- Search Jobs">
        <div
          className="row"
          style={{
            marginTop: "16px",
            paddingBottom: "8px"
          }}
        >
          <div className="col-sm-4">
            <UserJobsCodeFilter />
          </div>
          <div className="col-sm-4">
            <RequesterFileNamesFilter />
          </div>
          <div className="col-sm-4">
            <RequesterNamesFilter />
          </div>
        </div>
        <div
          className="row"
          style={{
            marginTop: "16px",
            paddingBottom: "8px"
          }}
        >
          <DateFilter />
          <div className="col-sm-4">
            <JobStatusFilter />
          </div>
        </div>
        <div
          className="row"
          style={{
            marginTop: "16px",
            paddingBottom: "8px"
          }}
        >
          <div
            style={{ textAlign: "center", width: "100%", margin: "15px 0px" }}
          >
            <ButtonUi
              onClick={handleApplyFilter}
              className={"uploader-primary-button"}
              style={{ marginRight: "15px" }}
              type="button"
              primary={true}
              label="Filter"
              icon={{ style: { color: "white" }, name: "search" }}
            />
            <ButtonUi
              onClick={handleResetFilter}
              type="button"
              label="Reset"
              icon={{ style: { color: "black" }, name: "backspace" }}
            />
          </div>
        </div>
      </CardUi>
    </div>
  );
};

FiltersView.propTypes = {
  handleApplyFilter: PropTypes.func.isRequired,
  handleResetFilter: PropTypes.func.isRequired
};

export default FiltersView;
