import React from 'react';
import { t } from 'ttag';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

// antd
import { Row, Col, Card, Typography } from 'antd';

// apps
import { resetPwdSt, expiredOTPSt } from '@src/recoil/auth/reset-pwd';

import { AUTH_PATHS } from '@src/routes/path';
import ForgotPwdForm from './form';
import { EXPIRED_OTP_TIME } from './consts';
// import OTPDialog from '../otp-dialog';

const { Title } = Typography;

// ------------------------------------------------------------
function ForgotPwd() {
  const navigate = useNavigate();
  // const otpRef = React.useRef(null);
  const setResetPwdState = useSetRecoilState(resetPwdSt);
  const setExpiredOTPState = useSetRecoilState(expiredOTPSt);

  const handleForgot = (data) => {
    setResetPwdState(data);
    setExpiredOTPState(Date.now() + EXPIRED_OTP_TIME * 1000);
    navigate(AUTH_PATHS.resetPwd);
    // if (otpRef.current) otpRef.current.toggleModal();
  };

  // const handleConfimOtp = (data) => {
  //   console.log('confirm otp');
  // };

  return (
    <>
      <Row align="middle" style={{ height: '70vh', padding: 8 }}>
        <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }}>
          <Card
            title={
              <Title level={3} style={{ textAlign: 'center', padding: 0, marginBottom: 0 }}>
                {t`Forgot your password`}?
              </Title>
            }
          >
            <ForgotPwdForm onChange={handleForgot} />
          </Card>
        </Col>
      </Row>
      {/* <OTPDialog onChange={handleConfimOtp} ref={otpRef} validTime={countDownSeconds} /> */}
    </>
  );
}

ForgotPwd.displayName = 'ForgotPwd';
export default ForgotPwd;
