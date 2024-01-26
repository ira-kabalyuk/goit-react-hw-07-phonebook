import React from 'react';
import styles from './Loader.module.scss';
import { ThreeDots } from 'react-loader-spinner'


const Loader = () => {
  return (
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass={styles.block}
    />
  );
};

export { Loader };