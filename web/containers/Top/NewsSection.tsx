import * as React from 'react';
import { Section } from '../../components';

const NewsSection: React.SFC<{}> = props => (
  <Section title="NEWS" id="news" {...props}>
    ここにニュースを入れます
  </Section>
);

export default NewsSection;
