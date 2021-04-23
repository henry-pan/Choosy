import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchUserIdeas, destroyIdea } from '../../actions/idea_actions';
import Room from './room';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
  userIdeas: Object.values(state.ideas.user)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchUserIdeas: userId => dispatch(fetchUserIdeas(userId)),
  destroyIdea: ideaId => dispatch(destroyIdea(ideaId)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
