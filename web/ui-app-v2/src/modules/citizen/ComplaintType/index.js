import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Icon, AutoSuggest } from "../../../components";
import { handleFieldChange } from "redux/form/actions";
import Label from "utils/translationNode";

const customIconStyles = {
  height: 36,
  width: 36,
  margin: 0,
  top: 5,
  left: 12,
};

class ComplaintType extends Component {
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/complaint").default;
  }
  state = { results: [], searchTerm: "" };

  dataSource = [
    {
      id: 0,
      text: "Garbage",
      icon: { action: "custom", name: "accumulation-of-litter" },
      nestedItems: [],
    },
  ];

  generateDataSource = (dataSource) => {
    const { categories } = this.props;
    Object.values(categories).map((category, index) => {
      dataSource[0].nestedItems.push({
        id: category.serviceCode,
        text: category.serviceName,
        icon: { action: "custom", name: "accumulation-of-litter" },
      });
    });
    return dataSource.reduce((transformedDataSource, source) => {
      return transformedDataSource.concat(source.nestedItems);
    }, []);
  };

  onComplaintTypeChosen = (item, index) => {
    this.props.handleFieldChange(this.formConfig.name, "complaintType", item.id);
    this.props.history.goBack();
  };

  autoSuggestCallback = (results = [], searchTerm) => {
    this.setState({ results, searchTerm });
  };

  prepareResultsForDisplay = (results = []) => {
    console.log(results);
    return results.map((result) => {
      const listItem = {};
      const groupName =
        "SERVICEDEFS.SERVICENAME." +
        result.text
          .match(/\w+/g)
          .join("_")
          .toUpperCase();

      listItem.primaryText = <Label label={groupName} />;
      listItem.id = result.id;
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
          const serviceName =
            "SERVICEDEFS.SERVICENAME." +
            nestedItem.text
              .match(/\w+/g)
              .join("_")
              .toUpperCase();
          item.primaryText = <Label label={serviceName} />;
          item.id = nestedItem.id;
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
        listItemStyle={{ borderBottom: "1px solid #e0e0e0", paddingTop: "8px", paddingBottom: "8px" }}
        nestedListStyle={{ padding: "0px", background: "#f2f2f2" }}
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
          id="complainttype-search"
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

const mapStateToProps = (state) => {
  return {
    categories: state.complaints.categoriesById,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintType);
