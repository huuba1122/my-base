import { atom } from 'recoil';

export const resetPwdSt = atom({
  key: 'resetPwdSt',
  default: {
    username: '',
    verifyId: '',
    otpCode: ''
  }
});
