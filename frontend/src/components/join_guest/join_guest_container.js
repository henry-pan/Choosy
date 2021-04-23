import { connect } from "react-redux";
import { closeModal } from '../../actions/modal_actions';
import JoinGuest from "./join_guest";
import { receiveGuest } from "../../actions/guest_actions" // test posting guest to backend from submit event

const mapStateToProps = (state) => ({
  errors: state.errors.session
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  joinAsGuest: (guest) => dispatch(receiveGuest(guest)) // test posting guest to backend from submit event
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinGuest);
