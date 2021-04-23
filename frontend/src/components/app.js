import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';

import SplashContainer from './splash/splash_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import RoomContainer from './room/room_container';
import VotingPhaseContainer from './voting_phase/voting_phase_container';
import VotingResultsContainer from './voting_results/voting_results_container';
import VotingWinnerContainer from './voting_winner/voting_winner_container';

const App = () => (
  <>
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/register" component={SignupFormContainer} />
      <ProtectedRoute exact path="/room" component={RoomContainer} />
      <Route exact path="/voting" component={VotingPhaseContainer} />
      <Route exact path="/result" component={VotingResultsContainer} />
      <Route exact path="/winner" component={VotingWinnerContainer} />
      <Route exact path="/" component={SplashContainer} />
    </Switch>
  </>
);

export default App;
