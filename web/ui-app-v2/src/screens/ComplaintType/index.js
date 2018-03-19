import React, { Component } from "react";
import { List, Icon, AutoSuggest } from "../../components";

const customIconStyles = {
  height: 36,
  width: 36,
  margin: 0,
  top: 5,
  left: 12,
};

const customIconStylesAlternate = {
  height: 24,
  width: 24,
  margin: 0,
  top: 12,
  left: 15,
};

export default class ComplaintCategory extends Component {
  state = { results: [], searchTerm: "" };

  dataSource = [
    {
      id: 0,
      text: "Garbage",
      nestedItems: [
        { id: 1, text: "Accumulation Of Litter", icon: { action: "custom", name: "accumulation-of-litter" } },
        { id: 2, text: "Overflowing Garbage Bins", icon: { action: "custom", name: "overflowing-garbage" } },
        { id: 3, text: "Garbage Bin Absent", icon: { action: "custom", name: "garbage-bin-absent" } },
        { id: 4, text: "Absenteeism Of Sweepers", icon: { action: "custom", name: "absenteeism of-sweeper", style: customIconStylesAlternate } },
      ],
    },
    {
      id: 5,
      text: "Roads & Footpaths",
      icon: { action: "custom", name: "roads-footpaths", style: customIconStylesAlternate },
      nestedItems: [{ id: 6, text: "Potholes" }, { id: 7, text: "Broken Footpaths" }],
    },
    { id: 8, text: "Drains", nestedItems: [{ id: 9, text: "Blockage Of Drains" }] },
    { id: 10, text: "Street Lights", nestedItems: [], icon: { action: "custom", name: "streetlights", style: customIconStylesAlternate } },
    {
      id: 11,
      text: "Public Health & Hygiene",
      icon: { action: "custom", name: "roads-footpaths", style: customIconStylesAlternate },
      nestedItems: [],
    },
    {
      id: 12,
      text: "Public Land & Property",
      icon: { action: "custom", name: "roads-footpaths", style: customIconStylesAlternate },
      nestedItems: [],
    },
    { id: 13, text: "Water", icon: { action: "custom", name: "streetlights", style: customIconStylesAlternate }, nestedItems: [] },
    { id: 14, text: "Others", icon: { action: "action", name: "info", style: customIconStylesAlternate }, nestedItems: [] },
  ];

  generateDataSource = (dataSource) => {
    return dataSource.reduce((transformedDataSource, source) => {
      return transformedDataSource.concat(source.nestedItems);
    }, []);
  };

  onComplaintTypeChosen = (item, index) => {
    const complaintType = item.primaryText;
    // put the complaint type in the global store like redux
    this.props.history.goBack();
  };

  autoSuggestCallback = (results = [], searchTerm) => {
    this.setState({ results, searchTerm });
  };

  prepareResultsForDisplay = (results = []) => {
    return results.map((result) => {
      const listItem = {};

      listItem.primaryText = result.text;
      if (result.hasOwnProperty("icon") && result.icon) {
        const { action, name, style } = result.icon;
        listItem.leftIcon = <Icon style={style || customIconStyles} action={action} name={name} color="#f89a3f" />;
      } else {
        listItem.leftIcon = <Icon style={customIconStyles} action="custom" name="accumulation-of-litter" color="#f89a3f" />;
      }

      if (result.nestedItems) {
        listItem.rightIcon = <Icon action="hardware" name="keyboard-arrow-right" />;
        listItem.nestedItems = result.nestedItems.map((nestedItem) => {
          const item = {};
          item.primaryText = nestedItem.text;
          if (nestedItem.hasOwnProperty("icon") && nestedItem.icon) {
            const { action, name, style } = nestedItem.icon;
            item.leftIcon = <Icon style={style || customIconStyles} action={action} name={name} color="#f89a3f" />;
          } else {
            item.leftIcon = <Icon style={customIconStyles} action="custom" name="accumulation-of-litter" color="#f89a3f" />;
          }
          item.onClick = this.onComplaintTypeChosen.bind(null, item);
          return item;
        });
      }

      return listItem;
    });
  };

  renderList = (dataSource, enableClick) => {
    return (
      <List
        onItemClick={enableClick && this.onComplaintTypeChosen}
        listItemStyle={{ borderBottom: "1px solid #eee", paddingTop: "8px", paddingBottom: "8px" }}
        nestedListStyle={{ padding: "0px" }}
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
        {displayInitialList ? this.renderList(prepareResultsForDisplay(dataSource)) : this.renderList(prepareResultsForDisplay(results), true)}
      </div>
    );
  }
}
