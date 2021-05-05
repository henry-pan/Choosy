import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import { addRoom, fetchRoom, fetchRoomByCode } from '../../actions/room_actions';
import SplashPage from './splash_page';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
  room: state.rooms,
  errors: state.errors.room
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal)),
  addRoom: data => dispatch(addRoom(data)),
  fetchRoom: roomId => dispatch(fetchRoom(roomId)),
  fetchRoomByCode: code => dispatch(fetchRoomByCode(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);
