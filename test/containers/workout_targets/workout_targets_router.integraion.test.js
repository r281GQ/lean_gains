import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import { StaticRouter } from 'react-router-dom';

import { PureWorkoutTargetsRouter } from './../../../src/containers/workout_targets/workout_targets_router';

const muiTheme = getMuiTheme();

const store = createStore(
  combineReducers({
    app: () => fromJS({ isErrorModalOpen: false, message: [''] }),
    formReducer
  })
);

injectTapEventPlugin();

describe('WorkoutTargetsRouter integration test', () => {
  it('should render', () => {
    const component = mount(
      <StaticRouter location="" context={{}}>
        <PureWorkoutTargetsRouter />
      </StaticRouter>,
      {
        context: { muiTheme, store },
        childContextTypes: {
          muiTheme: PropTypes.object,
          store: PropTypes.object
        }
      }
    );

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
