import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { App } from './App';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>,
);

console.log(`%c🛰️ Greetings Earthling!`, 'background: #036; color: #fff');
console.log(`%c🌕 source code: https://github.com/eoinmcg/asteroid-day`, 'background: #036; color: #fff');
console.log(`%c☄️ © Eoin McGrath  ${new Date().getFullYear()} (https://eoinmcgrath.com)`, 'background: #036; color: #fff');
console.log(`build_date: ${BUILD_DATE} commit_hash: ${COMMIT_HASH}`);
console.log('');



