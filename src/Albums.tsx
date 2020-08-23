import React from 'react';
import { AlbumData } from './discography.yaml';
import Album from './Album'

interface AlbumsProps {
  discography: AlbumData[],
}

export default class Albums extends React.Component<AlbumsProps> {
  render() {
    const albums = this.props.discography.map((albumData) => {
      return (
        <Album key={albumData.title} albumData={albumData} />
      );
    });

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
