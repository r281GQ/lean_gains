import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import LoginContainer from './login';
import SignUpContainer from './signup';
import HeaderContainer from './header';
import FooterContainer from './footer';
import withAuthentication from './enhancers/authentication';
import { AsyncMainContainer } from './async/containers';

//TODO: latest view in main window
const App = () =>
  <div>
    <HeaderContainer />
    <Route path="/app" component={withAuthentication(AsyncMainContainer)} />
    <Route exact path="/login" component={LoginContainer} />
    <Route exact path="/signup" component={SignUpContainer} />
    <Redirect to="/app" />
    <FooterContainer />
  </div>;

export default App;
