import React from "react";
import Immutable from "immutable";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import * as _ from "lodash";
import { FlatButton, IconButton, FontIcon } from "material-ui";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
  DropDownMenu,
  MenuItem,
  IconMenu,
  CircularProgress
} from "material-ui";
import ActionHome from "material-ui/svg-icons/action/home";
import Done from "material-ui/svg-icons/action/done";
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ContentFilter from "material-ui/svg-icons/content/filter-list";

//TODO show the current route and page
//TODO connect to redux on its own
const HeaderContainer = ({
  currentWeight,
  exercises,
  todaysMacros,
  setter,
  isLoading,userName, goBack
}) => {
  return (
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <IconButton tooltip="Main menu" onTouchTap={setter}>
          <ActionHome />
        </IconButton>
      </ToolbarGroup>
      <ToolbarGroup>
        <IconButton  onTouchTap={goBack} tooltip={`Go back`}>
          <ArrowBack/>

        </IconButton>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text={`Welcome ${userName} `} />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text={`CurrentWeight ${currentWeight}`} />
        <ToolbarTitle text={`Macros: ${todaysMacros.kcal}`} />
        <ToolbarTitle
          text={`P: ${todaysMacros.protein} C: ${todaysMacros.carbohydrate} F: ${todaysMacros.fat}`}
        />
      </ToolbarGroup>

      <ToolbarGroup>
        {isLoading ?
          <CircularProgress />
: <Done/>
        }
      </ToolbarGroup>
      <ToolbarGroup>
        {" "}<ToolbarTitle text="Exercies for today" />
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
            >
              {exec}
            </MenuItem>
          )}
        </IconMenu>
      </ToolbarGroup>
    </Toolbar>
  );
};

export default connect() (HeaderContainer);
