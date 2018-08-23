import * as React from 'react';
import styled from 'styled-components';
import { Text, Card } from '../../components';
import Section from './Section';

const AboutSection: React.SFC<{}> = props => (
  <Section title="ABOUT" id="about" {...props}>
    <Card>
      <Message>
        メルカリテックカンフとはほげほげ
        <br />
        テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
        テキストが入ります。テキストが入ります。
        テキストが入ります。テキストが入ります。テキストが入ります。
      </Message>
    </Card>
  </Section>
);

const Message = styled(Text).attrs({
  level: 'display3'
})`
  text-align: center;
  line-height: 36px;
`;

export default AboutSection;
