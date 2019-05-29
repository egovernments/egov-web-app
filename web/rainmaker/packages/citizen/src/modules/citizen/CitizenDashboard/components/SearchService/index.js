import React from "react";
import { Icon, TextField } from "components";
import { withStyles } from "@material-ui/core/styles";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";

const styles = (theme) => ({
  root: {
    padding: "2px 4px",
    margin: "0px 8px",
    position: "fixed",
    top: "75px",
    height: "56px",
    zIndex: "1100",
    display: "flex",
    alignItems: "center",
    boxShadow: "0px 2px rgba(0, 0, 0, 0.23)",
    backgroundColor: "#fff",
    borderRadius: "28px",
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: "16px",
  },
});

class SearchService extends React.Component {
  state = {
    searchValue: "",
  };

  onSearchClick = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={`${classes.root} dashboard-search-main-cont`}>
        <Icon action="action" name="search" style={{ marginLeft: 12 }} />
        {/* <TextField InputProps={{ disableUnderline: true }} className={classes.input} placeholder={"Search Services & Information"} /> */}
        <TextField
          style={{ height: 56, padding: "0px 0px 20px 10px" }}
          id="dashboard-search"
          underlineShow={false}
          value={this.state.searchValue}
          hintText={
            <Label
              label="COMMON_SEARCH_SERVICE_INFORMATION"
              color="rgba(0, 0, 0, 0.38)"
              fontSize={16}
              containerStyle={{ marginLeft: 10, paddingBottom: 5 }}
            />
          }
          onChange={(e) => this.onSearchClick(e)}
        />

        <Icon action="av" name="mic" style={{ marginRight: 12 }} />
      </div>
    );
  }
}

export default withStyles(styles)(SearchService);
