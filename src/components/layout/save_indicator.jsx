import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarGroup, CircularProgress } from 'material-ui';
import Done from 'material-ui/svg-icons/action/done';

const SaveIndicator = ({ isLoading }) =>
  <ToolbarGroup>
    {isLoading ? <CircularProgress /> : <Done color="white" />}
  </ToolbarGroup>;

SaveIndicator.propTypes = {
  isLoading: PropTypes.bool,
};

export default SaveIndicator;
