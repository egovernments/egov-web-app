import React from "react";
import MUIDataTable from "mui-datatables";
import get from "lodash/get";
import PropTypes from "prop-types";
import "./index.css";

class Table extends React.Component {
  state = {
    data: [],
    columns: []
  };

  formatData = (data, columns) => {
    return [...data].reduce((acc, curr) => {
      let dataRow = [];
      Object.keys(columns).forEach(column => {
        let columnValue = get(curr, `${column}`, "");
        if (get(columns, `${column}.format`, "")) {
          columnValue = columns[column].format(curr);
        }
        dataRow.push(columnValue);
      });
      let updatedAcc = [...acc];
      updatedAcc.push(dataRow);
      return updatedAcc;
    }, []);
  };

  componentWillReceiveProps(nextProps) {
    const { data, columns } = nextProps;
    this.updateTable(data, columns);
  }

  componentDidMount() {
    const { data, columns } = this.props;
    this.updateTable(data, columns);
  }

  updateTable = (data, columns) => {
    const updatedData = this.formatData(data, columns);
    this.setState({
      data: updatedData,
      columns: Object.keys(columns)
    });
  };

  render() {
    const { data, columns } = this.state;
    const { options, title } = this.props;
    return (
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}

Table.propTypes = {
  columns: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
};

export default Table;
