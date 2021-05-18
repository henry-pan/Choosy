import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import Join from './join';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.user
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Join);
