import React from 'react';
import PropTypes from 'prop-types';

import { Pagination as AntPagination } from 'antd';

const styles = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 16
};

Pagination.propTypes = {
  page: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
  onChange: PropTypes.func
};

function Pagination({ page, pageSize = 15, total, onChange }) {
  return (
    <div style={styles}>
      <AntPagination current={page} total={total} pageSize={pageSize} onChange={onChange} />
    </div>
  );
}
export default Pagination;
