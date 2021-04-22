import { connect } from 'react-redux';
import React from 'react';
import IdeaSubmissionIndex from './idea_submission_index';
import { addIdea } from '../../actions/idea_actions';
import { fetchUserIdeas } from '../../actions/idea_actions';


const mapStateToProps = state => ({
  currentUser: state.session.user,
  userIdeas: state.ideas.user
});

const mapDispatchToProps = (dispatch) => ({
  addIdea: idea => dispatch(addIdea(idea)),
  fetchUserIdeas: userId => dispatch(fetchUserIdeas(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(IdeaSubmissionIndex)