import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => ({
  errors: state.errors.session,
  formType: "Login"
});

const mapDispatchToProps = (dispatch) => ({
  processForm: user => dispatch(login(user)),
  openModal: modal => dispatch(openModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
