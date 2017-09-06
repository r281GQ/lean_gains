import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import sinon from 'sinon';
import { PureSideBarContainer } from './../../../src/containers/layout/side_bar';

const muiTheme = getMuiTheme();

const router = {
  history: {
    push: () => undefined,
    replace: () => undefined,
    createHref: () => undefined
  }
};

injectTapEventPlugin();

describe('SideBar integration test', () => {
  it('should render', () => {
    const logOutSpy = sinon.spy();
    const closeSideBarSpy = sinon.spy();
    const component = mount(
      <PureSideBarContainer
        logOut={logOutSpy}
        closeSideBar={closeSideBarSpy}
      />,
      {
        context: { muiTheme, router },
        childContextTypes: {
          muiTheme: PropTypes.object,
          router: PropTypes.any
        }
      }
    );

    expect(component).toHaveLength(1);
  });
});
