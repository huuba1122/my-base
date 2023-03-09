import { atom } from 'recoil';

export const resetPwdSt = atom({
  key: 'resetPwdSt',
  default: {
    username: '',
    verify_id: '',
    otp_code: ''
  }
});

export const expiredOTPSt = atom({
  key: 'expiredOTPSt',
  default: 0
});
