import React from 'react';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { FlatButton, IconButton, FontIcon } from 'material-ui';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
  DropDownMenu,
  MenuItem,
  IconMenu,
  CircularProgress
} from 'material-ui';

import ActionHome from 'material-ui/svg-icons/action/home';
import Done from 'material-ui/svg-icons/action/done';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';

import { goBack } from 'react-router-redux';
import currentWeightSelector from './../store/selectors/current_weight';
import isTrainingDay from './../store/selectors/exercises';
import { openSideBar } from './../store/actionCreators/app_action_creators';
import todayMacros from './../store/selectors/current_macros';

//TODO just saving indicator
const HeaderContainer = ({
  currentWeight,
  exercises,
  todaysMacros,
  openSideBar,
  isLoading,
  userName,
  goBack
}) => {
  return (
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <IconButton tooltip="Main menu" onTouchTap={() => openSideBar()}>
          <ActionHome />
        </IconButton>
      </ToolbarGroup>
      <ToolbarGroup>
        <IconButton onTouchTap={goBack} tooltip={`Go back`}>
          <ArrowBack />
        </IconButton>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text={`Welcome ${userName} `} />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text={`CurrentWeight ${currentWeight}`} />
        <ToolbarTitle text={`Macros: ${todaysMacros.calorie}`} />
        <ToolbarTitle
          text={`P: ${todaysMacros.protein} C: ${todaysMacros.carbohydrate} F: ${todaysMacros.fat}`}
        />
      </ToolbarGroup>

      <ToolbarGroup>
        {isLoading ? <CircularProgress /> : <Done />}
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text="Exercies for today" />
        <IconMenu
          value={`0`}
          onChange={() => console.log()}
          iconButtonElement={
            <IconButton>
              <ContentFilter />
            </IconButton>
          }
        >
          {_.map(exercises, exec =>
            <MenuItem
              key={exercises.indexOf(exec)}
              value={exercises.indexOf(exec)}
              primaryText={exec}
            />
          )}
        </IconMenu>
      </ToolbarGroup>
    </Toolbar>
  );
};

const mapStateToProps = state => ({
  isLoading: state.getIn(['app', 'isLoading']),
  currentWeight: currentWeightSelector(state),
  exercises: isTrainingDay('main')(state).toJS(),
  todaysMacros: todayMacros(state).toJS(),
  userName: state.getIn(['userDetails', 'userName'])
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(goBack()),
  openSideBar: () => dispatch(openSideBar())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
