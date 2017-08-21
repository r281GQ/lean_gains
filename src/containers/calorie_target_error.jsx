import React from 'react';

import { Redirect } from 'react-router-dom';

class CalorieTargetError extends React.PureComponent {
  //dispatchmodal open action
  componentDidMount (){

  }

  render () {
    return   <Redirect to="/app"/>
  }

}

CalorieTargetError.propTypes = {

};

export default CalorieTargetError;
