import React from 'react';
import { Link } from 'react-router-dom';

import Model from '../models/Album';

interface AlbumLinkProps {
  albumModel: Model,
}

export default function AlbumLink(props: AlbumLinkProps) {
  return (
    <li>
      <Link to={"albums/" + props.albumModel.slug}>
        {props.albumModel.title} ({props.albumModel.year})
      </Link>
    </li>
  );
}

