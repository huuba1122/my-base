import React from 'react';
import { t } from 'ttag';
import { useNavigate } from 'react-router-dom';

// antd
import { Row, Col, Card, Typography } from 'antd';

// app
import { AUTH_PATHS } from '@src/routes/path';
import ResetPwdForm from './form';

const { Title } = Typography;

// ------------------------------------------------------------
function ResetPwd() {
  const navigate = useNavigate();

  const handleResetPwd = (data) => {
    navigate(AUTH_PATHS.login);
    console.log('ResetPwd data: ', data);
  };

  return (
    <Row align="middle" style={{ height: '70vh', padding: 8 }}>
      <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }}>
        <Card
          title={
            <Title level={3} style={{ textAlign: 'center', padding: 0, marginBottom: 0 }}>
              {t`Input your new password`}?
            </Title>
          }
        >
          <ResetPwdForm onChange={handleResetPwd} />
        </Card>
      </Col>
    </Row>
  );
}

ResetPwd.displayName = 'ResetPwd';
export default ResetPwd;
