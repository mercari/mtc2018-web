import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components';
import { colors } from '../../../components/styles';
import { Row } from '../../../types';

interface Props {
  row: Row;
  sessions: Array<ContentSlotProps['content']>;
  isJa: boolean;
}

const getContentById = (
  id: number,
  contents: Array<ContentSlotProps['content']> = []
): ContentSlotProps['content'] | undefined =>
  contents.find(content => content.sessionId === id);

// TODO: fragmentを使う
interface ContentSlotProps {
  content: {
    id: string;
    sessionId: number;
    lang: string; // 'ja' | 'en'
    tags: string[] | null;
    title: string;
    titleJa: string;
    speakers: Array<{
      name: string;
      nameJa: string;
    }> | null;
  };
  isJa: boolean;
}

const ContentSlot: React.SFC<ContentSlotProps> = ({
  content,
  isJa,
  ...props
}) => {
  if (!content) {
    return (
      <OtherSlotWrapper {...props}>{isJa ? '未定' : 'TBD'}</OtherSlotWrapper>
    );
  }

  const lang = content.lang === 'en' ? 'EN' : 'JA';
  return (
    <ContentSlotWrapper {...props}>
      <div>{content.tags!.map(tag => `#${tag} `)}</div>
      <div className="title">
        {isJa ? content.titleJa : content.title}
        <span>({lang})</span>
      </div>
      <div className="speakers">
        {content.speakers!.map(speaker => (
          <Text key={speaker.name} level="body">
            {isJa ? speaker.nameJa : speaker.name}
          </Text>
        ))}
      </div>
    </ContentSlotWrapper>
  );
};

const TimetableRow: React.SFC<Props> = ({ row, sessions, isJa }) => {
  const tdList: React.ReactNode[] = [];
  switch (row.type) {
    case 'content':
      // trackA
      tdList.push(
        <td key="track_a">
          {row.trackA.map((contentId, index) => (
            <ContentSlot
              key={`track_a_${contentId}_${index}`}
              content={getContentById(contentId, sessions)!}
              isJa={isJa}
            />
          ))}
        </td>
      );
      // trackB
      tdList.push(
        <td key="track_b">
          {row.trackB.map((contentId, index) => (
            <ContentSlot
              key={`track_b_${contentId}_${index}`}
              content={getContentById(contentId, sessions)!}
              isJa={isJa}
            />
          ))}
        </td>
      );
      break;
    case 'other':
      tdList.push(
        <td key="other" colSpan={2}>
          <OtherSlotWrapper>{isJa ? row.labelJa : row.label}</OtherSlotWrapper>
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

const ContentSlotWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${colors.primary};
  padding: 10px;
  box-sizing: border-box;

  &:last-child {
    border-bottom: none;
  }

  .title {
    font-weight: bold;

    span {
      color: ${colors.secondary};
      font-weight: normal;
      margin-left: 8px;
    }
  }

  .speakers {
    display: flex;
    flex-direction: column;
  }
`;

const OtherSlotWrapper = styled.div`
  height: 60px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  &:last-child {
    border-bottom: none;
  }
`;

export default TimetableRow;
