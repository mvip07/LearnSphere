import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['uz', 'en', 'ru'];
const DEFAULT_LOCALE = 'uz';

export function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.includes('.') 
    ) {
        return NextResponse.next();
    }

    let localeFromCookie = request.cookies.get('lang')?.value;
    if (localeFromCookie && !SUPPORTED_LOCALES.includes(localeFromCookie)) {
        localeFromCookie = DEFAULT_LOCALE;
    }

    const pathnameLocale = pathname.split('/')[1];
    const locale = SUPPORTED_LOCALES.includes(pathnameLocale) ? pathnameLocale : localeFromCookie || DEFAULT_LOCALE;

    if (!SUPPORTED_LOCALES.includes(pathnameLocale)) {
        const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}${search}`, request.url);
        return NextResponse.redirect(newUrl);
    }

    const response = NextResponse.next();
    response.cookies.set('lang', locale, { path: '/', maxAge: 60 * 60 * 24 * 30 }); // 30 kunlik cookie
    return response;
}

export const config = {
    matcher: ['/((?!_next|api|.*\\..*).*)'],
};