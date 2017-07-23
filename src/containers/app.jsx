import React, { PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";

import LoginContainer from "./login";
import SignUpContainer from "./signup";
import MainContainer from "./main";
import withAuthentication from './authentication';

//TODO: indicatsn of progress bar, modal as hoc
class App extends PureComponent {
  render() {
    return (
      <div>
        <Route path="/app" component={withAuthentication(MainContainer)} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/signup" component={SignUpContainer} />
        <Redirect to='/app'/>
      </div>
    );
  }
}

export default App;
