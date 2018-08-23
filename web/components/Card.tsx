import styled from 'styled-components';
import { colors, borderRadius } from './styles';

const Card = styled.div`
  background-color: ${colors.yuki};
  border-radius: ${borderRadius.level1};
  padding: 60px;
  box-sizing: border-box;
`;

export default Card;
