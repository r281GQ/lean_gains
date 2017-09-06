import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { fromJS, List, Map } from 'immutable';
import { StaticRouter } from 'react-router-dom';

import WorkoutTarget, {
  PureWorkoutTarget
} from './../../../src/containers/workout_targets/workout_target';

const muiTheme = getMuiTheme();

const store = createStore(
  combineReducers({
    app: () => fromJS({ isErrorModalOpen: false, message: [''] }),
    formReducer
  })
);

injectTapEventPlugin();

describe('WorkoutTarget integration test', () => {
  const componentDidMountSpy = sinon.spy(
    PureWorkoutTarget.prototype,
    'componentDidMount'
  );

  const handleSpy = sinon.spy(
    PureWorkoutTarget.prototype,
    '_handleInitializeComponent'
  );

  beforeEach(() => {});

  afterEach(() => {
    componentDidMountSpy.restore();
    handleSpy.restore();
  });

  it('should render', () => {
    const initializeSpy = sinon.stub().callsFake(() => '');

    const component = mount(
      <StaticRouter location="" context={{}}>
        <WorkoutTarget
          handleSubmit={() => () => undefined}
          updateWorkoutTarget={() => undefined}
          createWorkoutTarget={() => undefined}
          defaultValue={null}
          initialize={initializeSpy}
        />
      </StaticRouter>,
      {
        context: { muiTheme, store },
        childContextTypes: {
          muiTheme: PropTypes.object,
          store: PropTypes.object
        }
      }
    );

    expect(initializeSpy.calledOnce).toBe(false);
    expect(componentDidMountSpy.calledOnce).toBe(true);
    expect(handleSpy.calledOnce).toBe(true);

    expect(component).toHaveLength(1);
  });

  it('should _handleInitializeComponent', () => {
    const handleSpy = sinon.spy(
      PureWorkoutTarget.prototype,
      '_handleInitializeComponent'
    );

    const component = mount(
      <StaticRouter location="" context={{}}>
        <WorkoutTarget
          handleSubmit={() => () => undefined}
          updateWorkoutTarget={() => undefined}
          createWorkoutTarget={() => undefined}
          defaultValue={Map().set('onDays', List())}
        />
      </StaticRouter>,
      {
        context: { muiTheme, store },
        childContextTypes: {
          muiTheme: PropTypes.object,
          store: PropTypes.object
        }
      }
    );

    expect(componentDidMountSpy.calledOnce).toBe(true);
    expect(handleSpy.calledOnce).toBe(true);

    expect(component).toHaveLength(1);
  });
});
