/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL,
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ['/404', '/403'], 
    changefreq: 'daily',
    priority: 0.7,
};
