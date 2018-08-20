import React, { Component } from "react";
import routes from "./Routes";
import Router from "./Router";

class App extends Component {
  render() {
    return (
      <div>
        <Router routes={routes} />
      </div>
    );
  }
}

export default App;
