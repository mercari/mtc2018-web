import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../components';
import { getTextStyle, borderRadius } from '../../../components/styles';
import { Speaker } from '../../../types';

interface Props {
  speaker: Speaker;
}

const ContentCardSpeaker: React.SFC<Props> = ({ speaker, ...props }) => (
  <Wrapper {...props}>
    <Photo src={`../../../static/images/speakers/${speaker.id}.png`} />
    <Profile>
      <Header>
        <div>
          <Name>{speaker.nameJa}</Name>
          <Text level="body">{speaker.position}</Text>
        </div>
      </Header>
      <Body>{speaker.profile}</Body>
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

const Photo = styled.img`
  width: 280px;
  height: 280px;
  flex-shrink: 0;
  border-radius: ${borderRadius.level1};
  margin-right: 40px;

  @media screen and (max-width: 767px) {
    width: 40vw;
    height: 40vw;
    margin-right: 0;
    margin-bottom: 20px;
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
  ${getTextStyle('display1')};
`;

export default ContentCardSpeaker;
