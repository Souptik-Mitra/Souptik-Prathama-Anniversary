import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { createAuthMiddleware } from './server/authMiddleware.ts';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'scrapbook-auth-server',
        configureServer(server) {
          server.middlewares.use(createAuthMiddleware(env));
        },
        configurePreviewServer(server) {
          server.middlewares.use(createAuthMiddleware(env));
        },
      },
    ],
  };
});
