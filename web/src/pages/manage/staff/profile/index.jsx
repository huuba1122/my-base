import React from 'react';
import { t } from 'ttag';
import { useRecoilValue } from 'recoil';

// antd
import { Divider, Button, Space } from 'antd';

// apps
import { profileSt } from '@recoil/user/profile';
import PageHeading from '@components/comon/PageHeading';
import ChangePwdDialog from '@pages/auth/change-pwd';
import ProfileSummary from './summary';
import ProfileFormDialog from './dialog';

//----------------------------------------------------------------
export default function Profile() {
  const changePwdRef = React.useRef(null);
  const editRef = React.useRef(null);
  const profile = useRecoilValue(profileSt);

  const toggleChangePwdDialog = () => {
    changePwdRef.current.toggleModal();
  };

  const toggleEditProfileDialog = () => {
    editRef.current.toggleModal();
  };

  return (
    <>
      <PageHeading>{t`Profile`}</PageHeading>
      <div className="profile-content">
        <ProfileSummary data={profile} />
        <Divider />

        <Space size={16}>
          <Button onClick={toggleEditProfileDialog} type="primary" ghost>{t`Update Profile`}</Button>
          <Button onClick={toggleChangePwdDialog} type="primary" ghost>{t`Change password`}</Button>
        </Space>

        <ChangePwdDialog onChange={() => false} ref={changePwdRef} />
        <ProfileFormDialog onChange={() => false} ref={editRef} />
      </div>
    </>
  );
}
