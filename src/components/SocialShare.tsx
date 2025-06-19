import { Twitter } from 'lucide-react';

export function SocialShare() {

  const style = `bg-blue-500 hover:bg-blue-600 text-white px-6 py-3
    rounded-lg flex items-center justify-center gap-2
    transition hover:scale-110 hover:cursor-pointer shadow-lg`;

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Check out these amazing asteroid facts! 🌌";

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'bluesky') {
      window.open(`https://bsky.app/intent/compose?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    }
  };

  return (
    <div className="mt-16">
    <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={() => handleShare('twitter')}
          className={style}
        >
        <Twitter size={20} />
        </button>
        <button
          onClick={() => handleShare('bluesky')}
          className={style}
        >
          <img src="bluesky.svg" className="w-6" alt="bluesky logo" />
        </button>
      </div>
    </div>
  );
}

