import React from 'react';
import { t } from 'ttag';
import { useRecoilValue } from 'recoil';

// antd
import { Divider, Button, Space } from 'antd';

// apps
import { profileSt } from '@recoil/user/profile';
import PageHeading from '@src/components/comon/PageHeading';
import ChangePwdDialog from '@pages/auth/change-pwd';
import ProfileSummary from './summary';

export default function Profile() {
  const changePwdRef = React.useRef(null);
  const editProRef = React.useRef(null);
  const dataProfile = useRecoilValue(profileSt);

  const toggleChangePwdDialog = () => {
    changePwdRef.current.toggleModal();
  };

  const toggleEditProfileDialog = () => {
    console.log('toggle profile dialog');
  };

  return (
    <>
      <PageHeading>{t`Profile`}</PageHeading>
      <div className="profile-content">
        <ProfileSummary data={dataProfile} />
        <Divider />

        <Space size={16}>
          <Button onClick={toggleEditProfileDialog}>{t`Update Profile`}</Button>
          <Button onClick={toggleChangePwdDialog}>{t`Change password`}</Button>
        </Space>

        <ChangePwdDialog onChange={() => false} ref={changePwdRef} />
      </div>
    </>
  );
}
