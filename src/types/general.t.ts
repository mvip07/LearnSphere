export type Language = "en" | "ru" | "uz";

export interface ValidationErrors {
    [key: string]: string[];
}

export type Translation = {
    siteTitle: string;
    siteDescription: string;
    siteKeywords: string;
    openGraphDescription: string;
    openGraphImageAlt: string;
    twitterDescription: string;
    siteName: string;
    acceptCookies: string;
    declineCookies: string;
    cookieConsentMessage: string;
    quizSchemaTitle: string;
    quizSchemaDescription: string;
};