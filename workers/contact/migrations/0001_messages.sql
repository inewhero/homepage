CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  locale TEXT NOT NULL CHECK(locale IN ('zh', 'en')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  status TEXT NOT NULL DEFAULT 'unread' CHECK(status IN ('unread', 'read', 'archived'))
);
CREATE INDEX messages_created_at ON messages(created_at);
