import React from 'react';
import About from './About';
import Albums from './Albums';
import Footer from './Footer';
import Links from './Links';
import Podcasts from './Podcasts';
import Header from './Header';
import discography from './discography.yaml';
import './App.css';

console.log(typeof discography);
console.log(discography);
console.dir(discography);

export default function App() {
  return (
    <div className="container">
      <Header />
      <About />
      <Albums albums={discography} />
      <Links />
      <Podcasts />
      <Footer />
    </div>
  );
}
