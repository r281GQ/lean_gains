import React from "react";
import Immutable from 'immutable';
import {Link} from 'react-router-dom';
//name navigation kg macros kcal, current macros fro  tuday later on when it is implemented
const HeaderContainer = ({currentKcalPlan, currentWeight, isTrainingDay, todaysMacros}) => {

  let w = todaysMacros.toJS();

  return (
    <div>
      <Link to='/sdfsdfsdfsdfsdf'><span>prevoius</span></Link>
      <div>CurrentWeight: {currentWeight}</div>
      <div>
        {w.kcal}


        <Link to='/main/workout'><span>workout</span></Link>
        <Link to='/main/kcal'><span>kcal</span></Link>
        <Link to='/main/daily_log'><span>daily_log</span></Link>
      </div>
    </div>
  );
};

export default HeaderContainer;
