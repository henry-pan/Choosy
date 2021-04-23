import { connect } from 'react-redux';
import IdeaSubmissionIndex from './idea_submission_index';


const mapStateToProps = state => ({
  currentUser: state.session.user
});

// const mapDispatchToProps = (dispatch) => ({
//   //however the hell we submit the list goes here?
// });

export default connect(mapStateToProps, null)(IdeaSubmissionIndex)