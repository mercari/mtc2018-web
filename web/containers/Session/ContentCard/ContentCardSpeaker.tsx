import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components';
import { getTextStyle, borderRadius } from '../../../components/styles';

import gql from 'graphql-tag';
import { ContentCardSpeakerFragment } from '../../../graphql/generated/ContentCardSpeakerFragment';

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
  }
`;

interface Props {
  speaker: ContentCardSpeakerFragment;
  isJa: boolean;
}

const ContentCardSpeaker: React.SFC<Props> = ({ speaker, isJa, ...props }) => (
  <Wrapper {...props}>
    <Photo>
      <source
        type="image/webp"
        srcSet={`/static/images/speakers/${speaker.speakerId}.webp`}
      />
      <img src={`/static/images/speakers/${speaker.speakerId}.png`} />
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
    </Profile>
  </Wrapper>
);

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

export default ContentCardSpeaker;
