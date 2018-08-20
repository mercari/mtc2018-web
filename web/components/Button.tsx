import styled from 'styled-components';
import { colors } from './styles';
import { getTextStyle } from './Text';

const Button = styled.button`
  ${getTextStyle('display2')}
  background-color: ${colors.secondary};
  color: ${colors.yuki};
  border: none;
  height: 60px;
  padding: 0 48px;
  border-radius: 32px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.5;
  }
`;

export default Button;
