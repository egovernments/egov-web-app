import React, { Component } from "react";
import { List, Icon, AutoSuggest, Label } from "../../components";
import { red500 } from "material-ui/styles/colors";

const customIconStyles = {
  position: "absolute",
  height: 40,
  width: 40,
  margin: 0,
  padding: 0,
  top: 0,
  left: 5,
};

export default class SearchComplaint extends Component {
  state = { results: [], searchTerm: "" };

  dataSource = {
    Cleanliness: [
      { id: 1, text: "Accumulation Of Litter" },
      { id: 2, text: "Overflowing Garbage Bins" },
      { id: 3, text: "Garbage Bin Absent" },
      { id: 4, text: "Absenteeism Of Sweepers" },
    ],
    "Roads & Footpaths": [{ id: 5, text: "Potholes" }, { id: 6, text: "Broken Footpaths" }],
    "Drains & Sewers": [{ id: 7, text: "Blockage Of Drains" }],
  };

  generateDataSource = (dataSource) => {
    return Object.keys(dataSource).reduce((source, key) => {
      return source.concat(dataSource[key]);
    }, []);
  };

  autoSuggestCallback = (results = [], searchTerm) => {
    this.setState({ results, searchTerm });
  };

  prepareResultsForDisplay = (results = []) => {
    return results.map((result, index) => {
      const mappedResult = {};
      mappedResult.primaryText = result.text;
      mappedResult.leftIcon = <Icon style={customIconStyles} action="custom" name="accumulation-of-litter" color={red500} />;
      return mappedResult;
    });
  };

  renderListWithHeader = (dataSource) => {
    return Object.keys(dataSource).map((key, index) => {
      const resultsForDisplay = this.prepareResultsForDisplay(dataSource[key]);
      return (
        <div key={index}>
          <Label upperCase={true} bold={true} labelStyle={{ padding: "15px", color: "#2f80ed" }} label={key} />
          <List listItemStyle={{ borderBottom: "1px solid #eee" }} items={resultsForDisplay} />
        </div>
      );
    });
  };

  render() {
    const { autoSuggestCallback, dataSource, prepareResultsForDisplay, generateDataSource } = this;
    const { results, searchTerm } = this.state;
    const displayInitialList = searchTerm.length === 0 ? true : false;
    const resultsForDisplay = prepareResultsForDisplay(results);
    const transformedDataSource = generateDataSource(dataSource);
    return (
      <div style={{ marginBottom: 60, padding: "8px 8px 0px 8px", background: "#fff" }}>
        <AutoSuggest dataSource={transformedDataSource} searchInputText="Search" searchKey="text" callback={autoSuggestCallback} />
        {displayInitialList ? (
          this.renderListWithHeader(dataSource)
        ) : (
          <List listItemStyle={{ borderBottom: "1px solid #eee" }} items={resultsForDisplay} />
        )}
      </div>
    );
  }
}
