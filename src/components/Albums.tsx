import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Album from './Album'
import AlbumLink from './AlbumLink'
import Model from '../models/Album'

interface AlbumsProps {
  discography: Model[],
}

function albumLinks(props: AlbumsProps) {
  return props.discography.map((albumModel) => {
    return (
      <AlbumLink key={albumModel.slug} albumModel={albumModel} />
    );
  });
}

export default function Albums(props: AlbumsProps) {
  return (
    <Switch>
      <Route exact path="/albums">
        <h2>Albums</h2>

        <ul className="album-links">
          {albumLinks(props)}
        </ul>
        <div className="clear"></div>
      </Route>
      <Route path="/albums/:slug">
        <Album discography={props.discography} />
      </Route>
    </Switch>
  );
}
