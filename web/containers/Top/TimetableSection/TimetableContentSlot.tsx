import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components';
import { colors } from '../../../components/styles';
import { TimeTableSessionFragment } from '../../../graphql/generated/TimeTableSessionFragment';
import { TimeTableSpeakerFragment } from '../../../graphql/generated/TimeTableSpeakerFragment';

export type TimetableSession = TimeTableSessionFragment & {
  speakers: TimeTableSpeakerFragment[];
};

interface Props {
  content: TimetableSession;
  isJa: boolean;
}

const TimetableContentSlot: React.SFC<Props> = ({
  content,
  isJa,
  ...props
}) => {
  const lang = content.lang === 'en' ? 'EN' : 'JA';

  return (
    <ContentSlotWrapper {...props}>
      <div>{content.tags!.map(tag => `#${tag} `)}</div>
      <Title>
        {isJa ? content.titleJa : content.title}
        <span>({lang})</span>
      </Title>
      <Speakers className="speakers">
        {content.speakers!.map(speaker => (
          <Text key={speaker.name} level="body">
            {isJa ? speaker.nameJa : speaker.name}
          </Text>
        ))}
      </Speakers>
    </ContentSlotWrapper>
  );
};

const ContentSlotWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${colors.primary};
  padding: 10px;
  box-sizing: border-box;

  &:last-child {
    border-bottom: none;
  }
`;

const Title = styled(Text).attrs({ level: 'body' })`
  font-weight: bold;

  span {
    color: ${colors.secondary};
    font-weight: normal;
    margin-left: 8px;
  }
`;

const Speakers = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TimetableContentSlot;
