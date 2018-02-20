import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { action } from "@storybook/addon-actions";
import { Button } from "../components";

let theme = {
  fontFamily: "Lato, sans",
  textColor: "rgba(0, 0, 0, 0.68)",
  backgroundcolor: "#F7F7F7",
  palette: {
    primary1Color: "#009688",
    primary2Color: "#f58720",
    textColor: "#5f5c62",
    canvasColor: "#F7F7F7",
    borderColor: "#0288d1"
  },
  raisedButton: {
    primaryColor: "#607D8B"
  },
  floatingActionButton: {
    color: "#f58720"
  }
};

storiesOf("Button", module)
  .addDecorator(muiTheme([theme]))
  .add("with text", () => <Button label="Hello" onClick={action("clicked")} />)
  .add("with some emoji", () => (
    <Button label="😀 😎 👍 💯" onClick={action("clicked")} />
  ))
  .add("with primary true", () => (
    <Button
      primary={true}
      label="Button with primary"
      onClick={action("clicked")}
    />
  ));
