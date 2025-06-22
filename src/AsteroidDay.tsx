import React, { useState, useEffect } from 'react';
import { AsteroidField } from './components/AsteroidField';
import { StarField } from './components/StarField';
import { Observer } from 'tailwindcss-intersect';

import { Quiz } from './components/Quiz';
import { Section, BgImage, H1, Highlight, Fact, Teletype } from './components/UI';

const AsteroidDay: React.FC = () => {

  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    Observer.start();
  });

  useEffect(() => {
    const timer= setTimeout(() => setShowArrow(true), 3500);
    return () => {
      clearTimeout(timer);
    }
  });

  return (
    <main className="max-h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden">
      <Section showDownNav={showArrow}>
        <div className="animate-fade-in animation-delay-2500">
        <BgImage img="space-bg2.webp" />
        <div className="absolute top-0 left-0 w-screen h-screen animate-fade animation-delay-5000">
          <AsteroidField />
        </div>
        <div className="absolute top-4 right-4 text-lime-400 font-bold font-orbitron p-2 bg-black/50">
          <Teletype
            text="30.june"
            startDelay={1000}
          />
        </div>
        <H1 color={'text-lime-400'}>
          <Teletype text="World" startDelay={2000} />
          <br />
          <Teletype text="Asteroid" startDelay={2500} />
          <br />
          <Teletype text="Day" startDelay={3200} />
        </H1>
        </div>
      </Section>

      <Section showDownNav={true}>
        <div className="absolute top-0 left-0 w-screen h-screen animate-fade animation-delay-1000">
          <StarField />
        </div>
        <div className="text-center opacity-5 translate-y-full intersect:opacity-100 intersect:translate-y-0 intersect-once delay-200 transition ease-out duration-500 text-shadow-xl">
        <H1>Did You Know?</H1>
        </div>
      </Section>

      <Section showDownNav={true}>
        <BgImage img="asteroid-belt-vintage.webp" overlay={'bg-black/25'} 
          credit="Image: AI"
        />
        <div 
          className="opacity-5 translate-x-full intersect:opacity-100 intersect:translate-x-0 intersect-once delay-200 transition ease-out duration-500"
        >
          <Fact title="#1">
            There are over
            <Highlight styles="delay-1000">1 million asteroids</Highlight>
            larger than 
            1 km
            in our solar system's asteroid belt.
          </Fact>
        </div>
      </Section>

      <Section showDownNav={true}>
        <BgImage img="tunguska.webp" overlay={'bg-black/25'} 
         credit="Image: AI"/>
        <div 
          className="opacity-5 translate-x-full intersect:opacity-100 intersect:translate-x-0 intersect-once delay-200 transition ease-out duration-500"
        >
          <Fact title="#1b">
            The <Highlight styles="delay-1000">Tunguska event</Highlight>, the <Highlight styles="delay-1500">largest asteroid impact in recorded history</Highlight>, occurred on June 30, 1908, when a 50-60 meter asteroid struck Tunguska, Siberia, flattening 2,000 square km of forest.
          </Fact>
        </div>
      </Section>

      <Section showDownNav={true}>
        <BgImage img="nasa-dart.webp" overlay={'bg-black/25'} 
          credit="Image: NASA" creditLink="https://science.nasa.gov/planetary-defense-dart/" />
        <div className="opacity-5 -translate-x-full intersect:opacity-100 intersect:translate-x-0 intersect-once delay-200 transition ease-out duration-500">
          <Fact title="#2">
            NASA's DART mission 
            <Highlight styles="delay-1000">successfully changed an asteroid's orbit</Highlight>
            in 2022, proving planetary defense is possible.
          </Fact>
        </div>
      </Section>

      <Section showDownNav={true}>
        <BgImage img="ceres-vintage.webp" overlay={'bg-black/25'}
          credit="Image: AI"
        />
        <div className="opacity-5 translate-x-full intersect:opacity-100 intersect:translate-x-0 intersect-once delay-200 transition ease-out duration-500">
          <Fact title="#3">
            The largest asteroid,
            <Highlight styles="delay-1000">Ceres</Highlight>
            , is 940 km in diameter and is classified as
            <Highlight styles="delay-1500">a dwarf planet.</Highlight>
          </Fact>
        </div>
      </Section>

      <Section showDownNav={true}>
        <BgImage img="mining.webp" overlay={'bg-black/25'}
          credit="Image: AI"
        />
        <div className="opacity-5 -translate-x-full intersect:opacity-100 intersect:translate-x-0 intersect-once delay-200 transition ease-out duration-500">
          <Fact title="#4">
            Some asteroids contain precious metals worth 
            <Highlight styles="delay-1000">quintillions of dollars</Highlight>
            , sparking interest in 
            <Highlight styles="delay-1500">asteroid mining.</Highlight>
          </Fact>
        </div>
      </Section>

      <Section showDownNav={true}>
        <BgImage img="jupiter-vintage.webp" overlay={'bg-black/25'} 
          credit="Image: AI"
        />
        <div className="opacity-5 translate-x-full intersect:opacity-100 intersect:translate-x-0 intersect-once delay-200 transition ease-out duration-500">
          <Fact title="#5">
            The asteroid belt between Mars and Jupiter contains 99.9% of all known asteroids in our solar system.
          </Fact>
        </div>
      </Section>

      <Quiz />

    </main>
  );
}

export default AsteroidDay;
