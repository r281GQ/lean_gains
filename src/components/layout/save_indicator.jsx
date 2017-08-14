import React from 'react';
import { ToolbarGroup, CircularProgress } from 'material-ui';
import Done from 'material-ui/svg-icons/action/done';

const SaveIndicator = ({ isLoading }) =>
  <ToolbarGroup>
    {isLoading ? <CircularProgress /> : <Done color="white" />}
  </ToolbarGroup>;

export default SaveIndicator;
