import styled, { css } from 'styled-components';
import { textStyles } from './styles';

export const getTextStyle = (level: string) => {
  let style = textStyles.find(textStyle => {
    return textStyle.level === level;
  });

  if (!style) {
    style = textStyles[0];
  }

  return css`
    font-size: ${style.size}px;
    font-weight: ${style.weight};
    font-family: 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', Meiryo,
      メイリオ, Osaka, 'MS PGothic', arial, helvetica, sans-serif;
  `;
};

interface Props {
  level?: string;
}

const Text: React.SFC<Props> = ({ level, ...rest }) => (
  <Wrapper level={level!} {...rest} />
);

const Wrapper = styled.div`
  ${({ level }: { level: string }) => getTextStyle(level)};
`;

export default Text;
