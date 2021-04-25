import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import AboutContainer from '../about/about_container';
import Errors from '../errors/errors';
import { connect } from 'react-redux';
import "./modal.css";

function Modal({ modal, closeModal, errors }) {
  if (!modal) {
    return null;
  }
  let component;
  let modalClass;
  switch (modal) {
    case 'about':
      component = <AboutContainer />;
      modalClass = "modal-about";
      break;
    case 'error':
      component = <Errors errors={errors} closeModal={closeModal}/>;
      modalClass = "modal-error";
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