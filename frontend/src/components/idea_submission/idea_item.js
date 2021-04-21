import React from 'react';

export default ({ idea }) => {
  return (
    <li className='idea-item'>
      <h3 className='idea-item-body'>{idea.body}</h3>
      {/* add delete button here */}
    </li>
  )
}