import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import sinon from 'sinon';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { fromJS, List } from 'immutable';
import { StaticRouter } from 'react-router-dom';

import { PureCalorieTargetError } from './../../src/containers/calorie_target_error';

const muiTheme = getMuiTheme();

const store = createStore(
  combineReducers({
    app: () => fromJS({ isErrorModalOpen: false, message: [''] }),
    formReducer
  })
);

injectTapEventPlugin();

describe('Error integration test', () => {
  it('should render', () => {
    const componentDidMountSpy = sinon.spy(
      PureCalorieTargetError.prototype,
      'componentDidMount'
    );

    const _handleSpy = sinon.spy(
      PureCalorieTargetError.prototype,
      '_handleOpenErrorModal'
    );

    const openErrorModalSpy = sinon.spy();
    const setMessagesSpy = sinon.spy();

    const component = mount(
      <StaticRouter location="" context={{}}>
        <PureCalorieTargetError
          openErrorModal={openErrorModalSpy}
          setMessages={setMessagesSpy}
          errorMessages={List().push('test')}
          isErrorModalOpen={false}
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
    expect(_handleSpy.calledOnce).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
