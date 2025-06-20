import { useRef, useEffect, useState } from 'react';
import sanitize from 'sanitize-filename';
import { Download } from 'lucide-react';

export function GenerateCertificate({username}: {username: string}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [certficateReady, setCerticateReady] = useState<boolean>(false);

  useEffect(() => {

    document.fonts.ready.then(() => {
      const img = new Image();
      img.onload = () => {
        console.log('wait');
        window.setTimeout(() => {
          drawCertificate(img);
        }, 500);
      };
      img.onerror = (error) => {
        console.error('Failed to load image:', error);
      };

      img.src = 'asteroid.svg'; // Adjust path as needed
    });
  }, []);

  const drawCertificate = (img: HTMLImageElement): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle border
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    // Draw title at top (centered)

    ctx.fillStyle = 'darkblue';
    ctx.font = '33px Orbitron';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate Of Achievement', canvas.width / 2, 80);

    ctx.drawImage(img, 350, 120);

    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#333';
    ctx.fillText('This certifies that', canvas.width / 2, 320);
    ctx.fillText('has successfully completed the Asteroid Explorer', canvas.width / 2, 440);
    ctx.fillText('journey and demonstrated exceptional cosmic curiosity!', canvas.width / 2, 465);


    // Dashed line
    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(250, 385);
    ctx.lineTo(550, 385);
    ctx.strokeStyle = '#aaa';
    ctx.stroke();

    ctx.font = '24px Courier monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#111';
    ctx.fillText(username, canvas.width / 2, 380);

    // Draw date at bottom (centered)
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    ctx.fillStyle = '#6b7280';
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText(`Awarded on: ${currentDate}`, canvas.width / 2, canvas.height - 30);

    setCerticateReady(true);
    console.log('ready');

  };


  const downloadImage = (): void => {
    setIsLoading(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create download link
    const link = document.createElement('a');
    link.download = `certificate-${sanitize(username)}.png`;
    link.href = canvas.toDataURL();

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="flex flex-col items-center p-8">


      {!certficateReady && (
      <p className="font-orbitron animate-pulse">Generating...</p>
      )}

      <div>
        <canvas
          ref={canvasRef}
          className="block w-full max-w-full shadow-xl"
          style={{ display: certficateReady ? 'block' : 'none' }}
        />
      </div>


      {certficateReady && (
        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={downloadImage}
            disabled={isLoading}
            className="flex items-center gap-2 bg-gray-200 hover:bg-lime-500 hover:text-white hover:cursor-pointer hover:scale-110 disabled:bg-gray-400 text-gray-900 px-6 py-3 rounded-lg font-medium transition"
          >
            <Download size={20} />
            {isLoading ? 'Downloading...' : 'Download'}
          </button>
        </div>
      )}

    </div>
  );
}
