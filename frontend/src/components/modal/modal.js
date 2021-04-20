import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

function Modal({modal, closeModal, trackId}) {
  if (!modal) {
    return null;
  }
  let component;
  let modalType;
  switch (modal) {
    case 'login':
      component = <LoginFormContainer />;
      modalType = "modal-session";
      break;
    case 'signup':
      component = <SignupFormContainer />;
      modalType = "modal-session";
      break;
    case 'edit':
      component = <EditTrackFormContainer trackId={trackId}/>;
      modalType = "modal-edit-track";
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <span className="modal-close" onClick={closeModal}>&times;</span>
      <div className={modalType} onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.ui.modal
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