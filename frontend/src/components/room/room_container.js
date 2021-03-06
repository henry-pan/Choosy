import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchUserIdeas, fetchRoomIdeas, destroyIdea, addIdea } from '../../actions/idea_actions';
import Room from './room';
import { receiveGuests } from '../../actions/guest_actions';
import { fetchRoom, patchRoom } from '../../actions/room_actions';

const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
  roomIdeas: Object.values(state.ideas.room),
  userIdeas: Object.values(state.ideas.user),
  room: state.rooms.id.data
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  loadGuests: (guests) => dispatch(receiveGuests(guests)),
  fetchRoom: (roomId) => dispatch(fetchRoom(roomId)),
  patchRoom: (data) => dispatch(patchRoom(data)),
  fetchUserIdeas: userId => dispatch(fetchUserIdeas(userId)),
  fetchRoomIdeas: roomId => dispatch(fetchRoomIdeas(roomId)),
  destroyIdea: ideaId => dispatch(destroyIdea(ideaId)),
  addIdea: idea => dispatch(addIdea(idea))
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
