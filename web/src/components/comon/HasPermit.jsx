import React from 'react';
import { useRecoilValue } from 'recoil';

import { permissionsSlt } from '@recoil/user/profile';
import PemUtils from '@services/helpers/pem-utils';

export default function HasPermit({ pemGroup, action, children }) {
  const pems = useRecoilValue(permissionsSlt);
  if (PemUtils.hasPem(pems, pemGroup, action)) return children;
  return null;
}
