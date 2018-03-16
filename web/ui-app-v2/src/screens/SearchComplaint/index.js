import React, { Component } from "react";
import { List, Icon, AutoSuggest, Label } from "../../components";
import { red500 } from "material-ui/styles/colors";

const customIconStyles = {
  height: 40,
  width: 40,
  margin: 0,
};

export default class SearchComplaint extends Component {
  state = { results: [], searchTerm: "" };

  dataSource = [
    {
      id: 0,
      text: "Garbage",
      nestedItems: [
        { id: 1, text: "Accumulation Of Litter" },
        { id: 2, text: "Overflowing Garbage Bins" },
        { id: 3, text: "Garbage Bin Absent" },
        { id: 4, text: "Absenteeism Of Sweepers" },
      ],
    },
    { id: 5, text: "Roads & Footpaths", nestedItems: [{ id: 6, text: "Potholes" }, { id: 7, text: "Broken Footpaths" }] },
    { id: 8, text: "Drains", nestedItems: [{ id: 9, text: "Blockage Of Drains" }] },
    { id: 10, text: "Street Lights", nestedItems: [] },
    { id: 11, text: "Public Health & Hygiene", nestedItems: [] },
    { id: 12, text: "Public Land & Property", nestedItems: [] },
    { id: 13, text: "Water", nestedItems: [] },
    { id: 14, text: "Others", nestedItems: [] },
  ];

  generateDataSource = dataSource => {
    return dataSource.reduce((transformedDataSource, source) => {
      return transformedDataSource.concat(source.nestedItems);
    }, []);
  };

  autoSuggestCallback = (results = [], searchTerm) => {
    this.setState({ results, searchTerm });
  };

  prepareResultsForDisplay = (results = []) => {
    return results.map(result => {
      const listItem = {};

      listItem.primaryText = result.text;
      listItem.leftIcon = <Icon style={customIconStyles} action="custom" name="accumulation-of-litter" color="#f89a3f" />;

      if (result.nestedItems) {
        listItem.rightIcon = <Icon action="hardware" name="keyboard-arrow-right" />;
        listItem.nestedItems = result.nestedItems.map(nestedItem => {
          const item = {};
          item.primaryText = nestedItem.text;
          item.leftIcon = <Icon style={customIconStyles} action="custom" name="accumulation-of-litter" color="#f89a3f" />;
          return item;
        });
      }

      return listItem;
    });
  };

  renderList = dataSource => {
    return (
      <List
        listItemStyle={{ borderBottom: "1px solid #eee", paddingTop: "8px", paddingBottom: "8px" }}
        autoGenerateNestedIndicator={false}
        primaryTogglesNestedList={true}
        items={dataSource}
      />
    );
  };

  render() {
    const { autoSuggestCallback, dataSource, prepareResultsForDisplay, generateDataSource } = this;
    const { results, searchTerm } = this.state;
    const displayInitialList = searchTerm.length === 0 ? true : false;
    const transformedDataSource = generateDataSource(dataSource);

    return (
      <div style={{ marginBottom: 60 }}>
        <AutoSuggest
          containerStyle={{
            overflowX: "hidden",
            padding: "0px 16px 16px 16px",
            background: "#00bcd1",
            boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.24), 0 0 4px 0 rgba(0, 0, 0, 0.12)",
          }}
          textFieldStyle={{ boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)", background: "#ffffff" }}
          dataSource={transformedDataSource}
          searchInputText="Search"
          searchKey="text"
          callback={autoSuggestCallback}
        />
        {displayInitialList ? this.renderList(prepareResultsForDisplay(dataSource)) : this.renderList(prepareResultsForDisplay(results))}
      </div>
    );
  }
}
