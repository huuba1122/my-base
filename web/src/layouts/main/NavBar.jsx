import React from 'react';
import { useRecoilState } from 'recoil';
import { localeState } from '@recoil/atoms/locale';

// -------------------------------
function Navbar() {
  const [locale, setLocale] = useRecoilState(localeState);
  console.log({ locale });

  return (
    <div className="navbar">
      <div className="right">LOGO</div>
      <div>
        <button className={`btn-locale mr-2 ${locale === 'vi' ? 'active' : ''}`} onClick={() => setLocale('vi')}>
          vi
        </button>
        <button className={`btn-locale ${locale === 'en' ? 'active' : ''}`} onClick={() => setLocale('en')}>
          en
        </button>
      </div>
    </div>
  );
}

Navbar.displayName = 'Navbar';

export default Navbar;
