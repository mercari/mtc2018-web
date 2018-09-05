import styled, { css, InterpolationValue } from 'styled-components';
import { colors, getTextStyle } from './styles';

interface Props {
  type?: 'primary' | 'secondary';
  size?: 'large' | 'medium';
}

const getStyle = (type: 'primary' | 'secondary', size: 'large' | 'medium') => {
  let typeStyle: InterpolationValue[];
  switch (type) {
    case 'secondary':
      typeStyle = css`
        background-color: transparent;
        border: 1px solid ${colors.secondary};
        color: ${colors.secondary};
      `;
      break;
    case 'primary':
    default:
      typeStyle = css`
        background-color: ${colors.secondary};
        border: none;
        color: ${colors.yuki};
      `;
      break;
  }

  let sizeStyle: InterpolationValue[];
  switch (size) {
    case 'large':
      sizeStyle = css`
        height: 60px;
        ${getTextStyle('display2')};
      `;
      break;
    case 'medium':
    default:
      sizeStyle = css`
        height: 48px;
        ${getTextStyle('display2')};
      `;
      break;
  }

  return css`
    ${sizeStyle} ${typeStyle};
  `;
};

const Button = styled.button`
  ${({ type = 'primary', size = 'medium' }: Props) =>
    getStyle(type, size)} padding: 0 32px;
  border-radius: 32px;
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
