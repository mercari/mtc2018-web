export interface News {
  id: string;
  date: string;
  message: string;
  link?: string;
}

export interface Speaker {
  id: string;
  name: string;
  company: string;
  position: string;
  profile: string;
  iconUrl: string;
  twitterId: string;
  githubId: string;
}

export interface Content {
  id: number;
  type: 'keynote' | 'session';
  place: string;
  title: string;
  outline: string;
  tags: string[];
  speakers: Speaker[];
  startTime: string;
  endTime: string;
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
}
