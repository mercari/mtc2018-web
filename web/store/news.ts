export interface News {
  id: string;
  date: string;
  message: string;
  link?: string;
}

export const news: News[] = [
  {
    id: '3',
    date: '2018-09-20',
    message: 'アプリのアップデートをしました！',
    link: 'https://google.com'
  },
  {
    id: '2',
    date: '2018-09-16',
    message: 'テキストが入ります',
    link: 'https://google.com'
  },
  {
    id: '1',
    date: '2018-08-30',
    message: 'テキストが入ります'
  }
];
