import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import { addRoom, fetchRoomByCode } from '../../actions/room_actions';
import { addGuest } from '../../actions/guest_actions';
import { destroyUserIdeas } from '../../actions/idea_actions';
import { login } from '../../actions/session_actions';
import SplashPage from './splash_page';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
  room: state.rooms,
  errors: state.errors.room,
});

const mapDispatchToProps = dispatch => ({
  processForm: user => dispatch(login(user)),
  logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal)),
  addRoom: data => dispatch(addRoom(data)),
  fetchRoomByCode: code => dispatch(fetchRoomByCode(code)),
  addGuest: () => dispatch(addGuest()),
  destroyUserIdeas: userId => dispatch(destroyUserIdeas(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);
