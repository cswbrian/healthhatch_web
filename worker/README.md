# Decap CMS OAuth Proxy for Cloudflare Workers

This Cloudflare Worker handles GitHub OAuth authentication for Decap CMS when hosted on Cloudflare Pages.

## Setup Instructions

### 1. Install Wrangler CLI

```bash
npm install -g wrangler
# Or use npx: npx wrangler deploy
```

### 2. Login to Cloudflare

```bash
wrangler login
```

### 3. Set Environment Secrets

You need to set these secrets in your Cloudflare Worker:

```bash
# Get these from your GitHub OAuth App
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
wrangler secret put REDIRECT_URI  # e.g., https://auth.healthhatch-web.pages.dev/callback
wrangler secret put SITE_URL      # e.g., https://healthhatch-web.pages.dev
```

### 4. Update GitHub OAuth App

In your GitHub OAuth App settings, update the **Authorization callback URL** to:
```
https://auth.healthhatch-web.pages.dev/callback
```
(Replace with your actual worker URL)

### 5. Deploy the Worker

```bash
cd worker
npm install
wrangler deploy
```

After deployment, note the worker URL (e.g., `https://decap-oauth-proxy.your-subdomain.workers.dev`)

### 6. Set Up Custom Domain (Optional but Recommended)

1. Go to Cloudflare Dashboard → Workers & Pages → Your Worker
2. Click "Triggers" → "Custom Domains"
3. Add a custom domain like `auth.healthhatch-web.pages.dev`
4. Update your GitHub OAuth App callback URL to match

### 7. Update Decap CMS Config

Update `static/admin/config.yml` to use the worker URL:

```yaml
backend:
  name: github
  repo: cswbrian/healthhatch-web
  branch: main
  base_url: https://auth.healthhatch-web.pages.dev  # Your worker URL
  auth_endpoint: /auth
```

## Testing

1. Visit `https://healthhatch-web.pages.dev/admin/`
2. Click "Login with GitHub"
3. You should be redirected to GitHub for authorization
4. After authorizing, you'll be redirected back to the CMS

