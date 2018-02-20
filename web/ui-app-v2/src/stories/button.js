import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { action } from "@storybook/addon-actions";
import { Button } from "../components";
import theme from "../config/theme";

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
  ))
  .add("with disabled", () => <Button disabled={true} label="I am disabled" />);
