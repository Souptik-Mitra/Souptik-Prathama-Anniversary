import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';

interface SessionData {
  username: string;
  createdAt: number;
  expiresAt: number;
}

// In-memory session store (token -> SessionData)
const sessions = new Map<string, SessionData>();

// 30 days session duration
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

function parseCookies(cookieHeader?: string): Record<string, string> {
  const list: Record<string, string> = {};
  if (!cookieHeader) return list;

  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    const name = parts[0]?.trim();
    if (name) {
      list[name] = decodeURIComponent(parts.slice(1).join('=').trim());
    }
  });

  return list;
}

function getValidSession(req: IncomingMessage): SessionData | null {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies['scrapbook_session'];
  if (!token) return null;

  const session = sessions.get(token);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }

  return session;
}

function sendJson(res: ServerResponse, statusCode: number, data: unknown) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

export function createAuthMiddleware(env: Record<string, string | undefined>) {
  const validUsername = env.SCRAPBOOK_USERNAME || process.env.SCRAPBOOK_USERNAME || 'SouPra1';
  const validPassword = env.SCRAPBOOK_PASSWORD || process.env.SCRAPBOOK_PASSWORD || '311525';

  return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const url = req.url || '';

    // Handle Login: POST /api/login
    if (url === '/api/login' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        try {
          const { username, password } = JSON.parse(body || '{}');

          if (!username || !password) {
            return sendJson(res, 400, {
              success: false,
              message: 'Please provide both username and password.',
            });
          }

          const trimmedUser = String(username).trim();
          const trimmedPass = String(password).trim();

          if (trimmedUser !== validUsername || trimmedPass !== validPassword) {
            return sendJson(res, 401, {
              success: false,
              message: 'Invalid username or password. Please try again.',
            });
          }

          // Generate secure session token
          const token = crypto.randomBytes(32).toString('hex');
          const now = Date.now();
          sessions.set(token, {
            username: trimmedUser,
            createdAt: now,
            expiresAt: now + SESSION_DURATION_MS,
          });

          // Set secure HttpOnly cookie
          res.setHeader('Set-Cookie', [
            `scrapbook_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(
              SESSION_DURATION_MS / 1000
            )}`,
          ]);

          return sendJson(res, 200, {
            success: true,
            user: { username: trimmedUser },
            message: 'Login successful.',
          });
        } catch {
          return sendJson(res, 400, {
            success: false,
            message: 'Malformed request payload.',
          });
        }
      });
      return;
    }

    // Handle Current Auth Status: GET /api/auth/me
    if (url === '/api/auth/me' && req.method === 'GET') {
      const session = getValidSession(req);
      if (!session) {
        return sendJson(res, 401, {
          authenticated: false,
          message: 'Not authenticated.',
        });
      }

      return sendJson(res, 200, {
        authenticated: true,
        user: { username: session.username },
      });
    }

    // Handle Logout: POST /api/logout
    if (url === '/api/logout' && req.method === 'POST') {
      const cookies = parseCookies(req.headers.cookie);
      const token = cookies['scrapbook_session'];
      if (token) {
        sessions.delete(token);
      }

      res.setHeader('Set-Cookie', [
        'scrapbook_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
      ]);

      return sendJson(res, 200, {
        success: true,
        message: 'Logged out successfully.',
      });
    }

    // Handle Photo Download: GET /api/download/:filename
    if (url.startsWith('/api/download/') && req.method === 'GET') {
      const session = getValidSession(req);
      if (!session) {
        return sendJson(res, 401, {
          error: 'Unauthorized. Please login to download photos.',
        });
      }

      // Extract filename safely
      const rawUrl = new URL(url, 'http://localhost');
      const rawFilename = rawUrl.pathname.replace('/api/download/', '');
      const safeFilename = path.basename(decodeURIComponent(rawFilename));
      const customDownloadName = rawUrl.searchParams.get('filename') || safeFilename;
      const safeDownloadName = path.basename(customDownloadName).endsWith('.jpg') || path.basename(customDownloadName).endsWith('.jpeg')
        ? path.basename(customDownloadName)
        : `${path.basename(customDownloadName)}.jpg`;

      // Check photo paths (public/photos or Photos folder)
      const possiblePaths = [
        path.join(process.cwd(), 'public', 'photos', safeFilename),
        path.join(process.cwd(), 'Photos', safeFilename),
      ];

      const foundPath = possiblePaths.find((p) => fs.existsSync(p));

      if (!foundPath) {
        return sendJson(res, 404, {
          error: `Photo not found: ${safeFilename}`,
        });
      }

      try {
        const stat = fs.statSync(foundPath);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Length', stat.size);
        res.setHeader(
          'Content-Disposition',
          `attachment; filename="${encodeURIComponent(safeDownloadName)}"`
        );

        const readStream = fs.createReadStream(foundPath);
        readStream.pipe(res);
        return;
      } catch (err) {
        console.error('Error serving photo download:', err);
        return sendJson(res, 500, {
          error: 'Failed to stream photo file.',
        });
      }
    }

    // Proceed to next middleware
    next();
  };
}
