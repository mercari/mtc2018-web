import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../../components/styles';
import { Row } from '../../../types';
import TimetableContentSlot, { TimetableSession } from './TimetableContentSlot';
import TimetableOtherSlot from './TimetableOtherSlot';

interface Props {
  row: Row;
  sessions: TimetableSession[];
  isJa: boolean;
}

const getContentById = (
  id: number,
  contents: TimetableSession[] = []
): TimetableSession | undefined =>
  contents.find(content => content.sessionId === id);

const getContentSlot = (
  contentId: string,
  sessions: TimetableSession[],
  isJa: boolean
) => {
  const content = getContentById(contentId, sessions);
  if (!content) {
    return <TimetableOtherSlot label={isJa ? '未定' : 'TBD'} />;
  }

  return (
    <TimetableContentSlot key={content.id} content={content} isJa={isJa} />
  );
};

const TimetableRow: React.SFC<Props> = ({ row, sessions, isJa }) => {
  const tdList: React.ReactNode[] = [];

  switch (row.type) {
    case 'content':
      // trackA
      tdList.push(
        <td key="track_a">
          {row.trackA.map((contentId, index) =>
            getContentSlot(contentId, sessions, isJa)
          )}
        </td>
      );
      // trackB
      tdList.push(
        <td key="track_b">
          {row.trackB.map((contentId, index) =>
            getContentSlot(contentId, sessions, isJa)
          )}
        </td>
      );
      break;
    case 'other':
      tdList.push(
        <td key="other" colSpan={2}>
          <TimetableOtherSlot label={isJa ? row.labelJa : row.label} />
        </td>
      );
      break;
  }

  return (
    <Wrapper>
      <td>{row.time}</td>
      {tdList}
    </Wrapper>
  );
};

const Wrapper = styled.tr`
  td {
    background-color: ${colors.yuki};
    border-bottom: 10px solid ${colors.primary};
    vertical-align: top;

    &:first-child {
      padding: 10px;
      box-sizing: border-box;
      background-color: ${colors.secondary};
      color: ${colors.yuki};
    }
  }
`;

export default TimetableRow;
