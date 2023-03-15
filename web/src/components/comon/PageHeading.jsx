import React from 'react';
import PropTypes from 'prop-types';

PageHeading.propTypes = {
  children: PropTypes.node
};
export default function PageHeading({ children }) {
  return <div className="page-heading">{children}</div>;
}
