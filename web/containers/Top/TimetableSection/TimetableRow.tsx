import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components';
import { colors } from '../../../components/styles';
import { Row, Content } from '../../../types';

interface Props {
  row: Row;
  contents: Content[];
}

const getContentById = (
  id: number,
  contents: Content[] = []
): Content | undefined => {
  return contents.find(content => {
    return content.id === id;
  });
};

const ContentSlot: React.SFC<{ content?: Content }> = ({
  content,
  ...props
}) => {
  if (!content) {
    return <OtherSlotWrapper {...props}>未定</OtherSlotWrapper>;
  }

  return (
    <ContentSlotWrapper {...props}>
      <div>{content.tags.map(tag => `#${tag} `)}</div>
      <div className="title">{content.title}</div>
      <div className="speakers">
        {content.speakers.map(speaker => (
          <Text key={speaker.name} level="body">
            {speaker.name}
          </Text>
        ))}
      </div>
    </ContentSlotWrapper>
  );
};

const TimetableRow: React.SFC<Props> = ({ row, contents }) => {
  const tdList: React.ReactNode[] = [];
  switch (row.type) {
    case 'content':
      // trackA
      tdList.push(
        <td key="track_a">
          {row.trackA.map((contentId, index) => (
            <ContentSlot
              key={`track_a_${contentId}_${index}`}
              content={getContentById(contentId, contents)}
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
              content={getContentById(contentId, contents)}
            />
          ))}
        </td>
      );
      break;
    case 'other':
      tdList.push(
        <td key="other" colSpan={2}>
          <OtherSlotWrapper>{row.label}</OtherSlotWrapper>
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
