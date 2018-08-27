import styled from 'styled-components';
import { getTextStyle } from './styles';

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
