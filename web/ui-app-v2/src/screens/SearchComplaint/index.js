import React, { Component } from "react";
import Autosuggest from "../../components/Autosuggest";
import List from "../../components/List";
import ActionHome from "material-ui/svg-icons/action/home";
import { red500 } from "material-ui/styles/colors";

export default class SearchComplaint extends Component {
  state = { results: [], searchTerm: "" };

  items = [
    {
      primaryText: "Inbox",
      leftIcon: <ActionHome color />,
    },
    {
      primaryText: "Starred",
      leftIcon: <ActionHome />,
    },
    {
      primaryText: "Sent Mail",
      leftIcon: <ActionHome />,
    },
    {
      primaryText: "Drafts",
      leftIcon: <ActionHome />,
    },
  ];

  dataSource = {
    Cleanliness: [{ id: 1, text: "Sachin Tendulkar" }, { id: 2, text: "Brian Lara" }, { id: 3, text: "Ricky Ponting" }],
    "Roads & Footpaths": [{ id: 4, text: "Rahul Dravid" }, { id: 5, text: "Jacques Kallis" }, { id: 6, text: "Younis Khan" }],
    "Drains & Sewers": [{ id: 7, text: "VVS Laxman" }, { id: 8, text: "Yousuf Youhana" }, { id: 9, text: "Kevin Pietersen" }],
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
      mappedResult.leftIcon = <ActionHome color={red500} />;
      return mappedResult;
    });
  };

  renderListWithHeader = (dataSource) => {
    return Object.keys(dataSource).map((key, index) => {
      const resultsForDisplay = this.prepareResultsForDisplay(dataSource[key]);
      return (
        <div>
          <h4 style={{ color: "#2f80ed" }}>{key}</h4>
          <List
            listContainerStyle={{ background: "#fff", padding: "0px" }}
            key={index}
            listItemStyle={{ borderBottom: "1px solid #eee" }}
            items={resultsForDisplay}
          />
        </div>
      );
    });
  };

  render() {
    const { autoSuggestCallback, dataSource, prepareResultsForDisplay, generateDataSource } = this;
    const { results,searchTerm } = this.state;
    const displayInitialList = searchTerm.length === 0 ? true : false;
    const resultsForDisplay = prepareResultsForDisplay(results);
    const transformedDataSource = generateDataSource(dataSource);
    return (
      <div style={{ padding: "10px" }}>
        <Autosuggest dataSource={transformedDataSource} searchKey="text" callback={autoSuggestCallback} />
        {displayInitialList ? (
          this.renderListWithHeader(dataSource)
        ) : (
          <List
            listContainerStyle={{ background: "#fff", padding: "0px" }}
            listItemStyle={{ borderBottom: "1px solid #eee" }}
            items={resultsForDisplay}
          />
        )}
      </div>
    );
  }
}
