import React from "react";
import Immutable from "immutable";
import { Link } from "react-router-dom";
import * as _ from "lodash";

//loader indicator
//name navigation kg macros kcal, current macros fro  tuday later on when it is implemented
const HeaderContainer = ({ currentWeight, exercises, todaysMacros }) => {
  return (
    <div>
      <Link to="/sdfsdfsdfsdfsdf">
        <span>prevoius</span>
      </Link>
      <div>
        CurrentWeight: {currentWeight}
      </div>
      <div>
        {_.map(exercises, exec =>
          <div key={Math.random()}>
            {exec}
          </div>
        )}
        <br />
        <Link to="/workoutlog/create">
          <span>workoutlog</span>
        </Link>
        <br />
        <Link to="/workoutlog">
          <span>Picker</span>
        </Link>
        <br />
        <Link to="/workoutlog/edit/7">
          <span>workoutloged</span>
        </Link>
        <br />
        <Link to="/kcal">
          <span>kcal</span>
        </Link>
        <Link to="/dailylog">
          <span>daily_log</span>
        </Link>

        <br />
        <Link to="/workouttarget">
          <span>workouttarget</span>
        </Link>
        <br />
        <Link to="/userdetails">
          <span>userdetails</span>
        </Link>
        <br />
        <Link to="/kcaltarget">
          <span>kl</span>
        </Link>
      </div>
      <div>Loaderindicatro</div>
    </div>
  );
};

export default HeaderContainer;
