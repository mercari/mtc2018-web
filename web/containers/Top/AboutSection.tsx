import * as React from 'react';
import styled from 'styled-components';
import { Text, Section } from '../../components';

const AboutSection: React.SFC<{}> = props => (
  <Section title="ABOUT" id="about" {...props}>
    <Message>
      メルカリテックカンフとはほげほげ
      <br />
      テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
      テキストが入ります。テキストが入ります。
      テキストが入ります。テキストが入ります。テキストが入ります。
    </Message>
  </Section>
);

const Message = styled(Text).attrs({
  level: 'display3'
})`
  text-align: center;
`;

export default AboutSection;
