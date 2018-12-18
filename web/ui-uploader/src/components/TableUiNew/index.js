import React from "react";
import MUIDataTable from "mui-datatables";
import get from "lodash/get";
import PropTypes from "prop-types";
import cloneDeep from "lodash/cloneDeep";
import "./index.css";
import { getDateFromEpoch } from "../../utils";
import FlatButton from "material-ui/FlatButton";

class Table extends React.Component {
  state = {
    data: [],
    columns: [],
    customSortOrder: "asc"
  };

  cellValue = (fieldType, row, fieldKey) => {
    const field = row[fieldKey];

    switch (fieldType) {
      case "label":
        return field;
      case "time":
        return getDateFromEpoch(field);
      case "hyperlink":
        const { href, label } = field;
        const buttonProps = { label, href };
        if (href) {
          buttonProps.target = "_blank";
          buttonProps.primary = true;
        } else {
          buttonProps.disabled = true;
        }
        return <FlatButton {...buttonProps} />;
      default:
        break;
    }
  };

  formatData = (tableSchema, tableBody) => {
    let data = [];
    tableBody.map(rowData => {
      let dataRow = [];
      tableSchema.map(schema => {
        dataRow.push(this.cellValue(schema.fieldType, rowData, schema.key));
      });
      data.push(dataRow);
    });
    return data;
  };

  componentWillReceiveProps(nextProps) {
    const { tableSchema, tableBody } = nextProps;

    this.updateTable(tableSchema, tableBody);
  }

  componentDidMount() {
    const { tableSchema, tableBody } = this.props;
    this.updateTable(tableSchema, tableBody);
  }

  updateTable = (tableSchema, tableBody) => {
    const updatedData = this.formatData(tableSchema, tableBody);
    const updatedColumn = tableSchema.map(elem => elem["label"]);
    this.setState({
      data: updatedData,
      columns: updatedColumn
    });
  };

  onColumnSortChange = (columnName, i) => {
    let { customSortOrder, data } = this.state;
    const { customSortColumn } = this.props;
    const { column, sortingFn } = customSortColumn;
    if (columnName === column) {
      const updatedData = sortingFn(cloneDeep(data), "", customSortOrder);
      this.setState({
        data: updatedData.data,
        customSortOrder: updatedData.currentOrder
      });
    }
  };

  render() {
    const { tableSchema, tableBody } = this.props;
    const { data, columns } = this.state;
    const { options, title } = this.props;
    return (
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={{
          ...options,
          onColumnSortChange: (columnName, order) =>
            this.onColumnSortChange(columnName, order)
        }}
      />
    );
  }
}

Table.propTypes = {
  tableSchema: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      fieldType: PropTypes.string.isRequired
    }).isRequired
  ),
  tableBody: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
};

export default Table;
