import type { ReactNode } from 'react';
import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

interface SectionProps {
  bgColor?: string;
  showDownNav?: boolean;
  children: ReactNode;
}
export function Section({bgColor, showDownNav, children}: SectionProps) {
  const handleNav = (e: React.MouseEvent<HTMLDivElement>) => {
    const nextSection = e.currentTarget.closest('section')?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }; 
  
  return (
      <section className={`snap-start h-screen flex items-center justify-center relative ${bgColor}`}>
        {children}
        {showDownNav && (
          <div className="absolute bottom-20 right-8 text-white" onClick={handleNav}>
          <div className="bg-white/20 border-2 border-white/20 p-2 rounded-full animate-bounce hover:animate-none hover:cursor-pointer  hover:bg-amber-300/30 hover:border-amber-500">
            <ArrowDown />
          </div>
          </div>
        )}
      </section>
  );
}


interface BgImageProps {
  img: string;
  overlay?: string;
  credit?: string;
  creditLink?: string;
}
export function BgImage({img, overlay, credit, creditLink}: BgImageProps) {
  if (!img) return null;
  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-hidden">
      <img className="w-full h-full object-cover" src={img} alt="space age background image" />
      <div className={`absolute inset-0 ${overlay}`}></div>
      
      {credit && (
        <div className="absolute bottom-4 left-4 z-10">
          {creditLink ? (
            <a 
              href={creditLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white opacity-70 hover:opacity-100 transition-opacity"
            >
              {credit}
            </a>
          ) : (
            <span className="text-sm p-2 text-white bg-black/75 opacity-80">
              {credit}
            </span>
          )}
        </div>
      )}
    </div>
  );}

interface H1Props {
  color?: string;
  children: ReactNode;
}
export function H1({color, children}: H1Props) {
  color = color || 'text-white';
  return (
        <h1 className={`${color} text-6xl font-thin font-orbitron drop-shadow-lg`}>{children}</h1>
  );
}

interface HighlightProps {
  styles?: string;
  children: ReactNode;
}
export function Highlight({styles, children}: HighlightProps) {
  return (
    <>
      {' '}
      <span className={`
          intersect:bg-yellow-300 intersect:text-black intersect:p-1 intersect-once ease-in
          transition duration-500 ${styles}
      `}>
        {children}
      </span>
      {' '}
    </>

  );
}

interface FactProps {
  title?: string;
  children: ReactNode;
}
export function Fact({title, children}: FactProps) {
  return (
    <>
      <h2 className="hidden font-orbitron text-4xl ml-4 text-pink-500 p-2 bg-black/50">{title}</h2>
      <div className="text-white p-8 mt-16 bg-black/50 text-2xl drop-shadow-lg">
        {children}
      </div>
    </>
  )
}

interface TeleTypeProps {
  text: string;
  startDelay?: number;
  speed?: number;
}
export function Teletype({ text, startDelay = 0, speed = 100}: TeleTypeProps){
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [text, startDelay, speed]);

  return (
    <span>
      {displayedText}
      {!isComplete && displayedText.length > 0 && <span className="animate-pulse">|</span>}
    </span>
  );
};
