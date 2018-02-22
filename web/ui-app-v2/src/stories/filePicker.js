import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { action } from "@storybook/addon-actions";
import { FilePicker } from "../components";
import theme from "../config/theme";

storiesOf("FilePicker", module)
  .addDecorator(muiTheme([theme]))
  .add("photopicker", () => <FilePicker browse={true}/>)
  .add("photocapture", () => <FilePicker capture={true}/>)
