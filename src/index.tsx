import React from 'react';
import { hydrate, render } from 'react-dom';

import './styles/index.css';

import App from './components/App';

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
const root = document.getElementById('root');

if (root && root.hasChildNodes()) {
  hydrate(app, root);
} else {
  render(app, root);
}
