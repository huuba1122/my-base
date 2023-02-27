import { atom } from 'recoil';

export const resetPwdAtoms = atom({
  key: 'resetPwdAtoms',
  default: {
    username: '',
    verifyId: '',
    otpCode: ''
  }
});
