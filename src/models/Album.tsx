import { AlbumData, TrackData } from '../data/discography.yaml'

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

export default class Album {
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

  static fromRaw(discography: AlbumData[]): Album[] {
    return discography.map((albumData) => new Album(albumData))
      .sort((a, b) => b.date.localeCompare(a.date));
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

