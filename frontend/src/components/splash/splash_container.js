import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import SplashPage from './splash_page';
import { addRoom, fetchRoom } from '../../actions/room_actions';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
  room: state.rooms
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal)),
  addRoom: data => dispatch(addRoom(data)),
  fetchRoom: roomId => dispatch(fetchRoom(roomId))
});


export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);
