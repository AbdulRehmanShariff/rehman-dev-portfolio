import React from 'react';
import { Hero } from '../components/sections/Hero/Hero';
import { About } from '../components/sections/About/About';
import { Skills } from '../components/sections/Skills/Skills';
import { Sdlc } from '../components/sections/Sdlc/Sdlc';
import { Projects } from '../components/sections/Projects/Projects';
import { EngineeringSnapshot } from '../components/sections/EngineeringSnapshot/EngineeringSnapshot';
import { RecruiterValue } from '../components/sections/RecruiterValue/RecruiterValue';
import { GithubDashboard } from '../components/sections/GithubDashboard/GithubDashboard';
import { CareerJourney } from '../components/sections/CareerJourney/CareerJourney';
import { ContactHub } from '../components/sections/ContactHub/ContactHub';

export const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Sdlc />
      <Projects />
      <EngineeringSnapshot />
      <RecruiterValue />
      <GithubDashboard />
      <CareerJourney />
      <ContactHub />
    </>
  );
};

export default Home;
