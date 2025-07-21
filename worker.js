export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/token') {
      const proxyUrl = 'https://key-system-eme7.onrender.com/token';

      const newRequest = new Request(proxyUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method === 'GET' ? null : await request.text(),
        redirect: 'follow'
      });

      return fetch(newRequest);
    }

    return new Response('Route not found', { status: 404 });
  }
}
