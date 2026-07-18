import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

const packageJsonPath = resolve(process.cwd(), 'package.json')
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
const buildNumber = packageJson.version || '0'
const buildDate = new Date().toISOString()

// SPA fallback for static hosts that don't rewrite unknown paths to index.html
// (e.g. GitHub Pages). Copies the built index.html to 404.html so a hard reload
// of a client-side route like /projects serves the app instead of a 404 page.
function spaFallbackHtml() {
  return {
    name: 'spa-fallback-html',
    apply: 'build',
    closeBundle() {
      const outDir = resolve(process.cwd(), 'dist')
      const indexHtml = resolve(outDir, 'index.html')
      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, resolve(outDir, '404.html'))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), spaFallbackHtml()],
  define: {
    'import.meta.env.VITE_BUILD_NUMBER': JSON.stringify(buildNumber),
    'import.meta.env.VITE_BUILD_DATE': JSON.stringify(buildDate),
  },
  build: {
    outDir: 'dist',
  },
})
