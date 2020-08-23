import React from 'react';
import { hydrate, render } from 'react-dom';
import './index.css';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.css';

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
