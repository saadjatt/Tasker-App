import React from 'react';
import style from '../styles/modules/title.module.scss';

function Title({ children, ...rest }) {
  return (
    <p className={style.title} {...rest}>
      {children}
    </p>
  );
}

export default Title;
