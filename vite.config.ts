// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import gitRevision from 'vite-plugin-git-revision'
// import { execSync } from 'child_process'
//
// export default defineConfig({
//   base: '',
//   plugins: [react(), tailwindcss(), gitRevision()],
//   define: {
//     __GIT_COMMIT__: JSON.stringify(
//       process.env.VITE_GIT_COMMIT || 
//       execSync('git rev-parse HEAD').toString().trim()
//     ),
//   },
// })
//
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'

const getGitCommit = () => {
  try {
    return execSync('git rev-parse HEAD').toString().trim()
  } catch (error) {
    console.warn('Could not get git commit:', error)
    return 'unknown'
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __GIT_COMMIT__: JSON.stringify(getGitCommit()),
  }
})
