import React from 'react';
import { useLocale } from 'ttag';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

// state
import { localeState } from '@src/recoil/locale';
import { profileSt } from '@recoil/user/profile';
import { configSt } from '@recoil/config';

// app services
import Utils from '@src/services/helpers/utils';
import LocaleService from '@src/services/helpers/i18n';
import StorageService from '@src/services/helpers/local-storage';
import { getProfile } from '@services/api/auth';
import { fetchConfiguaration } from '@services/api/config';

//
import Loading from '@components/Loading';
import Index from './routes';

import './App.css';

// ----------------------------------------------------------------
function App() {
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [locale, setLocale] = useRecoilState(localeState);
  const [profile, setProfile] = useRecoilState(profileSt);
  const setConfig = useSetRecoilState(configSt);

  const fetchProfile = () => {
    const token = StorageService.getToken();
    if (!token || !Utils.isBlankObj(profile)) return;
    getProfile().then(setProfile).catch(console.log);
  };

  const getAppConfig = () => {
    fetchConfiguaration().then(setConfig).catch(console.log);
  };

  useLocale(locale);
  React.useEffect(() => {
    LocaleService.fetchLocales().then(() => {
      setLocale(LocaleService.setLocale(locale));
      setDataLoaded(true);
      fetchProfile();
      getAppConfig();
    });
  }, []);

  if (!dataLoaded) {
    return <Loading />;
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
