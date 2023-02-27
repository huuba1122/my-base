import React from 'react';
import { t } from 'ttag';
import { useNavigate } from 'react-router-dom';

// antd
import { Row, Col, Card, Typography } from 'antd';

// app
import { AUTH_PATHS } from '@src/routes/path';
import ChangePwdForm from './form';

const { Title } = Typography;

// ------------------------------------------------------------
function ChangePwd() {
  const navigate = useNavigate();
  const handleChangePwd = (data) => {
    // navigate(AUTH_PATHS.login);
    console.log('Change pwd data: ', data);
  };

  return (
    <Row align="middle" style={{ height: '70vh', padding: 8 }}>
      <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }}>
        <Card
          title={
            <Title level={3} style={{ textAlign: 'center', padding: 0, marginBottom: 0 }}>
              {t`Change your password`}?
            </Title>
          }>
          <ChangePwdForm onChange={handleChangePwd} />
        </Card>
      </Col>
    </Row>
  );
}

ChangePwd.displayName = 'ChangePwd';
export default ChangePwd;
