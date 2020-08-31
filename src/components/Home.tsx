import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <React.Fragment>
      <div className="intro-container">
        <div className="intro">
          <h2>The Warheads</h2>

          <p>The Warheads were formed in 1990.<br />
          They record exclusively at RADICAL SOUND STUDIOS and THE TRENCHES.<br />
          All songs are Composed,Performed and Assembled by The Warheads<br />
          All songs are Produced by The Warheads<br />
          Music Published by: Drop the Bomb Music BMI 2016<br />
          Music Distribution by THE ORCHARD</p>
        </div>
      </div>

      <ul className="album-links">
        <li>
          <Link to="/albums">
            <img
              src="/images/war-red-square.jpg"
              width="220"
              height="220"
              alt="Music for Sale"
              title="Music for Sale"
            /><br />
            Music for Sale
          </Link>
        </li>
        <li>
          <Link to="/about">
            <img
              src="/images/war-purple-square.jpg"
              width="220"
              height="220"
              alt="About The Warheads"
              title="About The Warheads"
            /><br />
            About The Warheads
          </Link>
        </li>
        <li>
          <Link to="/links">
            <img
              src="/images/war-orange-square.jpg"
              width="220"
              height="220"
              alt="The Warheads on the Web"
              title="The Warheads on the Web"
            /><br />
            The Warheads on the Web
          </Link>
        </li>
      </ul>
      <div className="clear"></div>
    </React.Fragment>
  );
}
