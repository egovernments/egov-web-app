import { configure } from "@storybook/react";

function loadStories() {
  require("../src/stories/button.js");
  require("../src/stories/textField.js");
  require("../src/stories/card.js");
}

configure(loadStories, module);
