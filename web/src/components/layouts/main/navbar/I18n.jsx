import React from 'react';
import { t } from 'ttag';
import { useRecoilState } from 'recoil';

// antd
import { Dropdown, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

// app
import { localeState } from '@src/recoil/locale';
import LocaleService from '@src/services/helpers/i18n';
import { LANGUAGE_DEFAULT } from '@src/configs';

// ----------------------------------------------------------------
function I18NComponent() {
  const nodeRef = React.useRef(null);
  const [locale, setLocale] = useRecoilState(localeState);

  const items = [
    {
      label: <span className={locale === 'vi' ? 'lang-active' : ''}>{t`Vietnam`}</span>,
      key: 'vi'
    },
    {
      label: <span className={locale === 'en' ? 'lang-active' : ''}>{t`English`}</span>,
      key: 'en'
    }
  ];

  const handleSelectLang = (e) => {
    const langCode = e.key || LANGUAGE_DEFAULT;
    setLocale(langCode);
    LocaleService.setLocale(langCode);
  };

  return (
    <Dropdown menu={{ items, onClick: handleSelectLang }} placement="bottomRight" trigger={['click']}>
      <Button ref={nodeRef} icon={<GlobalOutlined />} />
    </Dropdown>
  );
}

I18NComponent.displayName = 'I18NComponent';
export default I18NComponent;
