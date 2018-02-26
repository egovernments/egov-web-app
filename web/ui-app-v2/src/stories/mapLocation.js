import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { action } from "@storybook/addon-actions";
import { MapLocation } from "../components";
import theme from "../config/theme";

storiesOf("MapLocation", module)
  .addDecorator(muiTheme([theme]))
  .add("with a marker", () => <MapLocation />);
