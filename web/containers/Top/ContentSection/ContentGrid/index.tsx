import * as React from 'react';
import { MiniGrid } from '../../../../components';
import { Content } from '../../../../store/contents';
import ContentGridItem from './ContentGridItem';

interface Props {
  contents: Content[];
  onClickItem: (index: number) => void;
}

const ContentGrid: React.SFC<Props> = ({ contents, onClickItem }) => (
  <MiniGrid minColumnWidth={360}>
    {contents.map((content, index) => (
      <ContentGridItem
        key={`${content.id}_${index}`}
        content={content}
        index={index}
        onClick={onClickItem}
      />
    ))}
  </MiniGrid>
);

export default ContentGrid;
