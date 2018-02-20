import { configure } from "@storybook/react";

function loadStories() {
  require("../src/stories/button.js");
  require("../src/stories/textField.js");
}

configure(loadStories, module);
