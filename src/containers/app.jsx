import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Route, Link } from "react-router-dom";

import Header from "./header";
import LoginContainer from "./login";
import SignUpContainer from "./signup";
import MainContainer from "./main";

class App extends React.PureComponent {

  render() {
    return (
      <div className="container">
        <Route path="/login" component={LoginContainer} />
        <Route path="/signup" component={SignUpContainer} />
        <Route path="/main" component={MainContainer} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.getIn(["auth", "authenticated"])
});

const mapDispatchToProps = dispatch => ({
  navigate: route => dispatch(push(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
