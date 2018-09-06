import * as React from 'react';
import { MiniGrid } from '../../../../components';
import ContentGridItem from './ContentGridItem';
import { AllSessions_sessions } from '../../../../graphql/generated/AllSessions';

interface Props {
  sessions: AllSessions_sessions;
  onClickItem: (sessionId: number) => void;
}

class ContentGrid extends React.Component<Props> {
  public render() {
    const { sessions, onClickItem } = this.props;
    return (
      <MiniGrid minColumnWidth={360}>
        {sessions.nodes!.map((session, index) => (
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
