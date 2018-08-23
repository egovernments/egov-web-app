import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Dialog, AutoSuggest } from "components";

class CityPickerDialog extends Component {
  state = { results: [], searchTerm: "", open: false };

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

  onItemClick = (item) => {
    const { history } = this.props;
    history.push("pgr-home");
  };

  autoSuggestCallback = (results = [], searchTerm) => {
    if (results.length === 0) {
      results.push({ key: "", text: "No City Found" });
    }
    this.setState({ results, searchTerm });
  };

  render() {
    const { autoSuggestCallback, prepareResultsForDisplay, onClose, onItemClick } = this;
    const { onDialogueClose, dialogueOpen, filteredTenants, moduleItems } = this.props;
    const { results, searchTerm, open } = this.state;
    const displayInitialList = searchTerm.length === 0 ? true : false;
    return (
      <div>
        <Dialog
          className="citipicker-dialog"
          titleStyle={{ textAlign: "left", padding: "24px 16px" }}
          handleClose={onClose}
          bodyStyle={{ padding: "0px", overflowX: "hidden", maxHeight: "100%", minHeight: "100px" }}
          title="Choose City"
          modal={false}
          open={dialogueOpen}
          autoScrollBodyContent={true}
          onRequestClose={onDialogueClose}
          style={{
            paddingTop: "0",
            // marginTop: "-30px",
            bottom: "0",
            height: "auto",
          }}
          isClose={true}
        >
          <AutoSuggest
            id="city-picker-search"
            dataSource={filteredTenants}
            searchInputText="Search"
            searchKey="text"
            autoFocus={false}
            callback={autoSuggestCallback}
          />
          <List
            onItemClick={onItemClick}
            innerDivStyle={{ paddingLeft: "50px" }}
            listItemStyle={{ borderBottom: "1px solid #eee" }}
            items={displayInitialList ? prepareResultsForDisplay(filteredTenants) : prepareResultsForDisplay(results)}
          />
        </Dialog>
      </div>
    );
  }
}

const getCitiesfromTenantID = (tenantIds, cities) => {
  return cities.filter((city) => tenantIds && tenantIds.indexOf(city.code) > -1);
};

const mapStateToProps = (state, ownProps) => {
  const cities = state.common.cities || [];
  const { moduleItems } = ownProps || [];
  const tenantIds = moduleItems.length && moduleItems.filter((item) => item.moduleTitle === "Complaints")[0].cities;
  const filteredTenants = getCitiesfromTenantID(tenantIds, cities);
  return { cities, filteredTenants };
};

export default connect(mapStateToProps)(CityPickerDialog);
