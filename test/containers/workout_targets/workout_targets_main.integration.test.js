import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import sinon from 'sinon';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { fromJS, List, Map } from 'immutable';
import { StaticRouter } from 'react-router-dom';

import DureWorkoutTarget, { PureWorkoutTargetsMainContainer } from './../../../src/containers/workout_targets/workout_targets_main';
// import DureWorkoutTarget from './../../../src/containers/workout_targets/workout_target';

const muiTheme = getMuiTheme();

// const router = {
//   history: {
//     push: () => undefined,
//     replace: () => undefined,
//     createHref: () => undefined
//   },
//   route: {},
//   staticContext: { location: { pathname: '' } }
// };

const store = createStore(
  combineReducers({
    app: () => fromJS({ isErrorModalOpen: false, message: [''] }),
    formReducer
  })
);

// const _reduxForm = {
//   getFormState: state => state,
//   asyncValidate: state => state,
//   getValues: state => state,
//   sectionPrefix: state => state,
//   register: state => state,
//   unregister: state => state,
//   registerInnerOnSubmit: state => state
// };

/*eslint no-undef: "off"*/
injectTapEventPlugin();

describe('Error integration test', () => {
  it('should render and call initFetch', () => {
    // const initFetchSpy = sinon.spy();
    // const _reduxForm = {
    //   getFormState: state => state,
    //   asyncValidate: state => state,
    //   getValues: state => state,
    //   sectionPrefix: state => state,
    //   register: state => () => undefined,
    //   unregister: state => state,
    //   registerInnerOnSubmit: state => () => undefined
    // };
    // const componentDidMountSpy = sinon.spy(
    //   PureWorkoutTargetsMainContainer.prototype,
    //   'componentDidMount'
    // );

    // const _handleSpy = sinon.spy(
    //   PureWorkoutTargetsMainContainer.prototype,
    //   '_handleInitializeComponent'
    // );

    // const _handleSpy = sinon.spy(
    //   PureWorkoutTarget.prototype,
    //   '_handleInitializeComponent'
    // );

    // const initializeSpy = sinon.stub().callsFake(() => '');

    // const date = moment().toDate();
    // if (!this.props.initFetchDone) this.props.initFetch();
    // const openErrorModalSpy = sinon.spy();
    // const setMessagesSpy = sinon.spy();
    const component = mount(
      <StaticRouter location="" context={{}}>
        <PureWorkoutTargetsMainContainer
          workoutTargets={Map()}
          openWorkoutModal={() => undefined}
          setSelectedWorkoutTarget={() => undefined}
        />
      </StaticRouter>,
      {
        context: { muiTheme, store },
        childContextTypes: {
          muiTheme: PropTypes.object,
          // _reduxForm: PropTypes.object,
          store: PropTypes.object
        }
      }
    );

    // expect(
    //   initializeSpy.calledWith(
    //     fromJS({ userName: 'Endre', dob: moment(date).toDate(), sex: 'male' })
    //   )
    // ).toBe(true);

    // expect(initializeSpy.calledOnce).toBe(false);
    // expect(componentDidMountSpy.calledOnce).toBe(true);
    // expect(_handleSpy.calledOnce).toBe(true);

    expect(component).toHaveLength(1);
    // component.unmount();
    // componentDidMountSpy.restore();
    // _handleSpy.restore();
    // initializeSpy.restore();
  });

  // it('should render and call initFetch', () => {
  //   // const initFetchSpy = sinon.spy();
  //   const _reduxForm = {
  //     getFormState: state => state,
  //     asyncValidate: state => state,
  //     getValues: state => state,
  //     sectionPrefix: state => state,
  //     register: state => () => undefined,
  //     unregister: state => state,
  //     registerInnerOnSubmit: state => () => undefined
  //   };
  //   const componentDidMountSpy = sinon.spy(
  //     PureWorkoutTarget.prototype,
  //     'componentDidMount'
  //   );
  //
  //   const _handleSpy = sinon.spy(
  //     PureWorkoutTarget.prototype,
  //     '_handleInitializeComponent'
  //   );
  //
  //   // const _handleSpy = sinon.spy(
  //   //   PureWorkoutTarget.prototype,
  //   //   '_handleInitializeComponent'
  //   // );
  //
  //   const initializeSpy = sinon.stub().callsFake(() => '');
  //
  //   // const date = moment().toDate();
  //   // if (!this.props.initFetchDone) this.props.initFetch();
  //   // const openErrorModalSpy = sinon.spy();
  //   // const setMessagesSpy = sinon.spy();
  //   const component = mount(
  //     <StaticRouter location="" context={{}}>
  //       <DureWorkoutTarget
  //         handleSubmit = {()=>() => undefined}
  //         updateWorkoutTarget = {()=>undefined}
  //           createWorkoutTarget = {()=>undefined}
  //           defaultValue = {Map().set('onDays', List())}
  //
  //       />
  //     </StaticRouter>,
  //     {
  //       context: { muiTheme, store },
  //       childContextTypes: {
  //         muiTheme: PropTypes.object,
  //         // _reduxForm: PropTypes.object,
  //         store: PropTypes.object
  //       }
  //     }
  //   );
  //
  //   // component.setProps('initialize')
  //     // console.log(component.instance());
  //   // expect(
  //   //   initializeSpy.calledWith(
  //   //     fromJS({ userName: 'Endre', dob: moment(date).toDate(), sex: 'male' })
  //   //   )
  //   // ).toBe(true);
  //
  //
  //   expect(componentDidMountSpy.calledOnce).toBe(true);
  //   expect(_handleSpy.calledOnce).toBe(true);
  //
  //   expect(component).toHaveLength(1);
  //   // component.unmount();
  //   componentDidMountSpy.restore();
  // });

  // it('should render and not call initFetch', () => {
  //   const initFetchSpy = sinon.spy();
  //
  //   const componentDidMountSpy = sinon.spy(
  //     PureMainContainer.prototype,
  //     'componentDidMount'
  //   );
  //
  //   // const initializeSpy = sinon.stub().callsFake(() => '');
  //
  //   // const date = moment().toDate();
  //   // if (!this.props.initFetchDone) this.props.initFetch();
  //   const component = mount(
  //     <StaticRouter location="" context={{}}>
  //       <PureMainContainer initFetchDone initFetch={initFetchSpy} />
  //     </StaticRouter>,
  //     {
  //       context: { muiTheme, store },
  //       childContextTypes: {
  //         muiTheme: PropTypes.object,
  //
  //         store: PropTypes.object
  //       }
  //     }
  //   );
  //
  //   // expect(
  //   //   initializeSpy.calledWith(
  //   //     fromJS({ userName: 'Endre', dob: moment(date).toDate(), sex: 'male' })
  //   //   )
  //   // ).toBe(true);
  //
  //   expect(initFetchSpy.calledOnce).toBe(false);
  //   expect(componentDidMountSpy.calledOnce).toBe(true);
  //
  //   expect(component).toHaveLength(1);
  //   component.unmount();
  //   componentDidMountSpy.restore();
  // });
});
