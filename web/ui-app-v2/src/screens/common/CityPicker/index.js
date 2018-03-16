import React, { Component } from "react";
import { List, Dialog, TextFieldIcon, AutoSuggest } from "../../../components";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";

export default class CityPickerDialog extends Component {
  state = { results: [], searchTerm: "", open: false, city: "" };

  cities = [
    { key: "amritsar", text: "Amritsar" },
    { key: "bathinda", text: "Bathinda" },
    { key: "chandigarh", text: "Chandigarh" },
    { key: "faridkot", text: "Faridkot" },
    { key: "jalandhar", text: "Jalandhar" },
    { key: "ludhiana", text: "Ludhiana" },
    { key: "mohali", text: "Mohali" },
  ];

  componentDidMount() {
    document.getElementById("person-city").addEventListener("focus", function() {
      this.blur();
    });
  }

  componentWillUnmount() {
    document.getElementById("person-city").removeEventListener("focus", null);
  }

  prepareResultsForDisplay = (results = []) => {
    return results.map((result, index) => {
      const mappedResult = {};
      mappedResult.primaryText = result.text;
      return mappedResult;
    });
  };

  onCityFieldClicked = () => {
    this.setState({ open: true });
  };

  onClose = () => {
    this.setState({ open: false });
  };

  onItemClick = (item, index) => {
    const city = item.primaryText;
    this.setState({ city }, () => {
      this.onClose();
    });
  };

  autoSuggestCallback = (results = [], searchTerm) => {
    this.setState({ results, searchTerm });
  };

  render() {
    const { cities, autoSuggestCallback, prepareResultsForDisplay, onClose, onCityFieldClicked, onItemClick } = this;
    const { results, searchTerm, open, city } = this.state;
    const displayInitialList = searchTerm.length === 0 ? true : false;

    return (
      <div>
        <div onClick={onCityFieldClicked}>
          <TextFieldIcon
            value={city}
            floatingLabelText="City"
            hintText="Enter your City"
            iconPosition="after"
            fullWidth={true}
            onChange={onCityFieldClicked}
            Icon={DownArrow}
            id="person-city"
            name="person-city"
            isRequired={true}
          />
        </div>
        <Dialog
          titleStyle={{ textAlign: "left", padding: "24px 16px" }}
          handleClose={onClose}
          bodyStyle={{ padding: "0px" }}
          title="Choose City"
          modal={false}
          open={open}
          onRequestClose={onClose}
          autoScrollBodyContent={true}
        >
          <AutoSuggest dataSource={cities} searchInputText="Search" searchKey="text" callback={autoSuggestCallback} />
          <List
            onItemClick={onItemClick}
            innerDivStyle={{ paddingLeft: "50px" }}
            listItemStyle={{ borderBottom: "1px solid #eee" }}
            items={displayInitialList ? prepareResultsForDisplay(cities) : prepareResultsForDisplay(results)}
          />
        </Dialog>
      </div>
    );
  }
}
