import React from 'react';

const CollectionItem = ({ label, action, icon, btnColor }) => (
  <li className='collection-item'>
    <div>
      {label}
      <a
        href='#!'
        className={`secondary-content ${btnColor}-text margine-sinistro`}
      >
        <i className='material-icons' onClick={action}>
          {icon}
        </i>
      </a>
    </div>
  </li>
);

export default CollectionItem;
