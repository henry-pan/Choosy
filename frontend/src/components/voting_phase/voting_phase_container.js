import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { patchIdea } from '../../actions/idea_actions';
import VotingPhase from './voting_phase';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  updateIdea: idea => dispatch(patchIdea(idea))
});

export default connect(mapStateToProps, mapDispatchToProps)(VotingPhase);
