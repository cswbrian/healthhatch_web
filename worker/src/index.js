/**
 * Cloudflare Worker for Decap CMS GitHub OAuth Proxy
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

    // 1. Redirect to GitHub for Authorization
    if (url.pathname === '/auth') {
      const clientId = env.GITHUB_CLIENT_ID;
      const redirectUri = env.REDIRECT_URI || `${url.origin}/callback`;
      // Default to 'repo,user' as per reference, but prefer query param
      const scope = url.searchParams.get('scope') || 'repo,user';
      const state = crypto.randomUUID();
      
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;
      
      return Response.redirect(authUrl, 302);
    }

    // 2. Handle Callback from GitHub
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      
      if (!code) {
        return new Response('Missing authorization code', { status: 400 });
      }

      // Exchange code for access token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Cloudflare-Worker-Decap-CMS'
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code: code,
        }),
      });

      const tokenData = await tokenResponse.json();
      
      if (tokenData.error) {
        return new Response(JSON.stringify(tokenData), { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Return HTML with script to communicate with opener
      // This replaces the redirection to oauth-callback.html
      const content = `
    <script>
      (function() {
        function receiveMessage(e) {
          console.log("receiveMessage %o", e);
          
          // Send the token to the CMS window
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({ token: tokenData.access_token, provider: "github" })}', 
            e.origin
          );
        }
        window.addEventListener("message", receiveMessage, false);
        // Start handshake
        window.opener.postMessage("authorizing:github", "*");
      })()
    </script>`;
      
      return new Response(content, {
        headers: { "content-type": "text/html;charset=UTF-8" }
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};
