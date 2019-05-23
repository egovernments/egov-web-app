import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Router>
      <div>
        <Route path="/" exact component={Home} />
      </div>
    </Router>
    </div>
  );
}

export default App;
