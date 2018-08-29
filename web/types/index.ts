export interface News {
  id: string;
  date: string;
  message: string;
  link?: string;
}

export interface Speaker {
  name: string;
  company: string;
  position: string;
  profile: string;
  iconUrl: string;
  twitterId: string;
  githubId: string;
}

export interface Content {
  id: string;
  place: string;
  title: string;
  outline: string;
  tags: string[];
  speakers: Speaker[];
  startTime: string;
  endTime: string;
}

export interface Row {
  time: string;
  slots: Slot[];
}

export type Slot = ContentSlot | OtherSlot;

export interface ContentSlot {
  type: 'content';
  data: any;
}

export interface OtherSlot {
  type: 'other';
  label: string;
}
