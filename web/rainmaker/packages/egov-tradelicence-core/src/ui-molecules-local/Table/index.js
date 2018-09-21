import React from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import get from "lodash/get"
import set from "lodash/set"
import PropTypes from "prop-types";
import "./index.css"



class Table extends React.Component {
  state = {
    data: [],
    columns: []
  };

  formatData = (data, columns) => {
    return [...data].reduce((acc, curr) => {
      let dataRow = [];
      Object.keys(columns).forEach(column => {
        let currentColumn = columns[column];
        let columnValue = get(curr, `${column}`, "");
        if (get(columns, `${column}.format`, "")) {
          columnValue = columns[column].format(columnValue);
        }
        dataRow.push(columnValue);
      });
      let updatedAcc = [...acc];
      updatedAcc.push(dataRow);
      return updatedAcc;
    }, []);
  };

  componentDidMount() {
    const { data, columns } = this.props;
    const updatedData = this.formatData(data, {
      "Application No": {},
      "License No": {},
      "Trade Name": {},
      "Owner Name": {},
      "Application Date": {},
      Status: {
        format: value => {
          let color = "";
          if (value.toLowerCase().indexOf("approved") !== -1) {
            color = "green";
          } else if (value.toLowerCase().indexOf("pending") !== -1) {
            color = "red";
          }
          return (
            <span style={{ color: color, fontSize: "14px", fontWeight: 400 }}>
              {value}
            </span>
          );
        }
      }
    });
    this.setState({
      data: updatedData,
      columns: Object.keys(columns)
    });
  }

  render() {
    const { data, columns } = this.state;

    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      selectableRows: false
    };

    return (
      <MUIDataTable
        title={this.props.title}
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

Table.propTypes = {
  columns: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default Table
