# Cloudflare R2 Asset Runbook

This site is ready to serve images from Cloudflare R2 without changing page code.

## Target Setup

- Bucket: `nameerbag-assets`
- Object key layout: `assets/images/...`
- Recommended public domain: `https://images.nameerbag.com`
- Asset base URL: `https://images.nameerbag.com`
- Optional Vercel environment variable: `NEXT_PUBLIC_ASSET_BASE_URL=https://images.nameerbag.com`

## Upload

1. Install and log in to Cloudflare Wrangler.
2. Create the R2 bucket and connect the public custom domain.
3. From the project root, upload assets:

```powershell
npm run r2:upload -- -Bucket nameerbag-assets
```

Dry run:

```powershell
npm run r2:upload -- -Bucket nameerbag-assets -DryRun
```

## Enable On Vercel

The code defaults to R2 for this project. If you want to control it from Vercel instead, set this environment variable and redeploy:

```text
NEXT_PUBLIC_ASSET_BASE_URL=https://images.nameerbag.com
```

If the variable is set to an empty value, the site can be adjusted to serve local `/assets/...` files from Vercel again.
