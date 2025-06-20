import { useState, lazy } from 'react';

import { LoadingScreen } from './LoadingScreen';
const AsteroidDay = lazy(() => import('./AsteroidDay'));

export function App() {

  const [isLoaded, setIsLoaded] = useState(false);
  const loadComplete = () => setIsLoaded(true);

  return (
    <>
      <LoadingScreen onLoad={loadComplete} isLoaded={isLoaded} />
      {isLoaded && (<AsteroidDay />)}
    </>
  );
}
