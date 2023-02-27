import React from 'react';
import { useLocale } from 'ttag';
import { useRecoilState } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

// state
import { localeState } from '@recoil/atoms/locale';
import { profileSt } from '@recoil/user/profile';

// app services
import Utils from '@src/services/helpers/utils';
import LocaleService from '@src/services/helpers/i18n';
import StorageService from '@src/services/helpers/local-storage';
import { fetchUserProfile } from '@services/api/auth';

//
import Index from './routes';

import './App.css';

// ----------------------------------------------------------------
function App() {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [locale, setLocale] = useRecoilState(localeState);
  const [profile, setProfile] = useRecoilState(profileSt);

  const fetchProfile = () => {
    const token = StorageService.getToken();
    console.log({ token, profile });
    if (!token || !Utils.isBlankObj(profile)) return;
    console.log('fetch profile: ', Utils.isBlankObj(profile));
    fetchUserProfile().then(setProfile).catch(console.log);
  };

  useLocale(locale);
  React.useEffect(() => {
    LocaleService.fetchLocales().then(() => {
      setLocale(LocaleService.setLocale(locale));
      setDataLoaded(true);
      fetchProfile();
    });
  }, []);

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`localization ${locale}`}>
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </div>
  );
}

export default App;
