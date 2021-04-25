import React from 'react';

const Errors = ({ errors }) => {
  return (
    <ul>
      {Object.keys(errors).map((error, i) => (
        <li key={`error-${i}`}>{errors[error]}</li>
      ))}
    </ul>
  );
}

export default Errors;
