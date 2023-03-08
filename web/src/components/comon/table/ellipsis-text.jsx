import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from 'antd';

const { Paragraph } = Typography;

ElipsisText.propTypes = {
  rows: PropTypes.number,
  symbol: PropTypes.node,
  expandable: PropTypes.bool
};

function ElipsisText({ rows = 2, symbol = 'more', expandable = false, children }) {
  return <Paragraph ellipsis={{ rows, symbol, expandable }}>{children}</Paragraph>;
}

export default ElipsisText;
