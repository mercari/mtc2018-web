import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Text, Tip, Button } from '../../../components';
import { colors, getTextStyle, borderRadius } from '../../../components/styles';
import ContentCardSpeaker, {
  CONTENT_CARD_SPEAKER_FRAGMENT
} from './ContentCardSpeaker';
import { Content } from '../../../types';

import gql from 'graphql-tag';
import { ContentCardFragment } from '../../../graphql/generated/ContentCardFragment';

export const CONTENT_CARD_FRAGMENT = gql`
  fragment ContentCardFragment on Session {
    startTime
    endTime
    type
    place
    title
    titleJa
    tags
    outline
    outlineJa
    slideUrl
    movieUrl
    speakers {
      ...ContentCardSpeakerFragment
    }
  }
  ${CONTENT_CARD_SPEAKER_FRAGMENT}
`;

const getTip = (type: Content['type']) => {
  switch (type) {
    case 'keynote':
      return <Tip type="important">KEYNOTE</Tip>;
    case 'opening':
      return <Tip type="important">OPENING</Tip>;
    case 'session':
    default:
      return <Tip type="normal">SESSION</Tip>;
  }
};

interface Props {
  session: ContentCardFragment;
  isJa: boolean;
}

class ContentCard extends React.PureComponent<Props> {
  public render() {
    const { session, isJa, ...props } = this.props;
    const startTime = moment(session.startTime).format('HH:mm');
    const endTime = moment(session.endTime).format('HH:mm');
    return (
      <Wrapper {...props}>
        <ContentInfo>
          <Header>
            {getTip(session.type)}
            <HeaderDetail>
              <Text level="display2">{session.place}</Text>
              <Text level="display2">
                {startTime}-{endTime}
              </Text>
            </HeaderDetail>
          </Header>
          <Title>{isJa ? session.titleJa : session.title}</Title>
          <Tags>
            {session.tags!.map(tag => (
              <Text level="display1" key={tag}>
                #{tag}
              </Text>
            ))}
          </Tags>
          <Body>{isJa ? session.outlineJa : session.outline}</Body>
          <Links>
            <LinkButton
              type="primary"
              size="small"
              href={session.slideUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon src="/2018/static/images/icn_slide.svg" alt="slide" />
              <Text level="display1">Slide</Text>
            </LinkButton>
            <LinkButton
              type="primary"
              size="small"
              href={session.movieUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon src="/2018/static/images/icn_movie.svg" alt="movie" />
              <Text level="display1">Movie</Text>
            </LinkButton>
          </Links>
        </ContentInfo>
        <div>
          {session.speakers!.map(speaker => (
            <Speaker key={speaker.id} speaker={speaker} isJa={isJa} />
          ))}
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  border-radius: ${borderRadius.level1};
  background-color: ${colors.yuki};
  padding: 60px;
  box-sizing: border-box;

  @media screen and (max-width: 767px) {
    padding: 20px;
  }
`;

const ContentInfo = styled.div`
  margin-bottom: 40px;

  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 8px;

  > * {
    margin-right: 8px;
    margin-bottom: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const ButtonLink = Button.withComponent('a');
const LinkButton = styled(ButtonLink)`
  text-decoration: none;

  justify-content: center;
  padding: 12px 16px;
  border: solid 1px ${colors.primary};
  background-color: ${colors.yuki};

  @media screen and (max-width: 767px) {
    margin-bottom: 10px;
  }
`;

const LinkIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 0px;
  margin-right: 8px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 8px;

  > * {
    margin-right: 8px;
    margin-bottom: 8px;

    &:last-child {
      margin-righ: 0;
    }
  }
`;

const HeaderDetail = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-right: 16px;

    &:last-child {
      margin-righ: 0;
    }
  }
`;

const Tags = styled.div`
  display: flex;
  margin-bottom: 16px;

  > * {
    margin-right: 8px;
  }
`;

const Body = styled(Text)`
  ${getTextStyle('display1')};
  @media screen and (max-width: 767px) {
    ${getTextStyle('body')};
  }
  margin-bottom: 16px;
`;

const Title = styled(Text).attrs({
  level: 'display2'
})`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Speaker = styled(ContentCardSpeaker)`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default ContentCard;
