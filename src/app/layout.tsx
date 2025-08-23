import '../styles/globals.css';
import Script from 'next/script';
import { cookies } from 'next/headers';
import { Montserrat } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import CookieBanner from '@components/CookieBanner';
import { LoaderProvider } from '@context/LoaderContext';
import { ThemeProvider } from '@components/ThemeProvider';

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    weight: ["400", "500", "600", "700"],
});

export const viewport = {
    themeColor: '#ffffff',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

const siteUrl = 'https://learnsphere-online.vercel.app';

const translations = {
    uz: {
        siteTitle: 'LearnSphere - Bilimingizni sinang',
        siteDescription: 'LearnSphere — turli sohalarda testlar orqali bilimlaringizni sinovdan o‘tkazing.',
        siteKeywords: 'LearnSphere, test, bilim, online platforma, interaktiv testlar, bilim sinovi, reyting tizimi, viktorinalar, o‘quv platformasi',
        openGraphDescription: 'Bilimlaringizni sinang va rivojlantiring',
        openGraphImageAlt: 'LearnSphere rasm',
        twitterDescription: 'LearnSphere — interaktiv test platformasi',
        siteName: 'LearnSphere',
        acceptCookies: 'Kukilarni qabul qilish',
        declineCookies: 'Kukilarni rad etish',
        cookieConsentMessage: 'Ushbu sayt sizga eng yaxshi tajriba taqdim etish uchun kukilardan foydalanadi. Qabul qilasizmi yoki rad etasizmi?',
        quizSchemaTitle: 'LearnSphere Testlari',
        quizSchemaDescription: 'Turli sohalardagi interaktiv testlar va viktorinalar.',
    },
    ru: {
        siteTitle: 'LearnSphere - Проверьте свои знания',
        siteDescription: 'LearnSphere — тестируйте свои знания в разных областях с помощью викторин.',
        siteKeywords: 'LearnSphere, викторины, тесты, знания, онлайн платформа, интерактивные тесты, рейтинговая система, обучающая платформа',
        openGraphDescription: 'Проверьте и улучшите свои знания',
        openGraphImageAlt: 'Изображение LearnSphere',
        twitterDescription: 'LearnSphere — интерактивная тестовая платформа',
        siteName: 'LearnSphere',
        acceptCookies: 'Принять куки',
        declineCookies: 'Отклонить куки',
        cookieConsentMessage: 'Этот сайт использует куки для предоставления наилучшего опыта. Принять или отклонить?',
        quizSchemaTitle: 'Тесты LearnSphere',
        quizSchemaDescription: 'Интерактивные тесты и викторины в различных областях.',
    },
    en: {
        siteTitle: 'LearnSphere - Challenge Your Skills',
        siteDescription: 'LearnSphere is an interactive platform to test your skills with quizzes and challenges.',
        siteKeywords: 'LearnSphere, quizzes, challenges, knowledge, online platform, interactive quizzes, ranking system, learning platform',
        openGraphDescription: 'Test and improve your knowledge',
        openGraphImageAlt: 'LearnSphere image',
        twitterDescription: 'LearnSphere — interactive quiz platform',
        siteName: 'LearnSphere',
        acceptCookies: 'Accept Cookies',
        declineCookies: 'Decline Cookies',
        cookieConsentMessage: 'This site uses cookies to provide you with the best experience. Accept or decline?',
        quizSchemaTitle: 'LearnSphere Quizzes',
        quizSchemaDescription: 'Interactive quizzes and challenges across various topics.',
    },
};

export async function generateMetadata() {
    const cookieStore = await cookies();
    const lang = (cookieStore?.get('lang')?.value || 'uz') as keyof typeof translations;
    const t = translations[lang] || translations['uz'];

    return {
        title: t.siteTitle,
        description: t.siteDescription,
        keywords: t.siteKeywords,
        authors: [{ name: 'Mirabzal Ozodov', url: 'https://ozodov-mirabzal.vercel.app' }],
        creator: 'Mirabzal Ozodov',
        publisher: 'LearnSphere',
        icons: {
            icon: [{ url: '/images/logo.png', type: 'image/png' }],
            shortcut: '/images/logo.png',
            apple: '/images/logo.png',
        },
        metadataBase: new URL(siteUrl),
        alternates: {
            canonical: siteUrl,
            languages: {
                'uz-UZ': `${siteUrl}/uz`,
                'ru-RU': `${siteUrl}/ru`,
                'en-US': `${siteUrl}/en`,
            },
        },
        openGraph: {
            title: t.siteTitle,
            description: t.openGraphDescription,
            url: siteUrl,
            siteName: t.siteName,
            images: [
                {
                    url: `${siteUrl}/images/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: t.openGraphImageAlt,
                    type: 'image/png',
                },
            ],
            locale: lang === 'uz' ? 'uz_UZ' : lang === 'ru' ? 'ru_RU' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t.siteTitle,
            description: t.twitterDescription,
            creator: '@mvip_07',
            images: [`${siteUrl}/images/og-image.png`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
            },
        },
    };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const lang = (cookieStore?.get('lang')?.value || 'uz') as keyof typeof translations;
    const t = translations[lang] || translations['uz'];

    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: t.siteName,
        url: siteUrl,
        description: t.siteDescription,
        publisher: {
            '@type': 'Organization',
            name: t.siteName,
            url: siteUrl,
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/images/logo.png`,
            },
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };

    const quizSchema = {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: t.quizSchemaTitle,
        description: t.quizSchemaDescription,
        url: `${siteUrl}/${lang}/cabinet/ranking`,
        inLanguage: lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US',
    };

    const authorData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Mirabzal Ozodov',
        url: 'https://ozodov-mirabzal.vercel.app',
        sameAs: [
            'https://www.linkedin.com/in/mvip07',
            'https://github.com/mvip07',
            'https://ozodov-mirabzal.vercel.app',
        ],
        jobTitle: 'Full Stack Developer',
        worksFor: {
            '@type': 'Organization',
            name: t.siteName,
            url: siteUrl,
        },
    };

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: t.siteName,
        url: siteUrl,
        logo: `${siteUrl}/images/logo.png`,
        sameAs: [
            'https://www.facebook.com/learnsphere',
            'https://twitter.com/learnsphere',
            'https://www.instagram.com/learnsphere',
            'https://www.linkedin.com/company/learnsphere',
        ],
    };

    return (
        <html lang={lang || 'en'} data-theme="light">
            <head>
                <meta name="robots" content="index, follow" />
                <meta charSet="utf-8" />
                <link rel="alternate" hrefLang="uz-UZ" href={`${siteUrl}/uz`} />
                <link rel="alternate" hrefLang="ru-RU" href={`${siteUrl}/ru`} />
                <link rel="alternate" hrefLang="en-US" href={`${siteUrl}/en`} />
                <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en`} />
                <link rel="sitemap" type="application/xml" href={`${siteUrl}/sitemap.xml`} />
                <link rel="preload" href={`${siteUrl}/images/logo.png`} as="image" />
                <link rel="preload" href={montserrat.style.fontFamily} as="font" type="font/woff2" crossOrigin="anonymous" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            </head>
            <body className={`bg-[var(--body)] dark:bg-[var(--bodyDark)] ${montserrat.variable}`}>
                <ThemeProvider>
                    <LoaderProvider>
                        <CookieBanner t={t} />
                        {children}
                    </LoaderProvider>
                    <ToastContainer />
                </ThemeProvider>
                <Script
                    id="schema-website"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
                />
                <Script
                    id="schema-quiz"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
                />
                <Script
                    id="schema-author"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(authorData) }}
                />
                <Script
                    id="schema-organization"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
            </body>
        </html>
    );
}