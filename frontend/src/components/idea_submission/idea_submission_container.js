import { connect } from 'react-redux';
import IdeaSubmissionIndex from './idea_submission_index';
import { addIdea, destroyIdea } from '../../actions/idea_actions';


const mapStateToProps = state => ({
  currentUser: state.session.user,
  userIdeas: Object.values(state.ideas.user)
});

const mapDispatchToProps = (dispatch) => ({
  addIdea: idea => dispatch(addIdea(idea)),
  destroyIdea: ideaId => dispatch(destroyIdea(ideaId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IdeaSubmissionIndex);
