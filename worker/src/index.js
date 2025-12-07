/**
 * Cloudflare Worker for Decap CMS GitHub OAuth Proxy
 * Based on: https://github.com/sterlingwes/decap-proxy
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Handle OAuth authorization
    if (url.pathname === '/auth') {
      const clientId = env.GITHUB_CLIENT_ID;
      const redirectUri = url.searchParams.get('redirect_uri') || env.REDIRECT_URI;
      const scope = url.searchParams.get('scope') || 'repo';
      
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
      
      return Response.redirect(authUrl, 302);
    }

    // Handle OAuth callback
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      
      if (!code) {
        return new Response('Missing authorization code', { status: 400 });
      }

      // Exchange code for token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code: code,
        }),
      });

      const tokenData = await tokenResponse.json();
      
      if (tokenData.error) {
        return new Response(`OAuth error: ${tokenData.error_description || tokenData.error}`, { 
          status: 400,
          headers: { 'Content-Type': 'text/plain' }
        });
      }

      // Return token to Decap CMS - use SITE_URL from env or default
      const siteUrl = env.SITE_URL || 'https://healthhatch-web.pages.dev';
      const redirectUrl = `${siteUrl}/admin/?token=${tokenData.access_token}`;
      
      return Response.redirect(redirectUrl, 302);
    }

    // Handle token refresh (if needed)
    if (url.pathname === '/auth/refresh') {
      return new Response('Not implemented', { status: 501 });
    }

    return new Response('Not Found', { status: 404 });
  },
};

