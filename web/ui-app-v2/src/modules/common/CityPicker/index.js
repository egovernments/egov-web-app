import React, { Component } from "react";
import { List, Dialog, TextFieldIcon, AutoSuggest } from "../../../components";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";
import { TENANT } from "utils/endPoints";
import { httpRequest } from "utils/api";

export default class CityPickerDialog extends Component {
  state = { results: [], searchTerm: "", open: false, cities: [] };

  componentDidMount = async () => {
    document.getElementById("person-city").addEventListener("focus", function() {
      this.blur();
    });
    try {
      const payload = await httpRequest(TENANT.GET.URL, TENANT.GET.ACTION, [
        { key: "moduleName", value: "tenant" },
        { key: "masterName", value: "tenants" },
      ]);
      const cities = payload.MdmsRes["tenant"]["tenants"].map((item) => {
        return {
          key: item.code,
          text: item.city.name,
        };
      });
      this.setState({ cities });
    } catch (error) {
      console.log(error);
    }
  };

  componentWillUnmount() {
    document.getElementById("person-city").removeEventListener("focus", null);
  }

  getCityNameByCode = (code) => {
    const { cities } = this.state;
    const city = (cities || []).filter((city) => city.key === code);
    return (city && city.length && city[0].text) || "";
  };

  prepareResultsForDisplay = (results = []) => {
    return results.map((result, index) => {
      const mappedResult = {};
      mappedResult.key = result.key;
      mappedResult.primaryText = result.text;
      mappedResult.id = result.key;
      return mappedResult;
    });
  };

  onCityFieldClicked = () => {
    this.setState({
      open: true,
      searchTerm: "",
    });
  };

  onClose = () => {
    this.setState({ open: false });
  };

  onItemClick = (item, index) => {
    const { key } = item;
    if (key) {
      const { formKey, fieldKey, onChange } = this.props;
      onChange(formKey, fieldKey, key);
      this.onClose();
    }
  };

  autoSuggestCallback = (results = [], searchTerm) => {
    if (results.length === 0) {
      results.push({ key: "", text: "No City Found" });
    }
    this.setState({ results, searchTerm });
  };

  render() {
    const { autoSuggestCallback, prepareResultsForDisplay, onClose, getCityNameByCode, onCityFieldClicked, onItemClick } = this;
    const { cities, results, searchTerm, open } = this.state;
    const { field } = this.props;
    const displayInitialList = searchTerm.length === 0 ? true : false;

    return (
      <div>
        <div onClick={onCityFieldClicked}>
          <TextFieldIcon {...field} value={getCityNameByCode((field || {}).value)} id="person-city" iconPosition="after" Icon={DownArrow} />
        </div>
        <Dialog
          titleStyle={{ textAlign: "left", padding: "24px 16px" }}
          handleClose={onClose}
          bodyStyle={{ padding: "0px" }}
          title="Choose City"
          modal={false}
          open={open}
          autoScrollBodyContent={true}
          onRequestClose={onClose}
          autoScrollBodyContent={true}
        >
          <AutoSuggest id="city-picker-search" dataSource={cities} searchInputText="Search" searchKey="text" callback={autoSuggestCallback} />
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
