import React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { fetchSpecs } from "redux/mdms/actions";
import Screen from "modules/common/common/Screen";
import { Icon, Button } from "components";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

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
    const requestBody = {
      MdmsCriteria: {
        tenantId: "testtenant", // To be changed later
        moduleDetails: [
          {
            moduleName: match.params.moduleName,
            masterDetails: [
              {
                name: match.params.masterName,
              },
            ],
          },
        ],
      },
    };
    fetchSpecs([], match.params.moduleName, match.params.masterName, requestBody);
  };

  render() {
    const { data, defaultPageSize, columns } = this.state;
    return (
      <Screen>
        <div className="row" style={{ margingTop: "33px", margingBottom: "12px" }}>
          <div className="col-md-6 text-left">Property Tax</div>

          <div className="col-md-6 text-right">
            <Button label="ADD" labelPosition="after" backgroundColor="#f2f2f2" icon={<Icon action="content" name="add" />} />
          </div>
        </div>
        <ReactTable data={data} columns={columns} defaultPageSize={defaultPageSize} className="-stripped -highlight text-center" />
      </Screen>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecs: (queryObj, moduleName, masterName, requestBody) => dispatch(fetchSpecs(queryObj, moduleName, masterName, requestBody)),
  };
};

export default connect(null, mapDispatchToProps)(MDMS);
