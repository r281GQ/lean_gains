import React from "react";
import Immutable from 'immutable';
import {Link} from 'react-router-dom';
import * as _ from 'lodash';
//name navigation kg macros kcal, current macros fro  tuday later on when it is implemented
const HeaderContainer = ({ currentWeight, exercises, todaysMacros}) => {

  console.log( currentWeight);
  console.log( exercises);
  console.log( todaysMacros);

   return (
    <div>
      <Link to='/sdfsdfsdfsdfsdf'><span>prevoius</span></Link>
      <div>CurrentWeight: {currentWeight}</div>
      <div>
          {_.map(exercises, exec => <div key={Math.random()}>{exec}</div> )}

        <Link to='/main/workout'><span>workout</span></Link>
        <Link to='/main/kcal'><span>kcal</span></Link>
        <Link to='/main/daily_log'><span>daily_log</span></Link>
      </div>
    </div>
  );

};


export default HeaderContainer;
