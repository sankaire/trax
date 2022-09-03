import { ReactNode } from "react";

export interface Props {
  children?: ReactNode;
}
export interface ArtistData {
  name: string;
  songs: Array<any>;
}
export interface SongData {
  id: any;
  name: string;
  duration: number;
  url: string;
}
