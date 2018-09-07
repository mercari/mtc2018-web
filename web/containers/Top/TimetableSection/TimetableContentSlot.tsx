import * as React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Text } from '../../../components';
import { colors, boxShadow } from '../../../components/styles';

import gql from 'graphql-tag';
import { TimeTableSessionFragment } from '../../../graphql/generated/TimeTableSessionFragment';
import { TimeTableSpeakerFragment } from '../../../graphql/generated/TimeTableSpeakerFragment';

export const TIMETABLE_SESSION_FRAGMENT = gql`
  fragment TimeTableSessionFragment on Session {
    id
    sessionId
    lang
    tags
    title
    titleJa
  }
`;

export const TIMETABLE_SPEAKER_FRAGMENT = gql`
  fragment TimeTableSpeakerFragment on Speaker {
    name
    nameJa
  }
`;

export type TimetableSession = TimeTableSessionFragment & {
  speakers: TimeTableSpeakerFragment[];
};

interface Props {
  content: TimetableSession;
  isJa: boolean;
}

class TimetableContentSlot extends React.PureComponent<Props> {
  public render() {
    const { content, isJa, ...props } = this.props;
    const lang = content.lang === 'en' ? 'EN' : 'JA';

    return (
      <ContentSlotWrapper onClick={this.onClick} {...props}>
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
  }

  private onClick = () => {
    const sessionId = this.props.content.sessionId;
    Router.push(
      `/2018/session/detail?id=${sessionId}`,
      `/2018/session/${sessionId}`
    ).then(() => window.scrollTo(0, 0));
  };
}

const ContentSlotWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${colors.primary};
  padding: 10px;
  box-sizing: border-box;
  transition: 300ms;
  cursor: pointer;
  background-color: ${colors.yuki};

  &:hover {
    transform: scale(1.08);
    box-shadow: ${boxShadow.level1};
    background-color: ${colors.sakura};
    border-bottom: 1px solid transparent;
  }

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
