import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { action } from "@storybook/addon-actions";
import { TextField } from "../components";
import theme from "../config/theme";
import Wrapper from "./wrapper.js";

storiesOf("TextField", module)
  .addDecorator(muiTheme([theme]))
  .add("All feature", () => (
    <Wrapper
      imports={[
        `import { TextField } from "<Egov-Reusable-Components-Location>";`
      ]}
      component={`TextField`}
      code={`<TextField
              field={{
                label:"Test",
                isRequired:true
              }}
              onChange={action("clicked")}
            />`}
    >
      <TextField
        field={{
          label:"Test",
          isRequired:true
        }}
        onChange={action("clicked")}
      />
    </Wrapper>
  ))
