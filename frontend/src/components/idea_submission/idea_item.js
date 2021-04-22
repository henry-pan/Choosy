import React from 'react';

export default ({ body }) => {
  return (
    <li className='idea-item'>
      <h3 className='idea-item-body'>{body}</h3>
      {/* add delete button here */}
    </li>
  )
}