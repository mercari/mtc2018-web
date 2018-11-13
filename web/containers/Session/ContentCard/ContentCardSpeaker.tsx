import * as React from 'react';
import styled from 'styled-components';
import { Text, Button } from '../../../components';
import { getTextStyle, borderRadius, colors } from '../../../components/styles';

import gql from 'graphql-tag';
import {
  ContentCardSpeakerFragment,
  ContentCardSpeakerFragment_slides,
  ContentCardSpeakerFragment_movies
} from '../../../graphql/generated/ContentCardSpeakerFragment';

export const CONTENT_CARD_SPEAKER_FRAGMENT = gql`
  fragment ContentCardSpeakerFragment on Speaker {
    id
    speakerId
    name
    nameJa
    position
    positionJa
    profile
    profileJa
    slides {
      id
      lang
      url
      session {
        sessionId
      }
    }
    movies {
      id
      url
      session {
        sessionId
      }
    }
  }
`;

interface Props {
  speaker: ContentCardSpeakerFragment;
  // spaker.{slides,movies}はspeakerに紐づくものをすべて持っているが、sessionに紐づくものだけ表示したい
  // GraphQL的にそれをスッとやるのが難しいのでProps経由でsessionIdを渡してもらってフィルタする
  sessionId: number;
  isJa: boolean;
}

const ContentCardSpeaker: React.SFC<Props> = ({
  speaker,
  sessionId,
  isJa,
  ...props
}) => {
  const lang = isJa ? 'jp' : 'en';
  const slide = findSlide(speaker, sessionId, lang);
  const movie = findMovie(speaker, sessionId);
  return (
    <Wrapper {...props}>
      <Photo>
        <source
          type="image/webp"
          srcSet={`/2018/static/images/speakers/${speaker.speakerId}.webp`}
        />
        <img src={`/2018/static/images/speakers/${speaker.speakerId}.png`} />
      </Photo>
      <Profile>
        <Header>
          <div>
            <Name>{isJa ? speaker.nameJa : speaker.name}</Name>
            <Text level="body">
              {isJa ? speaker.positionJa : speaker.position}
            </Text>
          </div>
        </Header>
        <Body>{isJa ? speaker.profileJa : speaker.profile}</Body>
        <Links>
          {slide ? (
            <LinkButton
              type="primary"
              size="small"
              href={slide.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon src="/2018/static/images/icn_slide.svg" alt="slide" />
              <Text level="display1">Slide</Text>
            </LinkButton>
          ) : null}
          {movie ? (
            <LinkButton
              type="primary"
              size="small"
              href={movie.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon src="/2018/static/images/icn_movie.svg" alt="movie" />
              <Text level="display1">Movie</Text>
            </LinkButton>
          ) : null}
        </Links>
      </Profile>
    </Wrapper>
  );
};

function findSlide(
  speaker: ContentCardSpeakerFragment,
  sessionId: number,
  lang: 'jp' | 'en'
): ContentCardSpeakerFragment_slides | undefined {
  return (
    speaker.slides.find(
      slide => slide.session.sessionId === sessionId && slide.lang === lang
    ) || speaker.slides[0]
  );
}

function findMovie(
  speaker: ContentCardSpeakerFragment,
  sessionId: number
): ContentCardSpeakerFragment_movies | undefined {
  return speaker.movies.find(movie => movie.session.sessionId === sessionId);
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Photo = styled.picture`
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  margin-right: 40px;

  @media screen and (max-width: 767px) {
    width: 40vw;
    height: 40vw;
    margin-right: 0;
    margin-bottom: 20px;
  }

  > * {
    width: 100%;
    height: 100%;
    border-radius: ${borderRadius.level1};
  }
`;

const Profile = styled.div`
  width: 100%;
`;

const Header = styled.div`
  margin-bottom: 16px;
  width: 100%;
  position: relative;

  @media screen and (max-width: 767px) {
    margin-bottom: 0;
  }
`;

const Name = styled(Text).attrs({
  level: 'display2'
})`
  margin-bottom: 4px;
`;

const Body = styled(Text)`
  ${getTextStyle('body')};
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

export default ContentCardSpeaker;
