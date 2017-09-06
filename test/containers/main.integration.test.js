import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import { StaticRouter } from 'react-router-dom';

import { PureMainContainer } from './../../src/containers/main';

const muiTheme = getMuiTheme();

const store = createStore(
  combineReducers({
    app: () => fromJS({ isErrorModalOpen: false, message: [''] }),
    formReducer
  })
);

injectTapEventPlugin();

describe('Main integration test', () => {
  it('should render', () => {
    const initFetchSpy = sinon.spy();
    const getWorkoutLogDatesSpy = sinon.spy();
    const getDailyLogDatesSpy = sinon.spy();

    const component = mount(
      <StaticRouter location="" context={{}}>
        <PureMainContainer initFetchDone={false} initFetch={initFetchSpy}
          getWorkoutLogDates ={getWorkoutLogDatesSpy}
          getDailyLogDates ={getDailyLogDatesSpy} />
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

  it('should call initFetch', () => {
    const initFetchSpy = sinon.spy();
    const getWorkoutLogDatesSpy = sinon.spy();
    const getDailyLogDatesSpy = sinon.spy();

    const componentDidMountSpy = sinon.spy(
      PureMainContainer.prototype,
      'componentDidMount'
    );

    const component = mount(
      <StaticRouter location="" context={{}}>
        <PureMainContainer initFetchDone={false} initFetch={initFetchSpy}
          getWorkoutLogDates ={getWorkoutLogDatesSpy}

          getDailyLogDates ={getDailyLogDatesSpy} />
      </StaticRouter>,
      {
        context: { muiTheme, store },
        childContextTypes: {
          muiTheme: PropTypes.object,

          store: PropTypes.object
        }
      }
    );


    expect(initFetchSpy.calledOnce).toBe(true);
    expect(getDailyLogDatesSpy.calledOnce).toBe(true);
    expect(getWorkoutLogDatesSpy.calledOnce).toBe(true);
    expect(componentDidMountSpy.calledOnce).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
    componentDidMountSpy.restore();
  });

  it('should not call initFetch', () => {
    const initFetchSpy = sinon.spy();

    const componentDidMountSpy = sinon.spy(
      PureMainContainer.prototype,
      'componentDidMount'
    );

    const component = mount(
      <StaticRouter location="" context={{}}>
        <PureMainContainer initFetchDone initFetch={initFetchSpy} />
      </StaticRouter>,
      {
        context: { muiTheme, store },
        childContextTypes: {
          muiTheme: PropTypes.object,
          store: PropTypes.object
        }
      }
    );

    expect(initFetchSpy.calledOnce).toBe(false);
    expect(componentDidMountSpy.calledOnce).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();

    componentDidMountSpy.restore();
  });
});
