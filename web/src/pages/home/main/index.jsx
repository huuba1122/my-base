import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'antd';

// css
import styles from './main.module.scss';

const MainContent = ({ left, children }) => {
  return (
    <Layout>
      <div className={styles['main-content']}>
        <div className={styles['left-sibar']}>{left}</div>
        <div className={styles['content']}>{children}</div>
      </div>
    </Layout>
  );
};

MainContent.propTypes = {
  left: PropTypes.node,
  children: PropTypes.node
};

MainContent.displayName = 'MainContent';
export default MainContent;
