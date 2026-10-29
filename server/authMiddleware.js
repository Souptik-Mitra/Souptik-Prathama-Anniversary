import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const sessions = new Map();
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

function parseCookies(cookieHeader) {
  const list = {};
  if (!cookieHeader) return list;
  for (const cookie of cookieHeader.split(';')) {
    const parts = cookie.split('=');
    const name = parts[0]?.trim();
    if (name) list[name] = decodeURIComponent(parts.slice(1).join('=').trim());
  }
  return list;
}

function getValidSession(req) {
  const token = parseCookies(req.headers.cookie).scrapbook_session;
  const session = token && sessions.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }
  return session;
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

export function createAuthMiddleware(env = process.env) {
  const validUsername = env.SCRAPBOOK_USERNAME || 'SouPra1';
  const validPassword = env.SCRAPBOOK_PASSWORD || '311525';

  return (req, res, next) => {
    const url = req.url || '';
    if (url === '/api/login' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', () => {
        try {
          const { username, password } = JSON.parse(body || '{}');
          if (!username || !password) return sendJson(res, 400, { success: false, message: 'Please provide both username and password.' });
          const trimmedUser = String(username).trim();
          const trimmedPass = String(password).trim();
          if (trimmedUser !== validUsername || trimmedPass !== validPassword) {
            return sendJson(res, 401, { success: false, message: 'Invalid username or password. Please try again.' });
          }
          const token = crypto.randomBytes(32).toString('hex');
          const now = Date.now();
          sessions.set(token, { username: trimmedUser, createdAt: now, expiresAt: now + SESSION_DURATION_MS });
          res.setHeader('Set-Cookie', [`scrapbook_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(SESSION_DURATION_MS / 1000)}`]);
          return sendJson(res, 200, { success: true, user: { username: trimmedUser }, message: 'Login successful.' });
        } catch {
          return sendJson(res, 400, { success: false, message: 'Malformed request payload.' });
        }
      });
      return;
    }
    if (url === '/api/auth/me' && req.method === 'GET') {
      const session = getValidSession(req);
      return session
        ? sendJson(res, 200, { authenticated: true, user: { username: session.username } })
        : sendJson(res, 401, { authenticated: false, message: 'Not authenticated.' });
    }
    if (url === '/api/logout' && req.method === 'POST') {
      const token = parseCookies(req.headers.cookie).scrapbook_session;
      if (token) sessions.delete(token);
      res.setHeader('Set-Cookie', ['scrapbook_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT']);
      return sendJson(res, 200, { success: true, message: 'Logged out successfully.' });
    }
    if (url.startsWith('/api/download/') && req.method === 'GET') {
      if (!getValidSession(req)) return sendJson(res, 401, { error: 'Unauthorized. Please login to download photos.' });
      const rawUrl = new URL(url, 'http://localhost');
      const safeFilename = path.basename(decodeURIComponent(rawUrl.pathname.replace('/api/download/', '')));
      const requestedName = path.basename(rawUrl.searchParams.get('filename') || safeFilename);
      const safeDownloadName = /\.jpe?g$/i.test(requestedName) ? requestedName : `${requestedName}.jpg`;
      const foundPath = [path.join(process.cwd(), 'public', 'photos', safeFilename), path.join(process.cwd(), 'Photos', safeFilename)].find((candidate) => fs.existsSync(candidate));
      if (!foundPath) return sendJson(res, 404, { error: `Photo not found: ${safeFilename}` });
      try {
        const stat = fs.statSync(foundPath);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(safeDownloadName)}"`);
        fs.createReadStream(foundPath).pipe(res);
      } catch {
        sendJson(res, 500, { error: 'Failed to stream photo file.' });
      }
      return;
    }
    next();
  };
}
