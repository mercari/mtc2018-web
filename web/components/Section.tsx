import * as React from 'react';
import styled from 'styled-components';
import Text from './Text';
import Card from './Card';
import { colors } from './styles';

interface Props {
  title: string;
  id: string;
}

const Section: React.SFC<Props> = ({ title, children, ...props }) => (
  <Wrapper {...props}>
    <Title>{title}</Title>
    <Body>{children}</Body>
  </Wrapper>
);

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px;
`;

const Title = styled(Text).attrs({
  level: 'display4'
})`
  color: ${colors.yuki};
  padding: 40px 0;
`;

const Body = styled(Card)`
  width: 100%;
  max-width: 920px;
`;

export default Section;
