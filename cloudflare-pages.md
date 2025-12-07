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
   - `REDIRECT_URI`: `https://healthhatch-web.pages.dev/admin/callback`

### Build Process

Cloudflare Pages will automatically:
1. Install Hugo (using the version specified or latest)
2. Run `hugo` to build the site
3. Deploy the `public` directory

## GitHub OAuth Setup for Decap CMS

### Step 1: Create GitHub OAuth App

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: HealthHatch CMS (or your preferred name)
   - **Homepage URL**: `https://healthhatch-web.pages.dev`
   - **Authorization callback URL**: `https://healthhatch-web.pages.dev/admin/callback`
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**

### Step 2: Configure Cloudflare Pages

1. Go to your Cloudflare Pages project settings
2. Navigate to "Environment variables"
3. Add the following variables:
   - `OAUTH_CLIENT_ID`: Your Client ID
   - `OAUTH_CLIENT_SECRET`: Your Client Secret
   - `REDIRECT_URI`: `https://healthhatch-web.pages.dev/admin/callback`

### Step 3: Enable Git Gateway

Decap CMS uses Git Gateway to authenticate with GitHub. Cloudflare Pages supports this through the GitHub integration.

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

### CMS Not Loading

- Verify OAuth credentials are set correctly
- Check that callback URL matches your domain
- Ensure Git Gateway is properly configured

### Images Not Uploading

- Verify `static/images/uploads` directory exists
- Check file permissions
- Ensure media folder paths in `config.yml` are correct

