import { configure } from "@storybook/react";

function loadStories() {
  require("../src/stories/button.js");
  require("../src/stories/textField.js");
  require("../src/stories/label.js");
  require("../src/stories/textArea.js");
  require("../src/stories/card.js");
  require("../src/stories/bottomNavigation.js");
  require("../src/stories/tabs.js");
  require("../src/stories/datepicker.js");
}

configure(loadStories, module);
