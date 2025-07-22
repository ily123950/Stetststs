export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/token') {
      const proxyUrl = 'https://key-system-eme7.onrender.com/token'; // Forward to /token

      try {
        const newRequest = new Request(proxyUrl, {
          method: request.method,
          headers: {
            ...request.headers,
            // Ensure the Origin header is passed correctly
            'Origin': 'https://key-system-eme7.onrender.com',
            'User-Agent': request.headers.get('User-Agent') || 'Cloudflare-Worker',
          },
          body: request.method === 'GET' ? null : await request.text(),
          redirect: 'follow', // Follow redirects automatically
        });

        const response = await fetch(newRequest);

        // Create a new response to ensure headers are preserved
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: {
            ...response.headers,
            'Access-Control-Allow-Origin': '*', // Ensure CORS compatibility
            'Content-Type': response.headers.get('Content-Type') || 'text/html',
          },
        });
      } catch (error) {
        // Log errors for debugging
        return new Response(`Error fetching from backend: ${error.message}`, { status: 500 });
      }
    }

    return new Response('Route not found', { status: 404 });
  },
};
