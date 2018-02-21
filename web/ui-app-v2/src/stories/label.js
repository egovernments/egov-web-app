import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { action } from "@storybook/addon-actions";
import Label from "../components/Label";
import theme from "../config/theme";

storiesOf("Label", module)
  .addDecorator(muiTheme([theme]))
  .add("with label text", () => <Label label="First Name" />);
