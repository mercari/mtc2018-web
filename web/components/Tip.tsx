import styled from 'styled-components';
import Text from './Text';
import { colors } from './styles';

const Tip = styled(Text).attrs({
  level: 'display1'
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  border-radius: 15px;
  padding: 0 16px;
  background-color: ${colors.primary};
  color: ${colors.yuki};
`;

export default Tip;
