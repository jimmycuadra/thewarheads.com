export interface AlbumData {
  title: string,
  date: string,
  description?: string,
  amazon?: string,
  apple?: string,
  credits?: string[],
  musicians?: string[]
  tracks: TrackData[],
}

export interface TrackData {
  title: string,
  time: string,
}

declare const discography: AlbumData[];

export default discography;
