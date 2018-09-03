import * as React from 'react';
import styled from 'styled-components';
import Text from './Text';
import { colors, getTextStyle } from './styles';

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
`;

const Title = styled(Text)`
  ${getTextStyle('display5')};
  color: ${colors.yuki};
  padding: 40px 0;
`;

const Body = styled.div`
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Section;
