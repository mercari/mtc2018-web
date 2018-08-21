import * as React from 'react';
import { Section } from '../../components';

const AboutSection: React.SFC<{}> = props => (
  <Section title="ABOUT" id="about" {...props}>
    ここにコンテンツが入ります
  </Section>
);

export default AboutSection;
