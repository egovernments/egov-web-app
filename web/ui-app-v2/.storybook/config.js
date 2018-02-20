import { configure } from "@storybook/react";

function loadStories() {
  require("../src/stories/button.js");
}

configure(loadStories, module);
