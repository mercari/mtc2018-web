import * as React from 'react';
import { Query } from 'react-apollo';
import { MiniGrid } from '../../../../components';
import ContentGridItem from './ContentGridItem';
import { SESSIONS_QUERY } from '../../../../graphql/query';
import { AllSessions } from '../../../../graphql/generated/AllSessions';

interface Props {
  onClickItem: (sessionId: number) => void;
}

class AllSessionsQuery extends Query<AllSessions> {}

class ContentGrid extends React.Component<Props> {
  public render() {
    const { onClickItem } = this.props;
    return (
      <AllSessionsQuery query={SESSIONS_QUERY}>
        {({ loading, error, data }) => {
          if (error) {
            return null;
          }
          if (loading || !data) {
            return null;
          }

          return (
            <MiniGrid minColumnWidth={360}>
              {data.sessions.nodes!.map((session, index) => (
                <ContentGridItem
                  key={`${session!.id}_${index}`}
                  session={session!}
                  index={index}
                  onClick={onClickItem}
                />
              ))}
            </MiniGrid>
          );
        }}
      </AllSessionsQuery>
    );
  }
}

export default ContentGrid;
