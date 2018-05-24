import React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { fetchSpecs } from "redux/mdms/actions";
import Screen from "modules/common/common/Screen";
import { Icon, Button } from "components";
import "./index.css";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const addIconStyle = { width: 12, height: 12, marginLeft: 8, color: "#ffffff" };

class MDMS extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          name: "murali",
          info: "male",
          stats: "test",
        },
        {
          name: "tharu",
          info: "female",
          stats: "test",
        },
      ],
      columns: [
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Info",
          accessor: "info",
        },
        {
          Header: "Stats",
          accessor: "stats",
        },
        {
          Header: "Actions",
          Cell: (row) => (
            <Icon
              onClick={() => {
                console.log(row.index);
              }}
              action="image"
              name="edit"
            />
          ),
        },
      ],
      defaultPageSize: 5,
    };
  }

  componentDidMount = () => {
    const { fetchSpecs, match } = this.props;
    // fetchSpecs([], match.params.moduleName, match.params.masterName, true);
  };

  render() {
    const { data, defaultPageSize, columns } = this.state;
    return (
      <Screen>
        <div className="row" style={{ margingTop: "33px", margingBottom: "12px" }}>
          <div className="col-md-6 text-left">Property Tax</div>

          <div className="col-md-6 text-right">
            <Button
              label="ADD"
              className="add-row-mdms-table"
              labelPosition="after"
              backgroundColor="#fe7a51"
              icon={<Icon action="content" name="add" color="#ffffff" style={addIconStyle} />}
            />
          </div>
        </div>
        <ReactTable data={data} columns={columns} defaultPageSize={defaultPageSize} className="-stripped -highlight text-center" />
      </Screen>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecs: (queryObj, moduleName, masterName, customEndPoint) => dispatch(fetchSpecs(queryObj, moduleName, masterName, customEndPoint)),
  };
};

export default connect(null, mapDispatchToProps)(MDMS);
