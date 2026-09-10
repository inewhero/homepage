const MAX_BYTES = 20000;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowed = origin === env.ALLOWED_ORIGIN;
    const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Vary': 'Origin' };
    if (allowed) headers['Access-Control-Allow-Origin'] = origin;
    const reply = (status, code) => new Response(JSON.stringify({ ok: status === 201, code }), { status, headers });
    if (new URL(request.url).pathname !== '/messages') return reply(404, 'not_found');
    if (!allowed) return reply(403, 'origin');
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...headers, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' } });
    if (request.method !== 'POST') return reply(405, 'method');
    if (request.headers.get('Content-Type')?.split(';')[0] !== 'application/json') return reply(415, 'content_type');
    try {
      const ip = request.headers.get('CF-Connecting-IP');
      if (!ip) return reply(403, 'client');
      if (!(await env.CONTACT_LIMITER.limit({ key: ip })).success) return reply(429, 'rate_limit');
      if (Number(request.headers.get('Content-Length')) > MAX_BYTES) return reply(413, 'too_large');
      const reader = request.body?.getReader();
      if (!reader) return reply(400, 'invalid');
      const chunks = [];
      let size = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_BYTES) { await reader.cancel(); return reply(413, 'too_large'); }
        chunks.push(value);
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
      let data;
      try { data = JSON.parse(new TextDecoder().decode(bytes)); } catch { return reply(400, 'invalid'); }
      if (!data || typeof data !== 'object' || Array.isArray(data)) return reply(400, 'invalid');
      if (data.website) return reply(400, 'invalid');
      const { name, email, message, locale, token } = data;
      if (![name, email, message, token].every(v => typeof v === 'string') || !['zh', 'en'].includes(locale)) return reply(400, 'invalid');
      if (name.length > 100 || email.length > 254 || !message.trim() || message.length > 3000 || !token || token.length > 2048 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return reply(400, 'invalid');
      const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip }),
        signal: AbortSignal.timeout(10000),
      });
      if (!verification.ok) return reply(503, 'unavailable');
      const result = await verification.json();
      if (!result.success || result.hostname !== new URL(env.ALLOWED_ORIGIN).hostname || result.action !== 'contact') return reply(403, 'verification');
      await env.DB.prepare('INSERT INTO messages (id, name, email, message, locale) VALUES (?, ?, ?, ?, ?)')
        .bind(crypto.randomUUID(), name.trim(), email.trim(), message.trim(), locale).run();
      return reply(201, 'received');
    } catch {
      return reply(503, 'unavailable');
    }
  },
};
