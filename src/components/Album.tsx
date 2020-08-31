import React from 'react';
import { useParams } from 'react-router-dom';

import Model from '../models/Album';

interface AlbumProps {
  discography: Model[],
}

export default function Album(props: AlbumProps) {
  const { slug } = useParams();

  const albumModel = props.discography.find((value: Model) => {
    return value.slug === slug;
  });

  if (albumModel === undefined) {
    return <p>Unknown album.</p>;
  } else {
    return (
      <React.Fragment>
        <h1>{albumModel.title}</h1>

        <p>Released {albumModel.monthName} {albumModel.day}, {albumModel.year}</p>

        <div className="column">
          { (albumModel.amazon || albumModel.apple) && <h2>Listen</h2> }

          {
            albumModel.amazon &&
            <p><a href={albumModel.amazon}>Buy on Amazon</a></p>
          }

          {
            albumModel.apple &&
            <p><a href={albumModel.apple}>Listen on Apple Music or buy on iTunes</a></p>
          }

          {
            albumModel.credits &&
            <React.Fragment>
              <h2>Credits</h2>

              <p>
                {albumModel.credits.map(credit => <span>{credit}<br /></span>)}
              </p>
            </React.Fragment>
          }

          {
            albumModel.musicians &&
            <React.Fragment>
              <h2>Musicians</h2>

              <p>
                {albumModel.musicians.map(musician => <span>{musician}<br /></span>)}
              </p>
            </React.Fragment>
          }

          <h2>Track listing</h2>

          <table>
            <tr>
              <th>Title</th>
              <th>Time</th>
            </tr>
            {
              albumModel.tracks.map((track) => {
                return (
                  <tr>
                    <td>{track.title}</td>
                    <td>{track.time}</td>
                  </tr>
                );
              })
            }
          </table>
        </div>
        <div className="album-art">
          <img
            src={`/images/${albumModel.imageSlug}.jpg`}
            alt={albumModel.title}
            title={albumModel.title}
            className="album-art"
          />
        </div>
        <div className="clear"></div>
      </React.Fragment>
    );
  }
}
