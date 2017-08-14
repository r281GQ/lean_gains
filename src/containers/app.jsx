import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import LoginContainer from './auth/login';
import SignUpContainer from './auth/signup';
import HeaderContainer from './layout/header';
import FooterContainer from './layout/footer';
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
