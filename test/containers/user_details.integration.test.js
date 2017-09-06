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
import moment from 'moment';

import { PureUserDetailsContainer } from './../../src/containers/user_details';

const muiTheme = getMuiTheme();

const router = {
  history: {
    push: () => undefined,
    replace: () => undefined,
    createHref: () => undefined
  }
};

const store = createStore(combineReducers({ formReducer }));

const _reduxForm = {
  getFormState: state => state,
  asyncValidate: state => state,
  getValues: state => state,
  sectionPrefix: state => state,
  register: state => state,
  unregister: state => state,
  registerInnerOnSubmit: state => state
};

/*eslint no-undef: "off"*/
injectTapEventPlugin();

describe('UserDetails integration test', () => {
  let dateStub;

  beforeEach(() => {
    dateStub = sinon.stub(Date, 'now').returns(1);
  });

  afterEach(() => {
    dateStub.restore();
  });

  it('should render', () => {
    const updateUserDetailsSpy = sinon.spy();

    const initializeSpy = sinon.stub().callsFake(value => value);

    const date = moment().toDate();

    const component = mount(
      <PureUserDetailsContainer
        updateUserDetails={updateUserDetailsSpy}
        handleSubmit={() => value => value}
        initialize={initializeSpy}
        userName="Endre"
        dob={date}
        sex="male"
      />,
      {
        context: { muiTheme, router, store, _reduxForm },
        childContextTypes: {
          muiTheme: PropTypes.object,
          router: PropTypes.any,
          store: PropTypes.object,
          _reduxForm: PropTypes.object
        }
      }
    );

    expect(component).toHaveLength(1);
  });

  it('should call initializeSpy with proper arguments on mount', () => {
    const updateUserDetailsSpy = sinon.spy();

    const componentDidMountSpy = sinon.spy(
      PureUserDetailsContainer.prototype,
      'componentDidMount'
    );

    const initializeSpy = sinon.stub().callsFake(value => value);

    const date = moment().toDate();

    const component = mount(
      <PureUserDetailsContainer
        updateUserDetails={updateUserDetailsSpy}
        handleSubmit={() => func => func}
        initialize={initializeSpy}
        userName="Endre"
        dob={date}
        sex="male"
      />,
      {
        context: { muiTheme, router, store, _reduxForm },
        childContextTypes: {
          muiTheme: PropTypes.object,
          router: PropTypes.any,
          store: PropTypes.object,
          _reduxForm: PropTypes.object
        }
      }
    );

    expect(
      initializeSpy.calledWith(
        fromJS({ userName: 'Endre', dob: moment(date).toDate(), sex: 'male' })
      )
    ).toBe(true);

    expect(initializeSpy.calledOnce).toBe(true);
    expect(componentDidMountSpy.calledOnce).toBe(true);

    expect(component).toHaveLength(1);
    componentDidMountSpy.restore();
  });
});
