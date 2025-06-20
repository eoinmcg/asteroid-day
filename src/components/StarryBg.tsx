export function StarryBg() {
  return (
<div className={`absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden`}>
  {/* Stars background */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Large stars */}
    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
    <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-1000"></div>
    <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-2000"></div>
    <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-3000"></div>
    <div className="absolute bottom-1/4 left-1/5 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-4000"></div>
    
    {/* Medium stars */}
    <div className="absolute top-1/5 left-1/2 w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse animation-delay-500"></div>
    <div className="absolute top-2/3 right-1/5 w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse animation-delay-1500"></div>
    <div className="absolute bottom-1/5 left-2/3 w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse animation-delay-2500"></div>
    <div className="absolute top-1/6 right-2/5 w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse animation-delay-3500"></div>
    <div className="absolute bottom-2/5 right-1/6 w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse animation-delay-4500"></div>
    
    {/* Small stars */}
    <div className="absolute top-1/8 left-1/6 w-px h-px bg-white/60 rounded-full"></div>
    <div className="absolute top-3/4 left-3/4 w-px h-px bg-white/60 rounded-full"></div>
    <div className="absolute top-1/7 right-1/7 w-px h-px bg-white/60 rounded-full"></div>
    <div className="absolute bottom-1/8 left-4/5 w-px h-px bg-white/60 rounded-full"></div>
    <div className="absolute top-5/6 right-3/4 w-px h-px bg-white/60 rounded-full"></div>
    <div className="absolute top-2/5 left-1/8 w-px h-px bg-white/60 rounded-full"></div>
    <div className="absolute bottom-1/6 right-4/5 w-px h-px bg-white/60 rounded-full"></div>
    <div className="absolute top-4/5 left-1/7 w-px h-px bg-white/60 rounded-full"></div>
    <div className="absolute bottom-3/5 right-1/8 w-px h-px bg-white/60 rounded-full"></div>
    <div className="absolute top-1/10 left-3/5 w-px h-px bg-white/60 rounded-full"></div>
  </div>
  
  <style>{`
    .animation-delay-500 { animation-delay: 0.5s; }
    .animation-delay-1000 { animation-delay: 1s; }
    .animation-delay-1500 { animation-delay: 1.5s; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-2500 { animation-delay: 2.5s; }
    .animation-delay-3000 { animation-delay: 3s; }
    .animation-delay-3500 { animation-delay: 3.5s; }
    .animation-delay-4000 { animation-delay: 4s; }
    .animation-delay-4500 { animation-delay: 4.5s; }
  `}</style>
</div>
  );
}

