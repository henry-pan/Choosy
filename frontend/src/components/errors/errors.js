import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./errors.css"

const Errors = ({ errors, closeModal }) => {
  return (
    <>
    <div className="error-header">
      <span className="error-close" onClick={closeModal}><FontAwesomeIcon icon={faTimes} /></span>
    </div>
    <div className="error-content">
      <h1 className="title">Uh oh!</h1> 
      <ul className="error-list">
        {Object.keys(errors).map((error, i) => (
          <li key={`error-${i}`}>{errors[error]}</li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default Errors;
