import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlbumData, TrackData } from './discography.yaml';

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const whitespace = /\s+/g;
const nonWords = /[^\w-]+/g;
const multipleDashes = /-+/g;

export class AlbumModel {
  title: string;
  date: string;
  description: string | undefined;
  amazon: string | undefined;
  apple: string | undefined;
  credits: string[]| undefined;
  musicians: string[] | undefined;
  tracks: TrackData[];

  day: string;
  monthName: string;
  year: string;
  slug: string;

  static fromRaw(discography: AlbumData[]): AlbumModel[] {
    return discography.map((albumData) => new AlbumModel(albumData));
  }

  constructor(albumData: AlbumData) {
    let [year, month, day] = albumData.date.split("-");

    this.title = albumData.title;
    this.date = albumData.date;
    this.description = albumData.description;
    this.amazon = albumData.amazon;
    this.apple = albumData.apple;
    this.credits = albumData.credits;
    this.musicians = albumData.musicians;
    this.tracks = albumData.tracks;

    this.day = day;
    this.monthName = monthNames[parseInt(month, 10) - 1]
    this.year = year;
    this.slug = albumData.title
      .normalize("NFD")
      .toLowerCase()
      .replace(whitespace, "-")
      .replace(nonWords, "")
      .replace(multipleDashes, "-");
  }
}

interface AlbumLinkProps {
  albumModel: AlbumModel,
}

export function AlbumLink(props: AlbumLinkProps) {
  return (
    <li>
      <Link to={"albums/" + props.albumModel.slug}>
        {props.albumModel.title} ({props.albumModel.year})
      </Link>
    </li>
  );
}

interface AlbumProps {
  discography: AlbumModel[],
}

export function Album(props: AlbumProps) {
  const { slug } = useParams();

  const albumModel = props.discography.find((value: AlbumModel) => {
    return value.slug === slug;
  });

  if (albumModel === undefined) {
    return <p>Unknown album.</p>;
  } else {
    return (
      <React.Fragment>
        <h1>{albumModel.title}</h1>

        <p>Released {albumModel.monthName} {albumModel.day}, {albumModel.year}</p>

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
      </React.Fragment>
    );
  }
}
