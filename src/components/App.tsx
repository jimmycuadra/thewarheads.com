import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import About from './About';
import AlbumModel from '../models/Album';
import Albums from './Albums';
import Footer from './Footer';
import Header from './Header';
import Links from './Links';
import Podcasts from './Podcasts';
import discography from '../data/discography.yaml';

export default function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/albums">
            <Albums discography={AlbumModel.fromRaw(discography)} />
          </Route>
          <Route path="/links">
            <Links />
          </Route>
          <Route path="/podcasts">
            <Podcasts />
          </Route>
          <Route path="/">
            <h2>The Warheads</h2>

            <p>The Warheads were formed in 1990.<br />
            They record exclusively at RADICAL SOUND STUDIOS and THE TRENCHES.<br />
            All songs are Composed,Performed and Assembled by The Warheads<br />
            All songs are Produced by The Warheads<br />
            Music Published by: Drop the Bomb Music BMI 2016<br />
            Music Distribution by THE ORCHARD</p>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
