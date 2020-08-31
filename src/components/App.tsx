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
import Home from './Home';
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
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
