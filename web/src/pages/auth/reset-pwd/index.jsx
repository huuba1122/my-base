import React from 'react';
import { t } from 'ttag';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
// antd
import { Row, Col, Card, Typography } from 'antd';

// app
import { resetPwdSt, expiredOTPSt } from '@src/recoil/auth/reset-pwd';
import useCountDown from '@shared/common/useCountDown';

import Utils from '@services/helpers/utils';
import { AUTH_PATHS } from '@src/routes/path';

import ResetPwdForm from './form';

const { Title } = Typography;

const warningStyles = {
  color: '#faad14'
};

const expiredStyles = {
  color: '#f5222d'
};

// ----------------------------------------------------------------

CountDownBox.propTypes = {
  countDown: PropTypes.number
};

function CountDownBox({ countDown }) {
  if (countDown > 0) return <p style={warningStyles}>{t`The otp code will expire after ${countDown}`}</p>;
  return <p style={expiredStyles}>{t`The otp code has expired!`}</p>;
}

// ------------------------------------------------------------
function ResetPwd() {
  const navigate = useNavigate();
  const [resetPwdState, setPwdState] = useRecoilState(resetPwdSt);
  const { username = '', verify_id: verifyId } = resetPwdState ?? {};

  const expiredOTPState = useRecoilValue(expiredOTPSt);
  console.log(Math.ceil(expiredOTPState - Date.now()));
  const distanceSeconds = Math.ceil((expiredOTPState - Date.now()) / 1000);

  const { value: countDownTime, onRestart, isStarted } = useCountDown(distanceSeconds);
  const countDownSeconds = Math.floor(countDownTime.distanceToNow / 1000);

  const handleResetPwd = (data) => {
    setPwdState({});
    navigate(AUTH_PATHS.login);
  };

  // if (!verifyId) return <Navigate to={AUTH_PATHS.forgotPwd} />;

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
          {username ? <p>{t`The OTP code has been sent to ${Utils.maskEmail(username)}`}</p> : null}
          {isStarted && verifyId ? <CountDownBox countDown={countDownSeconds} /> : null}
          <ResetPwdForm onChange={handleResetPwd} isOTPExpired={countDownSeconds < 1} />
        </Card>
      </Col>
    </Row>
  );
}

ResetPwd.displayName = 'ResetPwd';
export default ResetPwd;
