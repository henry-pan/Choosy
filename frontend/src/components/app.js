import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import IdeaSubmissionContainer from "./idea_submission/idea_submission_container";

import SplashContainer from './splash/splash_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import RoomContainer from './room/room_container';

const App = () => (
  <>
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/register" component={SignupFormContainer} />
      <ProtectedRoute exact path="/room" component={RoomContainer} />
      <ProtectedRoute exact path="/room/submitideas" component={IdeaSubmissionContainer} />
      <Route exact path="/" component={SplashContainer} />
    </Switch>
  </>
);

export default App;
