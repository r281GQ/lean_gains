import React, { PureComponent } from "react";
import HeaderContainer from "./header";
import {Card} from 'material-ui';

class MainContainer extends PureComponent {
  render() {
    return (
      <div>
        <HeaderContainer />
        <Card></Card>
      </div>
    );
  }
}

export default MainContainer;
