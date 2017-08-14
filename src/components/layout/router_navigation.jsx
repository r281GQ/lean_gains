import React from 'react';
import { ToolbarGroup, IconButton } from 'material-ui';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

//TODO: implement conditionals (epics ? sagas?)
const RouterNavigation = ({ goBack, goForward }) =>
  <ToolbarGroup>
    <IconButton onTouchTap={() => this.props.goBack()} tooltip={`Go back`}>
      <ArrowBack color="white" />
    </IconButton>
    <IconButton
      onTouchTap={() => this.props.goForward()}
      tooltip={`Go forward`}
    >
      <ArrowForward color="white" />
    </IconButton>
  </ToolbarGroup>;

export default RouterNavigation;
