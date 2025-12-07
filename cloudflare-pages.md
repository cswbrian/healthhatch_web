# Cloudflare Pages Deployment Guide

## Build Configuration

When setting up your Cloudflare Pages project, use the following settings:

### Build Settings

- **Framework preset**: Hugo
- **Build command**: `hugo`
- **Build output directory**: `public`
- **Root directory**: `/` (leave empty or set to root)

### Environment Variables

Add these environment variables in Cloudflare Pages settings:

1. **HUGO_VERSION** (optional but recommended)
   - Value: `0.152.2` (or the version you're using)
   - This ensures consistent builds

2. **For Decap CMS Authentication** (after setting up GitHub OAuth):
   - `OAUTH_CLIENT_ID`: Your GitHub OAuth App Client ID
   - `OAUTH_CLIENT_SECRET`: Your GitHub OAuth App Client Secret
   - `REDIRECT_URI`: `https://auth.healthhatch.co/callback`

### Build Process

Cloudflare Pages will automatically:
1. Install Hugo (using the version specified or latest)
2. Run `hugo` to build the site
3. Deploy the `public` directory

## GitHub OAuth Setup for Decap CMS

**Important**: Decap CMS requires a server-side OAuth proxy when hosted on Cloudflare Pages. We've created a Cloudflare Worker to handle this.

### Step 1: Create GitHub OAuth App

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: HealthHatch CMS (or your preferred name)
   - **Homepage URL**: `https://healthhatch.co`
   - **Authorization callback URL**: `https://auth.healthhatch.co/callback`
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**

### Step 2: Deploy the OAuth Proxy Worker

1. Install Wrangler CLI (if not already installed):
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Navigate to the worker directory:
   ```bash
   cd worker
   npm install
   ```

4. Set the required secrets:
   ```bash
   wrangler secret put GITHUB_CLIENT_ID
   # Enter your Client ID when prompted
   
   wrangler secret put GITHUB_CLIENT_SECRET
   # Enter your Client Secret when prompted
   
   wrangler secret put REDIRECT_URI
   # Enter: https://auth.healthhatch.co/callback
   
   wrangler secret put SITE_URL
   # Enter: https://healthhatch.co
   ```

5. Deploy the worker:
   ```bash
   wrangler deploy
   ```

6. Note the worker URL: `https://auth.healthhatch.co` (after custom domain setup)

### Step 3: Set Up Custom Domain for Worker (Recommended)

1. Go to Cloudflare Dashboard → Workers & Pages → Your Worker
2. Click "Triggers" → "Custom Domains"
3. Add a custom domain: `auth.healthhatch.co`
4. Update your GitHub OAuth App callback URL to match this domain

### Step 4: Update Decap CMS Configuration

Update `static/admin/config.yml` to use your worker URL:

```yaml
backend:
  name: github
  repo: cswbrian/healthhatch-web
  branch: main
  base_url: https://auth.healthhatch.co
  auth_endpoint: /auth
  auth_scope: repo
```

After updating, commit and push the changes to trigger a new build.

## Custom Domain Setup

1. In Cloudflare Pages, go to your project
2. Click "Custom domains"
3. Add your domain
4. Update the OAuth callback URL in GitHub OAuth App settings to match your custom domain

## Troubleshooting

### Build Failures

- Check that Hugo version is compatible
- Verify all required directories exist
- Check for syntax errors in `hugo.toml`

### CMS Not Loading / Authentication Issues

- Verify OAuth credentials are set correctly in the Worker secrets
- Check that callback URL in GitHub OAuth App matches your worker URL
- Ensure the worker is deployed and accessible
- Verify `base_url` in `config.yml` matches your worker URL
- Check browser console for errors
- Ensure the worker has the correct secrets set via `wrangler secret put`

### Images Not Uploading

- Verify `static/images/uploads` directory exists
- Check file permissions
- Ensure media folder paths in `config.yml` are correct

