import * as React from 'react';
import { MiniGrid } from '../../../../components';
import ContentGridItem, { CONTENT_GRID_ITEM_FRAGMENT } from './ContentGridItem';

import gql from 'graphql-tag';
import { ContentGridFragment } from '../../../../graphql/generated/ContentGridFragment';

export const CONTENT_GRID_FRAGMENT = gql`
  fragment ContentGridFragment on Query {
    sessionList(first: 100) {
      nodes {
        ...ContentGridItemFragment
      }
    }
  }

  ${CONTENT_GRID_ITEM_FRAGMENT}
`;

interface Props {
  gqlData: ContentGridFragment;
  onClickItem: (sessionId: number) => void;
}

class ContentGrid extends React.Component<Props> {
  public render() {
    const { gqlData, onClickItem } = this.props;
    const { sessionList } = gqlData;
    return (
      <MiniGrid minColumnWidth={360}>
        {sessionList.nodes!.map((session, index) => (
          <ContentGridItem
            key={`${session.id}_${index}`}
            session={session}
            index={index}
            onClick={onClickItem}
          />
        ))}
      </MiniGrid>
    );
  }
}

export default ContentGrid;
