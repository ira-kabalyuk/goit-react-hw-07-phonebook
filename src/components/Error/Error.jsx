import React from 'react';
import styles from './Error.module.scss';

const Error = ({children}) => {
  return (
    <p className={styles.error}>{children}</p>
  );
};

export { Error };