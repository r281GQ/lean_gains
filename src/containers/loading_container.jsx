import React from 'react';
import { connect } from 'react-redux';

import LoadingScreen from './../components/loading';

const withLoadingScreen = WrappedComponent => {
  const LoadingScreenContainer = ({ isLoading }) =>
    isLoading ? <div><LoadingScreen /></div> : <WrappedComponent />;
  return connect(state => ({
    isLoading: state.getIn(['app', 'isLoading'])
  }))(LoadingScreenContainer);
};

export default withLoadingScreen;
