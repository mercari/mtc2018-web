import * as React from 'react';
import Section from '../Section';
import { MiniGrid } from '../../../components';
import { contents } from '../../../store/contents';
import ContentItem from './ContentItem';

const ContentSection: React.SFC<{}> = props => (
  <Section title="Contents" id="contents" {...props}>
    <MiniGrid minColumnWidth={360}>
      {contents.map((content, index) => (
        <ContentItem key={`${content.id}_${index}`} content={content} />
      ))}
    </MiniGrid>
  </Section>
);

export default ContentSection;
