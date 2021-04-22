import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Room from './room';
import { receiveGuests } from '../../actions/guest_actions';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  loadGuests: (guests) => dispatch(receiveGuests(guests))
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
