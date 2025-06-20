import { useState, useEffect, lazy } from 'react';

import { LoadingScreen } from './LoadingScreen';
const AsteroidDay = lazy(() => import('./AsteroidDay'));

export function App() {

  const [isLoaded, setIsLoaded] = useState(false);
  const loadComplete = () => setIsLoaded(true);

  useEffect(() => {
    if (import.meta.env.PROD) {
      console.log('Commit:', __GIT_COMMIT__);
    } else {
      console.log('dev mode');
    }
  }, []);

  return (
    <>
      <LoadingScreen onLoad={loadComplete} isLoaded={isLoaded} />
      {isLoaded && (<AsteroidDay />)}
    </>
  );
}
