import styled from 'styled-components';
import Text from './Text';
import { colors } from './styles';

interface Props {
  type?: 'important' | 'normal';
}

const Tip = styled(Text).attrs({
  level: 'display1'
})`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  border-radius: 15px;
  padding: 0 16px;
  background-color: ${({ type = 'normal' }: Props) => {
    return type === 'important' ? colors.secondary : colors.primary;
  }};
  color: ${colors.yuki};
`;

export default Tip;
