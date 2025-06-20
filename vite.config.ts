import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { gitRevision } from 'vite-plugin-git-revision'

// https://vite.dev/config/
export default defineConfig({
  base: '',
  plugins: [react(), tailwindcss(), gitRevision()],
  define: {
    __GIT_COMMIT__: JSON.stringify(process.env.VITE_GIT_COMMIT || 'unknown'),
  },
})
