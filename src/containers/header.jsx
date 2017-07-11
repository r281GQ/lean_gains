import React from "react";
import Immutable from "immutable";
import { Link } from "react-router-dom";
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
import ContentFilter from "material-ui/svg-icons/content/filter-list";

//TODO show the current route and page
const HeaderContainer = ({
  currentWeight,
  exercises,
  todaysMacros,
  setter,
  loading
}) => {
  if(loading) return null;
  return (
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <IconButton tooltip="Main menu" onTouchTap={setter}>
          <ActionHome />
        </IconButton>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text={`Welcome User `} />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text={`CurrentWeight ${currentWeight}`} />
        <ToolbarTitle text={`Macros: ${todaysMacros.kcal}`} />
        <ToolbarTitle
          text={`P: ${todaysMacros.protein} C: ${todaysMacros.carbohydrate} F: ${todaysMacros.fat}`}
        />
      </ToolbarGroup>

      <ToolbarGroup>
        <CircularProgress />
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

export default HeaderContainer;
