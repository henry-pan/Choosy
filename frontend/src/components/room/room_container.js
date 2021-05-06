import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchUserIdeas, fetchRoomIdeas, destroyIdea } from '../../actions/idea_actions';
import Room from './room';
import { receiveGuests } from '../../actions/guest_actions';
import { fetchRoom } from '../../actions/room_actions';

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
  fetchUserIdeas: userId => dispatch(fetchUserIdeas(userId)),
  fetchRoomIdeas: roomId => dispatch(fetchRoomIdeas(roomId)),
  destroyIdea: ideaId => dispatch(destroyIdea(ideaId)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
