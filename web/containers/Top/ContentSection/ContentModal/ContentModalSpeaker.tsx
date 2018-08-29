import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../../../../components';
import {
  colors,
  getTextStyle,
  borderRadius
} from '../../../../components/styles';
import { Speaker } from '../../../../types';

interface Props {
  speaker: Speaker;
}

const ContentModalSpeaker: React.SFC<Props> = ({ speaker }) => (
  <Wrapper>
    <Photo src={speaker.iconUrl} />
    <Profile>
      <Header>
        <div>
          <Name>{speaker.name}</Name>
          <Text level="body">{speaker.position}</Text>
        </div>
        <Buttons>
          <Button />
          <Button />
        </Buttons>
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
  border-radius: ${borderRadius.level1};
  background-color: ${colors.primary};
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

const Buttons = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: right;

  > * {
    margin-left: 16px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

const Button = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${colors.primary};
`;

const Body = styled(Text)`
  ${getTextStyle('display1')};
  text-align: justify;
  text-justify: inter-ideograph;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export default ContentModalSpeaker;
