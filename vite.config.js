import path from 'path'
import { defineConfig } from 'vite'
import resolve from '@rollup/plugin-node-resolve'
import autoExternal from 'rollup-plugin-auto-external'

function onProxyReq(proxyReq) {
  const sockets = proxyReq.agent.sockets
  const keys = Object.keys(sockets)
  console.log(`当前请求代理到：${keys[0]} ${sockets[keys[0]][0]._httpMessage.path}`)
}


export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      '/api/account': {
        target: 'http://account.gw3.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/account/, ''),
        configure: (proxy) => proxy.on('proxyReq', onProxyReq),
      },
      '/api/starbase': {
        target: 'http://starbase.gw3.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/starbase/, ''),
        configure: (proxy) => proxy.on('proxyReq', onProxyReq),
      },
    },
  },

  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'),
      name: 'gw3-sdk',
      fileName: 'gw3-sdk',
      formats: ['es', 'umd', 'cjs'],
    },
    rollupOptions: {
      plugins: [
        autoExternal(),
        resolve(),
      ],
      external: []
    },
  },
})