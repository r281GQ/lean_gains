import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { history } from './store/reducers/routing';
import store from './store/store';
import App from './containers/app';

import './index.scss';

injectTapEventPlugin();

/*eslint no-undef: "off"*/
const DOCUMENT_ROOT = document.getElementById('root');

//TODO: webpack lodash plugin
render(
  <MuiThemeProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  DOCUMENT_ROOT
);
