import { css } from 'styled-components';
import FontFaceObserver from 'fontfaceobserver';

export const colors = {
  primary: '#10172B',
  primaryAlpha: 'rgba(18, 28, 59, 0.9)',
  secondary: '#F6422A',
  orange: '#FB7A61',
  skin: '#FFE8E5',
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
  { level: 'display3', size: '18px', weight: 'bold' },
  { level: 'display2', size: '18px', weight: 'normal' },
  { level: 'display1', size: '16px', lineHeight: '26px', weight: 'normal' },
  { level: 'caption', size: '14px', lineHeight: '22px', weight: 'bold' },
  { level: 'body', size: '14px', lineHeight: '22px', weight: 'normal' }
];

export const getTextStyle = (level: string) => {
  let style = textStyles.find(textStyle => {
    return textStyle.level === level;
  });

  if (!style) {
    style = textStyles[0];
  }

  return css`
    color: ${colors.primary};
    font-size: ${style.size};
    font-weight: ${style.weight};
    font-family: 'Montserrat', 'Hiragino Kaku Gothic ProN',
      'ヒラギノ角ゴ Pro W3', Meiryo, メイリオ, Osaka, 'MS PGothic', arial,
      helvetica, sans-serif;
    line-height: ${style.lineHeight || 'auto'};
  `;
};

export const borderRadius = {
  level1: '10px'
};

export const boxShadow = {
  level1: '0 4px 6px rgba(0, 0, 0, 0.7)',
  level2: '0 2px 6px rgba(0, 0, 0, 0.3)'
};

export const loadFont = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css?family=Montserrat:400,700';
  link.rel = 'stylesheet';

  document.head.appendChild(link);

  const roboto = new FontFaceObserver('Montserrat');

  roboto.load().then(() => {
    document.documentElement.classList.add('montserrat');
  });
};
