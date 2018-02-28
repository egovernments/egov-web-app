import React, { Component } from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { action } from "@storybook/addon-actions";
import theme from "../config/theme";
import { Checkbox } from "../components";

const options = [
  {
    label: "India",
    value: "IN",
  },
  {
    label: "USA",
    value: "US",
  },
  {
    label: "Australia",
    value: "AUS",
  },
];

const checkedValues = ["IN", "US", "AUS"];

storiesOf("Checkbox", module)
  .addDecorator(muiTheme([theme]))
  .add("Checkbox", () => <CheckboxContainer />);
  

  export default class CheckboxContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [
          {
            label: "India",
            value: "IN",
          },
          {
            label: "USA",
            value: "US",
          },
          {
            label: "Australia",
            value: "AUS",
          },
        ],
        checkedValues : ["IN", "US", "AUS"]
      };
    }
  
    onCheck = (event,isInputChecked) => {
      console.log(value);
      //this.setState({ value });
    };

    render() {
      return (
        <Checkbox
          onCheck={this.onCheck}
          value={this.state.value}
          options={this.state.options} 
          checkedValues={this.state.checkedValues} 
        />
      );
    }
  
  }
  
