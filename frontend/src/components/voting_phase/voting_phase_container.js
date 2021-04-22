import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import VotingPhase from './voting_phase';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(VotingPhase);
