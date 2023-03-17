import React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';

// antd
import { Row, Col } from 'antd';

ProfileSummary.propTypes = {
  data: PropTypes.object
};
export default function ProfileSummary({ data }) {
  return (
    <div>
      <Row className="mt-2">
        <Col span={6}>{t`Fullname`}</Col>
        <Col span={18}>{data.full_name}</Col>
      </Row>

      <Row className="mt-2">
        <Col span={6}>{t`Email`}</Col>
        <Col span={18}>{data.email}</Col>
      </Row>

      <Row className="mt-2">
        <Col span={6}>{t`Phone number`}</Col>
        <Col span={18}>{data.phone_number}</Col>
      </Row>
    </div>
  );
}
