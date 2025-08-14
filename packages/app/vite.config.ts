import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    plugins: [
      react(),
      tailwindcss(),
      svgr(),
      tsconfigPaths({
        // This ensures vite-tsconfig-paths uses the local tsconfig
        root: __dirname,
      }),
    ],
    optimizeDeps: {
      esbuildOptions: {
        jsx: 'automatic',
      },
      // In dev mode, exclude workspace packages to enable hot reload
      // In production, include them for pre-bundling
      include: isDev ? [] : ['@vaults4626/sdk', '@vaults4626/contracts'],
      exclude: isDev ? ['@vaults4626/sdk', '@vaults4626/contracts'] : [],
    },
    define: {
      global: 'globalThis',
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: 'dist',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }
})
