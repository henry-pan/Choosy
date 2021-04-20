import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import AboutContainer from '../about/about_container';
import JoinGuestContainer from '../join_guest/join_guest_container';
import { connect } from 'react-redux';

function Modal({ modal, closeModal }) {
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
    case 'join':
      component = <JoinGuestContainer />;
      modalClass = "modal-join";
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