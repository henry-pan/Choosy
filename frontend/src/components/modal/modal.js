import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import AboutContainer from '../about/about_container';
import Errors from '../errors/errors';
import JoinContainer from '../join/join_container';
import { connect } from 'react-redux';
import "./modal.css";

function Modal({ modal, closeModal, errors, roomCode }) {
  if (!modal) {
    return null;
  }
  let component;
  let modalClass;
  switch (modal) {
    case 'about':
      component = <AboutContainer />;
      modalClass = "modal-child modal-about";
      break;
    case 'error':
      component = <Errors errors={errors} closeModal={closeModal}/>;
      modalClass = "modal-child modal-error";
      break;
    case 'join':
      component = <JoinContainer roomCode={roomCode}/>;
      modalClass = "modal-child modal-join";
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className={modalClass} onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      dispatch(closeModal());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);