import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import VotingWinner from './voting_winner';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(VotingWinner);
