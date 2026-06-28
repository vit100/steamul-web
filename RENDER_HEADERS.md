# Render Header Settings

The live site is served through Render behind Cloudflare (`rndr-id` is present in the response headers). Render does not use a Netlify/Cloudflare Pages `_headers` file, so configure these in the Render Dashboard for the Static Site.

Recommended headers:

| Path | Header | Value |
| --- | --- | --- |
| `/*` | `X-Robots-Tag` | `index, follow` |
| `/*` | `X-Content-Type-Options` | `nosniff` |
| `/*` | `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `/` | `Link` | `<https://steamulsauna.ca/>; rel="canonical"` |
| `/index.html` | `Link` | `<https://steamulsauna.ca/>; rel="canonical"` |
| `/booking/` | `Link` | `<https://steamulsauna.ca/booking/>; rel="canonical"` |
| `/booking/index.html` | `Link` | `<https://steamulsauna.ca/booking/>; rel="canonical"` |
| `/menu/` | `Link` | `<https://steamulsauna.ca/menu/>; rel="canonical"` |
| `/menu/index.html` | `Link` | `<https://steamulsauna.ca/menu/>; rel="canonical"` |

The `robots.txt`, `sitemap.xml`, and HTML canonical tags are still handled directly by the source files.
