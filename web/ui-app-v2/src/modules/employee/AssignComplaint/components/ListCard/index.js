import React, { Component } from "react";
import { Card, Icon, List, Label, AutoSuggest } from "../../../../../components";
import faceOne from "../../../../../assets/images/faceOne.jpg";
import Avatar from "material-ui/Avatar";

class ListCard extends Component {
  state = {
    results: [],
    searchTerm: "",
  };

  avatarStyle = {
    top: 8,
    left: 17,
  };

  mainLabelStyle = {
    letterSpacing: 0.6,
    marginBottom: 4,
  };
  callIconStyle = {
    width: 16,
    height: 16,
    top: 16,
    right: 28,
    margin: "0px",
  };

  dataSource = [
    {
      id: 0,
      primaryText: (
        <Label
          label="Engineering Department"
          dark={true}
          bold={true}
          containerStyle={{ position: "absolute", top: 0, left: 0 }}
          labelStyle={this.mainLabelStyle}
        />
      ),
      open: true,
      nestedItems: [
        {
          id: 1,
          primaryText: <Label label="Amandeep Singh (10)" dark={true} bold={true} labelStyle={this.mainLabelStyle} />,
          leftAvatar: <Avatar size={33} src={faceOne} style={this.avatarStyle} />,
          secondaryText: <Label label="Junior Engineer" style={{ letterSpacing: 0 }} />,
          rightIcon: <Icon action="communication" name="call" style={this.callIconStyle} color="#22b25f" />,
        },
        {
          id: 2,
          primaryText: <Label label="Bhavneet Singh (15)" dark={true} bold={true} labelStyle={this.mainLabelStyle} />,
          leftAvatar: <Avatar size={33} src={faceOne} style={this.avatarStyle} />,
          secondaryText: <Label label="Junior Engineer" style={{ letterSpacing: 0 }} />,
          rightIcon: <Icon action="communication" name="call" style={this.callIconStyle} color="#22b25f" />,
        },
        {
          id: 3,
          primaryText: <Label label="Chirag Kapoor (10)" dark={true} bold={true} labelStyle={this.mainLabelStyle} />,
          leftAvatar: <Avatar size={33} src={faceOne} style={this.avatarStyle} />,
          secondaryText: <Label label="Junior Engineer" style={{ letterSpacing: 0 }} />,
          rightIcon: <Icon action="communication" name="call" style={this.callIconStyle} color="#22b25f" />,
        },
      ],
    },
    {
      id: 5,
      primaryText: (
        <Label
          label="Health & Sanitation Department"
          dark={true}
          bold={true}
          containerStyle={{ position: "absolute", top: 0, left: 0 }}
          labelStyle={this.mainLabelStyle}
        />
      ),
      open: true,
      nestedItems: [
        {
          id: 6,
          primaryText: <Label label="Khushwant Singh (10)" dark={true} bold={true} labelStyle={this.mainLabelStyle} />,
          leftAvatar: <Avatar size={33} src={faceOne} style={this.avatarStyle} />,
          secondaryText: <Label label="Junior Engineer" style={{ letterSpacing: 0 }} />,
          rightIcon: <Icon action="communication" name="call" style={this.callIconStyle} color="#22b25f" />,
        },
        {
          id: 7,
          primaryText: <Label label="Kunwar Sandhu (15)" dark={true} bold={true} labelStyle={this.mainLabelStyle} />,
          leftAvatar: <Avatar size={33} src={faceOne} style={this.avatarStyle} />,
          secondaryText: <Label label="Junior Engineer" style={{ letterSpacing: 0 }} />,
          rightIcon: <Icon action="communication" name="call" style={this.callIconStyle} color="#22b25f" />,
        },
        {
          id: 8,
          primaryText: <Label label="Mandeep Singh (10)" dark={true} bold={true} labelStyle={this.mainLabelStyle} />,
          leftAvatar: <Avatar size={33} src={faceOne} style={this.avatarStyle} />,
          secondaryText: <Label label="Junior Engineer" style={{ letterSpacing: 0 }} />,
          rightIcon: <Icon action="communication" name="call" style={this.callIconStyle} color="#22b25f" />,
        },
      ],
    },
  ];

  prepareResultsForDisplay = (results = []) => {
    return results.map((result) => {
      const listItem = {};
      listItem.primaryText = result.primaryText;
      listItem.open = result.open;
      listItem.secondaryText = result.secondaryText;
      listItem.leftAvatar = result.leftAvatar;
      listItem.rightIcon = result.rightIcon;
      if (result.nestedItems) {
        listItem.nestedItems = result.nestedItems.map((nestedItem, index) => {
          const item = {};
          item.primaryText = nestedItem.primaryText;
          item.secondaryText = nestedItem.secondaryText;
          item.leftAvatar = nestedItem.leftAvatar;
          item.rightIcon = nestedItem.rightIcon;
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
        listItemStyle={{ paddingTop: "8px", paddingBottom: "8px" }}
        nestedListStyle={{ padding: "0px", background: "#ffffff" }}
        autoGenerateNestedIndicator={false}
        primaryTogglesNestedList={true}
        innerDivStyle={{ padding: "8px 0 8px 72px", margin: 0 }}
        items={dataSource}
      />
    );
  };

  autoSuggestCallback = (results = [], searchTerm) => {
    this.setState({ results, searchTerm });
  };

  generateDataSource = (dataSource) => {
    return dataSource.reduce((transformedDataSource, source) => {
      return transformedDataSource.concat(source.nestedItems);
    }, []);
  };

  render() {
    let { prepareResultsForDisplay, renderList, dataSource, generateDataSource } = this;
    const transformedDataSource = generateDataSource(dataSource);
    const { results, searchTerm } = this.state;
    const displayInitialList = searchTerm.length === 0 ? true : false;
    const isEmployeeDirectory = window.location.href.includes("employee-directory") ? true : false;
    return (
      <Card
        className="assign-complaint-main-card"
        textChildren={
          <div>
            <div className="employee-search-cont">
              {isEmployeeDirectory ? (
                ""
              ) : (
                <Label
                  label="Choose Employee to re-assign complaint to from the list"
                  labelStyle={this.mainLabelStyle}
                  containerStyle={{ padding: "0 40px 0 0" }}
                />
              )}

              <AutoSuggest
                id="employee-search"
                containerStyle={{
                  margin: "16px 0",
                  padding: "0 8px",
                  background: "#f8f8f8",
                }}
                textFieldStyle={{ border: 0 }}
                searchInputText="Search Employee"
                searchKey="primaryText"
                iconStyle={{ right: 15, left: "inherit" }}
                hintStyle={{ letterSpacing: 0, bottom: 10, fontSize: 14 }}
                iconPosition="after"
                callback={this.autoSuggestCallback}
                dataSource={transformedDataSource}
              />
            </div>
            <div className="employee-list-cont">
              {displayInitialList ? renderList(prepareResultsForDisplay(dataSource)) : this.renderList(prepareResultsForDisplay(results), true)}
            </div>
          </div>
        }
      />
    );
  }
}

export default ListCard;
