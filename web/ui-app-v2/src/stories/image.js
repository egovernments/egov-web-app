import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { Image } from "../components";
import theme from "../config/theme";

storiesOf("Image", module)
  .addDecorator(muiTheme([theme]))
  .add("default usage", () => (
    <Image source="http://via.placeholder.com/350x250" />
  ));
