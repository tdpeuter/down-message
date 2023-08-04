# down-message

[![Netlify Status](https://api.netlify.com/api/v1/badges/7821f152-5b28-4dec-9d98-035a18e8a57a/deploy-status)](https://app.netlify.com/sites/tdpeuter-down/deploys)

Ultra simple website to tell people a service is down

## Starting the website

```shell
npm run start
```

## Setup networking

### Using [Cloudflare](https://dash.cloudflare.com)

If you want to use Cloudflare to handle redirection to the website, you can use [Page Rules](https://developers.cloudflare.com/support/page-rules/).

First, make sure the DNS records for the (sub-) domains you want to redirect are [being proxied through Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/reference/proxied-dns-records). Then, head over to [Redirect Rules](https://developers.cloudflare.com/rules/url-forwarding/) (Page Rules are harder to configure, and it seems like [Cloudflare itself is more keen of Redirect Rules too](https://developers.cloudflare.com/support/page-rules/recommended-page-rules-to-consider/)).

Create a Single Redirect rule that looks similar to:

```
# When incoming requests match...
(http.host in {"example.com" "another.example.com"})

# Then URL redirect
Dynamic
concat("https://your.host.tdl/?destination=", http.request.full_uri)
302
```

Enable the rule and everything should be set!