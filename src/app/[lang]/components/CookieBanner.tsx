'use client';
import { Translation } from 'src/types/general';
import CookieConsent from 'react-cookie-consent';

export default function CookieBanner({ t }: { t: Translation }) {
    return (
        <CookieConsent
            location="bottom"
            buttonText={t?.acceptCookies ?? 'Accept Cookies'}
            declineButtonText={t?.declineCookies ?? 'Decline Cookies'}
            cookieName="learnsphere_cookie_consent"
            expires={150}
            enableDeclineButton
            style={{ background: '#2B373B' }}
            buttonStyle={{ background: '#4CAF50', color: '#fff' }}
            declineButtonStyle={{ background: '#f44336', color: '#fff' }}
        >
            {t?.cookieConsentMessage ?? 'This site uses cookies.'}
        </CookieConsent>
    );
}
