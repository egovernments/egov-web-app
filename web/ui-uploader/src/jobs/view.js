import React from "react";
import UserJobFilters from "../job-filters";
import TableUi from "../components/TableUi";
import TableUiNew from "../components/TableUiNew";
import LoadingIndicator from "../components/LoadingIndicator";
import { getEpochForDate, sortByEpoch } from "../utils";

const View = ({ userJobs, isFetching, tableSchema }) => {
  return (
    <div className="common-div-css">
      <div className="row">
        <div className="col-lg-12">
          <UserJobFilters />
        </div>
        <div className="col-lg-12">
          {isFetching ? (
            <LoadingIndicator />
          ) : (
            userJobs.length > 0 && (
              <div style={{ padding: "14px" }}>
                {/* <TableUi tableSchema={tableSchema} tableBody={userJobs} /> */}
                <TableUiNew
                  title={"Uploader- Search Jobs"}
                  tableSchema={tableSchema}
                  tableBody={userJobs}
                  options={{
                    filter: false,
                    download: false,
                    responsive: "stacked",
                    selectableRows: false,
                    hover: true,
                    rowsPerPageOptions: [10, 15, 20]
                  }}
                  customSortColumn={{
                    column: "Created Date",
                    sortingFn: (data, i, sortDateOrder) => {
                      const epochDates = data.reduce((acc, curr) => {
                        acc.push([...curr, getEpochForDate(curr[1], "dayend")]);
                        return acc;
                      }, []);
                      const order = sortDateOrder === "asc" ? true : false;
                      const finalData = sortByEpoch(epochDates, !order).map(
                        item => {
                          item.pop();
                          return item;
                        }
                      );
                      return {
                        data: finalData,
                        currentOrder: !order ? "asc" : "desc"
                      };
                    }
                  }}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
