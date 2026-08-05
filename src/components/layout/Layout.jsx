import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgressBar } from './ScrollProgressBar';
import { AiAssistant } from '../ai/AiAssistant';
import './Layout.css';

export const Layout = () => {
  return (
    <div className="layout-wrapper">
      <ScrollProgressBar />
      <Navbar />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Layout;
