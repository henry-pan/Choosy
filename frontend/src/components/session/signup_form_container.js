import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => ({
  signedIn: state.session.isSignedIn,
  errors: state.errors.session,
  formType: "Register"
});

const mapDispatchToProps = (dispatch) => ({
  processForm: user => dispatch(signup(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
