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
        <img
          src="/images/war-1-220x220.jpg"
          width="220"
          height="220"
          alt={props.albumModel.title}
          title={props.albumModel.title}
        /><br />
        {props.albumModel.title} ({props.albumModel.year})
      </Link>
    </li>
  );
}

