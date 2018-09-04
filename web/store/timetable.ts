import { Row } from '../types';

export const rows: Row[] = [
  {
    type: 'other',
    time: '10:00 ~ 10:15',
    label: 'オープニング'
  },
  {
    type: 'other',
    time: '10:15 ~ 11:45',
    label: 'Keynote( 名村 卓, Mok Oh, 曾川 景介 )'
  },
  {
    type: 'other',
    time: '11:45 ~ 13:00',
    label: 'ランチブレイク'
  },
  {
    type: 'content',
    time: '13:00 ~ 13:30',
    trackA: [10],
    trackB: [12]
  },
  {
    type: 'content',
    time: '13:40 ~ 14:10',
    trackA: [13],
    trackB: [14]
  },
  {
    type: 'content',
    time: '14:20 ~ 14:50',
    trackA: [15],
    trackB: [16]
  },
  {
    type: 'content',
    time: '15:00 ~ 15:30',
    trackA: [17],
    trackB: [18, 19]
  },
  {
    type: 'other',
    time: '15:30 ~ 16:00',
    label: '中休憩'
  },
  {
    type: 'content',
    time: '16:00 ~ 16:30',
    trackA: [20, 21],
    trackB: [22, 23]
  },
  {
    type: 'content',
    time: '16:40 ~ 17:10',
    trackA: [24],
    trackB: [25]
  },
  {
    type: 'content',
    time: '17:20 ~ 17:50',
    trackA: [26],
    trackB: [27]
  },
  {
    type: 'content',
    time: '18:00 ~ 18:30',
    trackA: [28],
    trackB: [29, 30]
  },
  {
    type: 'other',
    time: '18:30 ~ 18:50',
    label: 'クロージング'
  },
  {
    type: 'other',
    time: '19:10 ~ 20:30',
    label: 'アフターパーティー'
  }
];
