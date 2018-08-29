import { css } from 'styled-components';

export const colors = {
  primary: '#10172B',
  secondary: '#F6422A',
  orange: '#FB7A61',
  yuki: '#FFFFFF',
  nezumi: '#9D9D9D',
  kemuri: '#D8D8D8',
  sakura: '#EDE1E1'
};

export const textStyles = [
  { level: 'display7', size: '65px', weight: 'normal' },
  { level: 'display6', size: '45px', weight: 'normal' },
  { level: 'display5', size: '35px', weight: 'normal' },
  { level: 'display4', size: '20px', weight: 'normal' },
  { level: 'display3', size: '18px', weight: '600' },
  { level: 'display2', size: '18px', weight: '300' },
  { level: 'display1', size: '16px', weight: '300' },
  { level: 'caption', size: '14px', weight: '600' },
  { level: 'body', size: '14px', weight: '300' }
];

export const getTextStyle = (level: string) => {
  let style = textStyles.find(textStyle => {
    return textStyle.level === level;
  });

  if (!style) {
    style = textStyles[0];
  }

  return css`
    font-size: ${style.size};
    font-weight: ${style.weight};
    font-family: 'Montserrat', 'Hiragino Sans', 'ヒラギノ角ゴ Pro W3', Meiryo,
      メイリオ, Osaka, 'MS PGothic', arial, helvetica, sans-serif;
  `;
};

export const borderRadius = {
  level1: '10px'
};

export const boxShadow = {
  level1: '0 4px 6px rgba(0, 0, 0, 0.7)'
};
