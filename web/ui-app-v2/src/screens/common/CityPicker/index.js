import React, { Component } from "react";
import { List, TextFieldIcon, Icon, AutoSuggest, Label } from "../../../components";
import Dialog from "material-ui/Dialog";
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

  onCitySelected = city => {
    this.setState({ city });
  };

  onItemClick = index => {
    const city = this.cities[index].text;
    const { onCitySelected, onClose } = this;
    onCitySelected(city);
    onClose();
  };

  autoSuggestCallback = (results = [], searchTerm) => {
    this.setState({ results, searchTerm });
  };

  render() {
    const { cities, autoSuggestCallback, prepareResultsForDisplay, onClose, onCityFieldClicked, onItemClick } = this;
    const { results, searchTerm, open, city } = this.state;
    const displayInitialList = searchTerm.length === 0 ? true : false;
    const resultsForDisplay = prepareResultsForDisplay(results);

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
          />
        </div>
        <Dialog bodyStyle={{ padding: "5px" }} title="Choose City" modal={false} open={open} onRequestClose={onClose} autoScrollBodyContent={true}>
          <AutoSuggest dataSource={cities} searchInputText="Search" searchKey="text" callback={autoSuggestCallback} />
          <List
            onItemClick={onItemClick}
            listItemStyle={{ borderBottom: "1px solid #eee" }}
            items={displayInitialList ? prepareResultsForDisplay(cities) : prepareResultsForDisplay(results)}
          />
        </Dialog>
      </div>
    );
  }
}
