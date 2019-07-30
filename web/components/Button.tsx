import styled, { css, InterpolationValue } from 'styled-components';
import { colors, getTextStyle } from './styles';

interface Props {
  priority?: 'primary' | 'secondary' | 'tertiary';
  size?: 'large' | 'medium' | 'small';
}

const getStyle = (priority?: Props['priority'], size?: Props['size']) => {
  let typeStyle: InterpolationValue[];
  switch (priority) {
    case 'primary':
      typeStyle = css`
        background-color: ${colors.secondary};
        border: none;
        color: ${colors.yuki};
      `;
      break;
    case 'secondary':
      typeStyle = css`
        background-color: transparent;
        border: 1px solid ${colors.secondary};
        color: ${colors.secondary};
      `;
      break;
    case 'tertiary':
    default:
      typeStyle = css`
        background-color: transparent;
        border: 1px solid ${colors.yuki};
        color: ${colors.yuki};
      `;
      break;
  }

  let sizeStyle: InterpolationValue[];
  switch (size) {
    case 'large':
      sizeStyle = css`
        height: 60px;
        border-radius: 30px;
        ${getTextStyle('display2')};
      `;
      break;
    case 'medium':
      sizeStyle = css`
        height: 48px;
        border-radius: 24px;
        ${getTextStyle('display2')};
      `;
      break;
    case 'small':
    default:
      sizeStyle = css`
        height: 40px;
        border-radius: 20px;
        ${getTextStyle('display1')};
      `;
      break;
  }

  return css`
    ${sizeStyle} ${typeStyle};
  `;
};

const Button = styled.button`
  ${({ priority, size }: Props) => getStyle(priority, size)} padding: 0 32px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.5;
  }
`;

export default Button;
