import React from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import get from "lodash/get"
import set from "lodash/set"
import "./index.css"



class Table extends React.Component {
  state = {
    data: [],
    columns: []
  };

  formatData = (data, columns) => {
    return data.reduce((acc, curr) => {
      let dataRow = [];
      columns.forEach(column => {
        let columnValue = get(curr, `${column}`, "");
        if (column === "Status") {
          let style = {
            color: "",
            fontSize: "14px",
            fontWeight: 400
          };
          if (columnValue === "Approved") {
            set(style, "color", "green");
          }
          columnValue = <span style={style}>{columnValue}</span>;
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
    const updatedData = this.formatData(data, columns);
    this.setState({
      data: updatedData,
      columns: columns
    });
  }

  componentWillMount() {}

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

export default Table
