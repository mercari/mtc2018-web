import { duplicate } from '../utils';

export interface Tag {
  id: string;
  label: string;
}

export interface Speaker {
  id: string;
  name: string;
  position: string;
  iconUrl: string;
  body: string;
}

export interface Content {
  id: string;
  type: {
    id: string;
    label: string;
  };
  place: string;
  title: string;
  body: string;
  startTime: string;
  endTime: string;
  tags: Tag[];
  speaker: Speaker;
}

export const contents: Content[] = duplicate<Content>(20)({
  id: '1',
  type: {
    id: 'session',
    label: 'SESSION'
  },
  place: 'Track A',
  title: '基調講演',
  body:
    'メルカリはリリースから4年で日米7500万ダウンロード、月間流通額100億円超のフリマアプリに成長しました。開発者の視点からこれまでの技術戦略、チーム、開発プロセスなどを振り返ります。そしてこれからの技術的な取り組みについてご紹介します。',
  startTime: '10:00',
  endTime: '11:00',
  tags: [
    {
      id: 'future',
      label: 'Future'
    },
    {
      id: 'team',
      label: 'Team'
    }
  ],
  speaker: {
    id: '1',
    name: '名村 卓',
    position: 'CTO',
    iconUrl: 'https://avatars1.githubusercontent.com/u/1390409?s=460&v=4',
    body:
      'テキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入りますテキストが入ります'
  }
});
