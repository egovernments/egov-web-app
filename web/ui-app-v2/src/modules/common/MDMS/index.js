import React from "react";
import { connect } from "react-redux";
import { fetchSpecs } from "redux/mdms/actions";
import { upperCaseFirst } from "utils/commons";
import "./index.css";
import { Icon, Button, Dialog, TextField } from "components";
import { handleFieldChange } from "redux/form/actions";

import Field from "utils/field";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const addIconStyle = { width: 12, height: 12, marginLeft: 8, color: "#ffffff" };

const genericFormHoc = ({ handleFieldChange, fields }) => {
  // const { fields } = form || {};
  // const { submit } = form;
  return Object.keys(fields).map((fieldKey) => {
    const { field } = fields[fieldKey];
    return <Field fieldKey={fieldKey} field={field} handleFieldChange={handleFieldChange} />;
  });
  // {/* <Button {...submit} /> */}
};

class MDMS extends React.Component {
  constructor() {
    super();
    this.state = {
      dialogOpen: false,
      defaultPageSize: 5,
    };
  }

  onAddClick = () => {
    this.setState({ dialogOpen: true });
  };

  onDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

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

  setHeaders = (header) => {
    let columns = [{ Header: "S. No.", accessor: "SNo" }];
    header &&
      header.map((item) => {
        var label = item.label.split(".").pop();
        if (label.toLowerCase() !== "tenantid") {
          columns.push({
            Header: upperCaseFirst(label),
            accessor: label,
          });
        }
      });
    columns.push({
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
    });
    return columns;
  };

  setData = (rowData) => {
    let data = [];
    rowData &&
      rowData.map((item, index) => {
        item.SNo = ++index;
        if (item.active) {
          if (item.active === true) {
            item.active = "Yes";
          } else if (item.active === false) {
            item.active = "No";
          }
        }
        data.push(item);
      });
    return data;
  };

  render() {
    const { genericFormHoc } = this;
    const { data, defaultPageSize, columns } = this.state;
    const { fields, handleFieldChange } = this.props;
    const { header, rowData } = this.props;
    return (
      <div className="container">
        <Dialog
          open={this.state.dialogOpen}
          handleClose={this.onDialogClose}
          children={
            fields
              ? Object.keys(fields).map((fieldKey, index) => {
                  const field = fields[fieldKey];
                  return (
                    <div key={index} className="col-xs-6">
                      <Field fieldKey={fieldKey} field={field} handleFieldChange={handleFieldChange} />
                    </div>
                  );
                })
              : [<div />]
          }
          title="Add Entry"
          isClose={true}
          bodyStyle={{ background: "#ffffff" }}
          contentStyle={{ maxWidth: "none" }}
          titleStyle={{ textAlign: "left" }}
        />
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
              onClick={this.onAddClick}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ReactTable
              data={this.setData(rowData)}
              columns={this.setHeaders(header)}
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

const mapStateToProps = (state, ownProps) => {
  const { specs, data } = state.mdms;
  const { moduleName, masterName } = ownProps && ownProps.match && ownProps.match.params;
  const { fields } = (specs[moduleName] && specs[moduleName][masterName] && specs[moduleName][masterName].values) || {};
  const { header } = (specs[moduleName] && specs[moduleName][masterName]) || [];
  const rowData = (data[moduleName] && data[moduleName][masterName]) || [];
  return { fields, header, rowData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecs: (queryObj, moduleName, masterName, requestBody) => dispatch(fetchSpecs(queryObj, moduleName, masterName, requestBody)),
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MDMS);
