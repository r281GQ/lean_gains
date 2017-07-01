import React, { Component } from "react";
import Header from "./header";
import RaisedButton from 'material-ui/RaisedButton';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        Main
        <Header />
        <RaisedButton label = 'def'/>
      </div>
    );
  }
}

export default Main;
