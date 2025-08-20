import { MetadataRoute } from "next";
import { host } from "@assets/api/urls";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${host}/sitemap.xml`,
    };
}
