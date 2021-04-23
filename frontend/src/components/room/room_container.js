import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchUserIdeas, destroyIdea } from '../../actions/idea_actions';
import Room from './room';
import { receiveGuests } from '../../actions/guest_actions';
import { fetchRoom } from '../../actions/room_actions';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
  userIdeas: Object.values(state.ideas.user)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  loadGuests: (guests) => dispatch(receiveGuests(guests)),
  fetchRoom: (roomId) => dispatch(fetchRoom(roomId)),
  fetchUserIdeas: userId => dispatch(fetchUserIdeas(userId)),
  destroyIdea: ideaId => dispatch(destroyIdea(ideaId)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
