import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div id="logo">
        <span>
          <a href="/">The Warheads</a>
        </span>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/about" activeClassName="active">About</NavLink>
          </li>
          <li>
            <NavLink to="/albums" activeClassName="active">Albums</NavLink>
          </li>
          <li>
            <NavLink to="/links" activeClassName="active">Links</NavLink>
          </li>
          <li>
            <NavLink to="/podcasts" activeClassName="active">Podcasts</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
