import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { action } from "@storybook/addon-actions";
import { Dialog } from "../components";
import theme from "../config/theme";

storiesOf("Dialog", module)
  .addDecorator(muiTheme([theme]))
  .add("withclose", () => <Dialog close={true} ok={false} reset={false} />)
  .add("withok", () => <Dialog close={false} ok={true} reset={false} />)
  .add("withReset", () => <Dialog close={false} ok={false} reset={true} />);
