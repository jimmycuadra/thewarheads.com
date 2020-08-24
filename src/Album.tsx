import React from 'react';
import { Link } from 'react-router-dom';
import { AlbumData } from './discography.yaml';

interface AlbumProps {
  albumData: AlbumData,
}

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

export default class Album extends React.Component<AlbumProps> {
  day: string;
  monthName: string;
  year: string;
  slug: string;

  constructor(props: AlbumProps) {
    super(props);

    let [year, month, day] = this.props.albumData.date.split("-");

    this.day = day;
    this.monthName = monthNames[parseInt(month, 10) - 1]
    this.year = year;
    this.slug = this.props.albumData.title
      .normalize("NFD")
      .toLowerCase()
      .replace(whitespace, "-")
      .replace(nonWords, "")
      .replace(multipleDashes, "-");
  }

  render() {
    return (
      <li>
        <Link to={"albums/" + this.slug}>
          {this.props.albumData.title} ({this.year})
        </Link>
      </li>
    );
  }
}
