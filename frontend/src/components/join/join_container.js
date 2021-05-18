import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import Join from './join';
import { destroyUserIdeas } from '../../actions/idea_actions';
import { fetchRoomByCode } from '../../actions/room_actions';
import { addGuest } from '../../actions/guest_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.user
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  destroyUserIdeas: userId => dispatch(destroyUserIdeas(userId)),
  fetchRoomByCode: code => dispatch(fetchRoomByCode(code)),
  addGuest: () => dispatch(addGuest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Join);
