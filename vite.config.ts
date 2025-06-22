import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as child from "child_process";


const commitHash = child.execSync("git rev-parse --short HEAD").toString();


export default defineConfig({
  base: '',
  plugins: [react(), tailwindcss()],
  define: {
    BUILD_DATE: JSON.stringify(new Date().toISOString()),
    COMMIT_HASH: JSON.stringify(commitHash),
  },
})
