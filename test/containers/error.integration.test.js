import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { fromJS, List } from 'immutable';
import { StaticRouter } from 'react-router-dom';

import { PureError } from './../../src/containers/error';

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
    const closeErrorModalSpy = sinon.spy();
    const unSetMessagesSpy = sinon.spy();
    
    const component = mount(
      <StaticRouter location="" context={{}}>
        <PureError
          closeErrorModal={closeErrorModalSpy}
          unSetMessages={unSetMessagesSpy}
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

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
