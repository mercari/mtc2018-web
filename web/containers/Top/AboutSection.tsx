import * as React from 'react';
import styled from 'styled-components';
import { Text, Card } from '../../components';
import Section from './Section';

const AboutSection: React.SFC<{}> = props => (
  <Section title="ABOUT" id="about" {...props}>
    <StyledCard>
      <Message>
        メルカリテックカンフとはほげほげ
        <br />
        テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
        テキストが入ります。テキストが入ります。
        テキストが入ります。テキストが入ります。テキストが入ります。
      </Message>
    </StyledCard>
  </Section>
);

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 920px;
`;

const Message = styled(Text).attrs({
  level: 'display2'
})`
  text-align: center;
  line-height: 36px;
`;

export default AboutSection;
