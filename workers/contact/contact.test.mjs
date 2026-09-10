import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import worker from './index.js';

test('private contact endpoint validates before storing and handles failures', async () => {
  const db = new DatabaseSync(':memory:');
  db.exec(readFileSync(new URL('./migrations/0001_messages.sql', import.meta.url), 'utf8'));
  let limited = false;
  const env = { ALLOWED_ORIGIN: 'https://inewhero.github.io', TURNSTILE_SECRET: 'test-only',
    CONTACT_LIMITER: { limit: async () => ({ success: !limited }) },
    DB: { prepare: sql => ({ bind: (...args) => ({ run: async () => db.prepare(sql).run(...args) }) }) } };
  const payload = { name: '测试', email: 'test@example.com', message: "Hello '); DROP TABLE messages; --", locale: 'zh', token: 'test-token', website: '' };
  const request = (data = payload, origin = env.ALLOWED_ORIGIN) => new Request('https://contact.example/messages', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.1' }, body: JSON.stringify(data) });
  const originalFetch = globalThis.fetch;
  let verification = { success: true, hostname: 'inewhero.github.io', action: 'contact' };
  let verifyCalls = 0;
  globalThis.fetch = async () => { verifyCalls++; return Response.json(verification); };
  try {
    assert.equal((await worker.fetch(request(payload, 'https://evil.example'), env)).status, 403);
    assert.equal((await worker.fetch(request({ ...payload, message: '' }), env)).status, 400);
    assert.equal((await worker.fetch(request({ ...payload, message: 'a'.repeat(21000) }), env)).status, 413);
    assert.equal((await worker.fetch(request({ ...payload, website: 'spam' }), env)).status, 400);
    limited = true;
    assert.equal((await worker.fetch(request(), env)).status, 429);
    limited = false;
    assert.equal(verifyCalls, 0);
    for (const invalid of [{ success: false }, { success: true, hostname: 'evil.example', action: 'contact' }, { success: true, hostname: 'inewhero.github.io', action: 'login' }]) {
      verification = invalid;
      assert.equal((await worker.fetch(request(), env)).status, 403);
    }
    assert.equal(db.prepare('SELECT count(*) AS n FROM messages').get().n, 0);
    verification = { success: true, hostname: 'inewhero.github.io', action: 'contact' };
    const response = await worker.fetch(request(), env);
    assert.equal(response.status, 201);
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), env.ALLOWED_ORIGIN);
    assert.equal(db.prepare('SELECT message FROM messages').get().message, payload.message);
    assert.equal((await worker.fetch(new Request('https://contact.example/messages', { headers: { Origin: env.ALLOWED_ORIGIN } }), env)).status, 405);
    globalThis.fetch = async () => { throw new Error('network'); };
    assert.equal((await worker.fetch(request(), env)).status, 503);
    assert.equal(db.prepare('SELECT count(*) AS n FROM messages').get().n, 1);
  } finally { globalThis.fetch = originalFetch; db.close(); }
});
