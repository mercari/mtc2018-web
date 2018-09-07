import * as React from 'react';
import { MiniGrid } from '../../../../components';
import ContentGridItem from './ContentGridItem';
import { Top_sessionList } from '../../../../graphql/generated/Top';

interface Props {
  sessionList: Top_sessionList;
  onClickItem: (sessionId: number) => void;
}

class ContentGrid extends React.Component<Props> {
  public render() {
    const { sessionList, onClickItem } = this.props;
    return (
      <MiniGrid minColumnWidth={360}>
        {sessionList.nodes!.map((session, index) => (
          <ContentGridItem
            key={`${session!.id}_${index}`}
            session={session!}
            index={index}
            onClick={onClickItem}
          />
        ))}
      </MiniGrid>
    );
  }
}

export default ContentGrid;
