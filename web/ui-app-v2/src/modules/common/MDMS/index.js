import React from "react";
import ReactTable from "react-table";
import Field from "utils/field";
import { connect } from "react-redux";
import formHoc from "hocs/form";
import { fetchSpecs } from "redux/mdms/actions";
import { upperCaseFirst } from "utils/commons";
import { Icon, Label, Button, Dialog, TextField, TextFieldIcon } from "components";
import SearchIcon from "material-ui/svg-icons/action/search";
import "./index.css";

// Import React Table
import "react-table/react-table.css";

const addIconStyle = { width: 20, height: 20, marginLeft: 8 };
const searchIconStyle = {
  height: "20px",
  width: "35px",
  fill: "#767676",
};

const MDMSForm = ({ handleFieldChange, form, handleClose }) => {
  const { fields } = form || {};
  const { submit } = form;
  return (
    <div>
      {Object.keys(fields || []).map((fieldKey, index) => {
        const field = fields[fieldKey];
        return (
          <div key={index} className="col-xs-6" style={{ marginBottom: 5 }}>
            <Field fieldKey={fieldKey} field={field} handleFieldChange={handleFieldChange} />
          </div>
        );
      })}
      <div className="col-xs-12" style={{ marginTop: 40, marginBottom: 36 }}>
        <div className="col-xs-6" />
        <div className="col-xs-6" style={{ textAlign: "right" }}>
          <Button
            label="CANCEL"
            onClick={handleClose}
            labelStyle={{ letterSpacing: 0.7, padding: 0 }}
            buttonStyle={{ border: "1px solid #fe7a51" }}
            style={{ marginRight: 45, width: "36%" }}
          />
          <Button
            label="ADD"
            style={{ width: "36%" }}
            backgroundColor="#fe7a51"
            labelStyle={{ letterSpacing: 0.7, padding: 0 }}
            buttonStyle={{ border: 0 }}
            {...submit}
          />
        </div>
      </div>
    </div>
  );
};

class MDMS extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      dialogOpen: false,
      defaultPageSize: 5,
    };
  }

  onAddClick = () => {
    // do init form form here
    this.setState({ dialogOpen: true });
  };

  onEditClick = (rowIndex) => {
    // do init form here
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
      Cell: (row) => <Icon onClick={this.onEditClick.bind(null, row.index)} action="image" name="edit" />,
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
    const { genericFormHoc, setData } = this;
    const { defaultPageSize } = this.state;
    const { header, rowData, masterName } = this.props;
    const MDMSFormHOC = formHoc({ formKey: masterName })(MDMSForm);

    let tableData = setData(rowData);
    if (this.state.search) {
      tableData = tableData.filter((row) => {
        return row.name.toLowerCase().includes(this.state.search.toLowerCase()) || row.code.toLowerCase().includes(this.state.search.toLowerCase());
      });
    }

    return (
      <div className="container">
        <Dialog
          open={this.state.dialogOpen}
          handleClose={this.onDialogClose}
          children={[<MDMSFormHOC key={1} handleClose={this.handleClose} />]}
          title="Add Entry"
          isClose={true}
          bodyStyle={{ background: "#ffffff" }}
          contentStyle={{ maxWidth: "none" }}
          titleStyle={{ textAlign: "left" }}
        />

        <div style={{ margingTop: "33px" }}>
          <div className="title-add-search-bar">
            <div className="col-md-6 text-left table-title" style={{ marginTop: "22px" }}>
              <Label id="mdms-table-title" label={masterName} style={{}} labelStyle={{ letterSpacing: 0.6 }} dark={true} bold={true} />
            </div>

            <div className="col-md-6 table-top-bar">
              <div className="mdms-table-search-bar">
                <TextFieldIcon
                  textFieldStyle={{ height: "48px" }}
                  inputStyle={{
                    marginTop: "4px",
                    left: 0,
                    position: "absolute",
                  }}
                  iconPosition="after"
                  onChange={(e) => this.setState({ search: e.target.value })}
                  underlineShow={true}
                  fullWidth={false}
                  hintText="Search"
                  Icon={SearchIcon}
                  value={this.state.search}
                  id="search-mdms"
                  iconStyle={searchIconStyle}
                />
              </div>
              <div className="mdms-add">
                <Icon action="content" name="add" color="#767676" onClick={this.onAddClick} style={addIconStyle} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ReactTable
              data={tableData}
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
      boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.13), 0 2px 4px 0 rgba(0, 0, 0, 0.2)",
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
  const { header } = (specs[moduleName] && specs[moduleName][masterName]) || [];
  const rowData = (data[moduleName] && data[moduleName][masterName]) || [];
  return { header, masterName, rowData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecs: (queryObj, moduleName, masterName, requestBody) => dispatch(fetchSpecs(queryObj, moduleName, masterName, requestBody)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MDMS);
