export interface News {
  id: string;
  date: string;
  message: string;
  messageJa: string;
  link?: string;
}

export interface Speaker {
  id: string;
  name: string;
  nameJa: string;
  company: string;
  position: string;
  positionJa: string;
  profile: string;
  profileJa: string;
  iconUrl: string;
  twitterId: string;
  githubId: string;
}

export interface Content {
  id: number;
  type: string;
  place: string;
  title: string;
  titleJa: string;
  lang: 'jp' | 'en';
  outline: string;
  outlineJa: string;
  tags: string[];
  speakers: Speaker[];
  startTime: string;
  endTime: string;
  slideUrl: string;
  movieUrl: string;
}

export type Row = ContentRow | OtherRow;

export interface ContentRow {
  type: 'content';
  time: string;
  trackA: number[];
  trackB: number[];
}

export interface OtherRow {
  type: 'other';
  time: string;
  label: string;
  labelJa: string;
}

export interface Exhibition {
  no: number;
  title: string;
  description: string;
  place: 'l' | 's';
}
