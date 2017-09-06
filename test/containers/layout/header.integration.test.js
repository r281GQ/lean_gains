import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mount } from 'enzyme';
import { PureHeaderContainer } from './../../../src/containers/layout/header';

const muiTheme = getMuiTheme();

const router = {
  history: {
    push: () => undefined,
    replace: () => undefined,
    createHref: () => undefined
  }
};

injectTapEventPlugin();

describe('Header integration test', () => {
  it('should render', () => {
    const component = mount(
      <PureHeaderContainer location={{ pathname: '' }} />,
      {
        context: { muiTheme, router },
        childContextTypes: {
          muiTheme: PropTypes.object,
          router: PropTypes.any
        }
      }
    );

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
