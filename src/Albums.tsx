import React from 'react';

interface AlbumsProps {
  albums: Album[],
}

export interface Album {
  title: string,
  date: string,
  description: string,
  amazon: string,
  apple: string,
  credits: string[],
  musicians: string[]
  tracks: Track[],
}

interface Track {
  title: string,
  time: string,
}

export default class Albums extends React.Component<AlbumsProps> {
  render() {
    // <a href="{{ album.slug() }}.html">{{ album.title }} ({{ album.year() }})</a>
    const albums = this.props.albums.map((item) => <li>{item}</li>);

    return (
      <React.Fragment>
        <h2>Albums</h2>

        <ul>
          {albums}
        </ul>
      </React.Fragment>
    );
  }
}
