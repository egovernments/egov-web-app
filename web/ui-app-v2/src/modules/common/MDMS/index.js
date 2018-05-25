import React from "react";
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
      <div className="container">
        <div className="row" style={{ margingTop: "33px", margingBottom: "12px" }}>
          <div className="col-md-6 text-left" style={{ marginTop: "34px" }}>
            Property Tax
          </div>

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
        <div className="row">
          <div className="col-md-12">
            <ReactTable
              data={data}
              columns={columns}
              getTableProps={getTableProps}
              getTdProps={getTdProps}
              getThProps={getThProps}
              getTheadProps={getTheadProps}
              getTheadTrProps={getTheadTrProps}
              getTheadThProps={getTheadThProps}
              getTrProps={getTrProps}
              getTrGroupProps={getTrGroupProps}
              defaultPageSize={defaultPageSize}
              className="-stripped -highlight text-center"
            />
          </div>
        </div>
      </div>
    );
  }
}


const getTableProps = () => {
  return {
    style: {
      height: "auto",
      minHeight: 370,
      backgroundColor: "#ffffff",
    },
  };
};

const getTdProps = () => {
  return {
    style: {
      borderRight: "none",
      fontSize: "13px",
      fontWeight: "normal",
    },
  };
};

const getThProps = () => {
  return {
    style: {
      lineHeight: 40,
    },
  };
};
const getTheadTrProps = () => {
  return {
    style: {
      height: 56,
      boxShadow: "none",
    },
  };
};

const getTheadProps = () => {
  return {
    style: {
      boxShadow: "none",
      backgroundColor: "#f8f8f8",
      borderBottom: "1px solid #e0e0e0",
    },
  };
};

const getTheadThProps = () => {
  return {
    style: {
      lineHeight: "40px",
      borderRight: "none",
      fontFamily: "Roboto",
      fontSize: "12px",
      fontWeight: 500,
      letterSpacing: "0.5px",
      textAlign: "center",
      color: "#767676",
    },
  };
};

const getTrGroupProps = () => {
  return {
    style: {
      height: 0,
      borderBottom: "1px solid #e0e0e0",
    },
  };
};

const getTrProps = () => {
  return {
    style: {
      alignItems: "center",
    },
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecs: (queryObj, moduleName, masterName, requestBody) => dispatch(fetchSpecs(queryObj, moduleName, masterName, requestBody)),
  };
};

export default connect(null, mapDispatchToProps)(MDMS);
