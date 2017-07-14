import React, { PureComponent } from "react";
import { Route } from "react-router-dom";

import LoginContainer from "./login";
import SignUpContainer from "./signup";
import MainContainer from "./main";

class App extends PureComponent {
  render() {
    return (
      <div>
        <Route path="/login" component={LoginContainer} />
        <Route path="/signup" component={SignUpContainer} />
        <Route path="/" component={MainContainer} />
      </div>
    );
  }
}

export default App;
