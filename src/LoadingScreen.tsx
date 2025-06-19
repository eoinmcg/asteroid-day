import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoad: () => void;
  isLoaded?: boolean;
}

export const LoadingScreen = ({ onLoad }: LoadingScreenProps) => {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const imageUrls = [
      'asteroid.svg',
      'texture.webp',
      'asteroid-belt-vintage.webp',
      'nasa-dart.webp',
      'ceres-vintage.webp',
      'jupiter-vintage.webp',
      'space-bg.webp',
      'bluesky.svg',
    ];

    const preloadImages = async () => {
      try {
        const imagePromises = imageUrls.map(url => 
          new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load ${url}`));
            img.src = url;
          })
        );

        await Promise.all(imagePromises);

        onLoad();

        const timeoutId: number = setTimeout(() => {
          setComplete(true)
        }, 1000);

        return () => clearTimeout(timeoutId);

      } catch (error) {
        console.error('Error preloading images:', error);
        // Still call onLoad even if images fail to load
        onLoad();
      }
    };

    preloadImages();


  }, [onLoad]);

  if (complete) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("space-bg.webp")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          fontFamily: 'Courier, monospace',
          fontSize: '2em',
          color: '#fff',
          textShadow: '0 0 10px #0f0, 0 0 20px #0f0, 0 0 30px #0f0, 0 0 40px #0f0, 0 0 50px #0f0',
          animation: 'flicker 1.5s infinite alternate',
        }}
      >
        <h1>loading</h1>
      </div>
      <style>
        {`
          @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}
      </style>
    </div>
  );
};
