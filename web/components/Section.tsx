import * as React from 'react';
import styled from 'styled-components';
import Text from './Text';
import { colors } from './styles';

interface Props {
  title: string;
}

const Section: React.SFC<Props> = ({ title, children }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Body>{children}</Body>
  </Wrapper>
);

const Wrapper = styled.section`
  padding: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(Text).attrs({
  level: 'display6'
})`
  color: ${colors.primary};
  margin-bottom: 24px;
`;

const Body = styled.div``;

export default Section;
