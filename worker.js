export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Меняем URL запроса с Cloudflare на твой Render-сервер
    url.hostname = "key-system-eme7.onrender.com";

    const modifiedRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "follow"
    });

    return fetch(modifiedRequest);
  }
}
