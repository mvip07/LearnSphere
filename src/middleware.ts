import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['uz', 'en', 'ru'];
const DEFAULT_LOCALE = 'uz';

export function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    // API, static fayllar va _next yo'llarini o'tkazib yuborish
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.includes('.') // static fayllar
    ) {
        return NextResponse.next();
    }

    // Cookie'dan tilni o'qish
    let localeFromCookie = request.cookies.get('lang')?.value;
    if (localeFromCookie && !SUPPORTED_LOCALES.includes(localeFromCookie)) {
        localeFromCookie = DEFAULT_LOCALE;
    }

    const pathnameLocale = pathname.split('/')[1];
    const locale = SUPPORTED_LOCALES.includes(pathnameLocale) ? pathnameLocale : localeFromCookie || DEFAULT_LOCALE;

    // Agar URLda til yo'q bo'lsa yoki noto'g'ri til bo'lsa, default tilga redirect
    if (!SUPPORTED_LOCALES.includes(pathnameLocale)) {
        const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}${search}`, request.url);
        return NextResponse.redirect(newUrl);
    }

    // Cookie'ga tilni saqlash
    const response = NextResponse.next();
    response.cookies.set('lang', locale, { path: '/', maxAge: 60 * 60 * 24 * 30 }); // 30 kunlik cookie
    return response;
}

export const config = {
    matcher: ['/((?!_next|api|.*\\..*).*)'],
};