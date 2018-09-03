import styled, { css } from 'styled-components';
import { colors, getTextStyle } from './styles';

interface Props {
  type: 'primary' | 'secondary';
}

const getStyle = (type: 'primary' | 'secondary') => {
  switch (type) {
    case 'secondary':
      return css`
        background-color: transparent;
        border: 1px solid ${colors.secondary};
        color: ${colors.secondary};
      `;
    case 'primary':
    default:
      return css`
        background-color: ${colors.secondary};
        border: none;
        color: ${colors.yuki};
      `;
  }
};

const Button = styled.button`
  ${getTextStyle('display2')} ${(props: Props) =>
    getStyle(props.type)}
  height: 60px;
  padding: 0 32px;
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
