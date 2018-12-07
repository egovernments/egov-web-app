import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { InputLabel } from "@material-ui/core";
import "./style.css";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit
    // minWidth: 120,
    // maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium
  };
}

class MultipleSelect extends React.Component {
  state = {
    name: []
  };

  render() {
    const { classes, options, placeholder, onChange, value } = this.props;

    return (
      <div className={classes.root}>
        <FormControl
          fullWidth={true}
          //   className={classNames(classes.formControl)}
          style={{ marginTop: "8px !important" }}
        >
          <InputLabel shrink style={{ color: "#FE7A51", fontSize: 14 }}>
            Job Status
          </InputLabel>
          <Select
            multiple
            displayEmpty
            value={value}
            fullWidth={true}
            onChange={onChange}
            style={{ fontSize: 14 }}
            input={<Input id="select-multiple-placeholder" />}
            renderValue={selected => {
              if (selected.length === 0) {
                return <em>{placeholder}</em>;
              }
              return selected.join(", ");
            }}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>{placeholder}</em>
            </MenuItem>
            {options.map(name => (
              <MenuItem
                key={name.value}
                value={name.value}
                style={getStyles(name.label, this)}
              >
                {name.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);
