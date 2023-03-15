import React from 'react';
import { t } from 'ttag';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
// antd
import { Button, Row, Col, Checkbox, Card, Typography } from 'antd';

// app
import { PRIVATE_PATHS } from '@routes/path';
import { getProfile } from '@services/api/auth';
import { profileSt } from '@recoil/user/profile';
//
import FormLogin from './form';

const { Title } = Typography;

// ------------------------------------------------------------
function Login() {
  const navigate = useNavigate();
  const [remember, setRemember] = React.useState(true);
  const setUserProfileSt = useSetRecoilState(profileSt);

  const handleLogin = (data) => {
    getProfile().then((user) => {
      const url = PRIVATE_PATHS.root;
      navigate(url);
      setUserProfileSt(user);
    });
  };

  return (
    <Row align="middle" style={{ height: '80vh', padding: 8 }}>
      <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }}>
        <Card
          title={
            <Title level={3} style={{ textAlign: 'center', padding: 0, marginBottom: 0 }}>
              {t`Login`}
            </Title>
          }
        >
          <FormLogin onChange={handleLogin}>
            <Row>
              <Col span={12}>
                <Checkbox
                  style={{ padding: '4px 0' }}
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                >{t`Remember me`}</Checkbox>
              </Col>
              <Col span={12}>
                <Button type="link" style={{ float: 'right' }} onClick={() => navigate('/forgot-password')}>
                  {t`Forgot password`}
                </Button>
              </Col>
            </Row>
          </FormLogin>
        </Card>
      </Col>
    </Row>
  );
}

Login.displayName = 'Login';
export default Login;
