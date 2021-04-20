import { connect } from "react-redux";
import About from "./about";

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(null, mapDispatchToProps)(About);
