import * as React from 'react';
import { Section } from '../../components';

const ContentSection: React.SFC<{}> = props => (
  <Section title="Contents" id="contents" {...props}>
    ここにコンテンツが入ります
  </Section>
);

export default ContentSection;
