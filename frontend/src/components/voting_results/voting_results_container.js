import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import VotingResults from './voting_results';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
  // CHANGE IDEAS TO PULL FROM ROOM.IDEAS WHEN ROUTES IN PLACE - done?
  ideas: Object.values(state.ideas.room)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(VotingResults);
